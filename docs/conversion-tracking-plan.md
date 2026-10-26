# Conversion tracking plan

**Status:** the measurement layer is implemented and was tested locally with **placeholder IDs** (see "Verification performed"). No real GA4 property, Google Ads account or conversion IDs exist yet. Nothing has been verified in Tag Assistant, GA4 DebugView or Google Ads diagnostics.

## Architecture

- `src/lib/analytics.ts` — configuration, consent storage, tag loading, `track()` and `trackLead()`.
- `src/components/Analytics.tsx` — consent banner, a delegated click listener for `data-track` elements, and attribution capture.
- `src/components/QuoteForm.tsx` — `quote_form_start`, `form_submission_error`, and `generate_lead` (only after the server confirms delivery).
- No Google Tag Manager container. gtag.js is loaded directly, which keeps the setup small. GTM can replace it later if the agency prefers.

## Environment variables

| Variable | Example | Effect when empty |
|---|---|---|
| `NEXT_PUBLIC_GA4_ID` | `G-XXXXXXX` | GA4 off |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | `AW-XXXXXXXXX` | Ads tag off |
| `NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_LABEL` | from Ads → Conversions → tag setup | No native Ads lead conversion |
| `NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION_LABEL` | from an Ads "Calls from a website" action | No website-call conversion |

These IDs are public by nature and are inlined at **build** time, so redeploy after changing them. With all of them empty, no banner appears, no Google script loads, and the site is fully usable.

## Consent behaviour

- Default: **nothing loads**. When an ID is configured, the banner offers "Accept analytics" and "Reject" with equal prominence.
- Accept → gtag.js loads with `analytics_storage`, `ad_storage` and `ad_user_data` granted, and `ad_personalization` denied (no remarketing personalisation by default).
- Reject → no Google request at all. "Cookie settings" in the footer reopens the choice. Withdrawing consent updates gtag consent to denied; tags are fully removed on the next page load.
- Consent mode "advanced" (cookieless pings before consent) is **not** used, so Google's conversion modelling for non-consenting users is unavailable. That is a deliberate privacy-first trade-off; revisit it with legal advice if needed.

## Event taxonomy

| Event | Fires when | Parameters (non-personal only) | Proof of a lead? |
|---|---|---|---|
| `whatsapp_click` | Any WhatsApp CTA clicked | `page_path`, `cta_location` (header, top_strip, header, hero, need_chip, home_need_chip, service_card, cta_band, mobile_bar, floating_button, callback_aside, contact_card, footer, form_error, thank_you…), `product_category`, `campaign_source` | **No.** Intent only; the visitor may never send the message |
| `phone_click` | Any `tel:` link clicked | same | **No.** A click is not a completed call |
| `directions_click` | Google Maps link clicked | same | No |
| `quote_form_start` | First focus inside a quote form (once per form view) | `form_type` (homepage / service_page / contact_page), `product_category` | No |
| `form_submission_error` | Server or network failure, or server-side validation failure | `form_type`, `error_type` (validation, not_configured, delivery_failed, rate_limited, spam_check, network, generic) | No |
| `generate_lead` | Server returned `ok: true` (enquiry delivered to a configured channel) | `form_type`, `product_category`, `page_path` | **Yes.** The only server-confirmed lead |
| `conversion` (Ads) | Same moment as `generate_lead`, if the Ads lead label is set | `send_to` | Yes |
| `catalogue_download` | Reserved; no catalogues exist yet | — | No |

**Never sent:** name, phone, location, message text, quantity, or customer type. Verified locally: none of the test strings appeared anywhere in `dataLayer`. The thank-you page fires **no** events, so revisiting or bookmarking it cannot inflate conversions.

## Primary vs secondary conversions (Google Ads)

| Conversion action | Source | Classification | Counting |
|---|---|---|---|
| Quote form lead | Native Ads tag (`conversion` event) **or** imported GA4 `generate_lead`. **Pick one.** | **Primary** | One |
| Calls from ads (call extensions / call assets) | Google Ads call reporting (forwarding numbers), set up in Ads | **Primary** if calls ≥ 60 s are reliable leads; set a minimum duration | One |
| Calls from website | `NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION_LABEL` (website call conversion with forwarding numbers) | Primary or secondary. Check that forwarding numbers are available for India in the account first | One |
| WhatsApp click | GA4 `whatsapp_click` import | **Secondary** (observation only) | One |
| Phone link click | GA4 `phone_click` import | **Secondary**; do not mix with real call conversions | One |
| Form start | GA4 | Not imported, or secondary | — |

**Avoid double counting:** if the native Ads `conversion` tag is enabled, do **not** also import GA4 `generate_lead` as a primary action. Keep one as primary and the other off or secondary.

**Offline conversion import (recommended later):** every enquiry record includes the `gclid` when present. When the client marks enquiries as "quoted" or "won", upload them through Google Ads offline conversion import to optimise for real sales rather than form fills.

## Attribution

On the first page view of each browser session, the site stores in `sessionStorage`: landing page, external referrer hostname, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` and `gclid`. This context is attached to the enquiry record (server side, for the business) and **not** combined with personal data in analytics. Canonical tags ignore query strings, so campaign parameters never create duplicate indexable URLs. URLs are never stripped or rewritten, so Google Ads auto-tagging works.

## Verification performed (local, placeholder IDs)

Build with `G-TEST000000` / `AW-000000000` / `testLabel`, run on localhost and inspected through Chrome DevTools:

1. Before a consent choice: banner shown, **0** Google network requests, `gtag` undefined. ✔
2. Reject: banner closes, `gtag` still undefined, choice stored. ✔
3. "Cookie settings" reopens the banner. ✔
4. Accept: `gtag/js?id=G-TEST000000` injected; `config` for GA4 and Ads queued. ✔
5. WhatsApp click → `whatsapp_click {page_path, cta_location: "hero", product_category: "projectors"}`. ✔
6. Failed submission (no delivery configured) → `quote_form_start`, then `form_submission_error {error_type: "not_configured"}`, with **no `generate_lead`**. ✔
7. Successful submission (local webhook) → `generate_lead` plus Ads `conversion {send_to: "AW-000000000/testLabel"}`, then navigation to `/thank-you/`. ✔
8. No personal data in `dataLayer`. ✔

Not verified, because it requires real accounts: hits arriving in GA4, Ads conversion status, call forwarding numbers, and consent signals in Tag Assistant.

## Testing checklist (after real IDs are configured)

**Tag Assistant (tagassistant.google.com)**
- [ ] Connect to the production URL. Before consent: no GA4/Ads hits.
- [ ] Accept → GA4 `page_view` and the Ads remarketing/config hit appear. Consent state shows granted.
- [ ] Reject in a fresh session → no tags fire.

**GA4 DebugView** (connect through Tag Assistant, which turns on debug mode for that session)
- [ ] `whatsapp_click`, `phone_click`, `directions_click` appear with `cta_location` and `product_category`.
- [ ] `quote_form_start` appears once per form.
- [ ] A real test enquiry produces exactly one `generate_lead`. Mark `generate_lead` as a **key event** in GA4.
- [ ] A forced failure (temporarily misconfigure the webhook in a preview deployment) produces `form_submission_error` and no lead.
- [ ] Register custom dimensions: `cta_location`, `product_category`, `form_type`, `error_type`.

**Google Ads**
- [ ] Conversion action "Quote form lead" shows "Recording conversions" within about 24 h of a test.
- [ ] Only one primary lead action (native **or** GA4 import).
- [ ] Call reporting enabled on call assets; minimum call length set.
- [ ] Auto-tagging on. A test click from an ad preview carries `gclid`, and it appears in the enquiry record.
- [ ] Delete test conversions or exclude test traffic before optimisation (for example by testing before campaigns go live).
