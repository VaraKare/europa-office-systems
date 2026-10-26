# Implementation report

## Revision 2 — 26 October 2026: service-led redesign

**Why:** the agency's feedback was that the first version looked like a product catalogue. Europa sells **services**, and visitors (from ads and organic search) arrive with a problem and should call or WhatsApp, as on harshatechnologies.in.

**What changed:**
- **Pages:** the 7 product-category pages were replaced by 5 service pages:
  - `/projector-repair/`
  - `/projector-installation/`
  - `/cctv-installation/`
  - `/home-theatre-installation/`
  - `/acoustic-panel-installation/`

  Home, about, brands and contact were rewritten to match. The site has not launched, so no redirects were needed.
- **Design:** white, service-business layout:
  - a dark top strip with the phone number
  - big blue **Call** and green **WhatsApp** buttons in every hero
  - photo tiles and cards
  - a sticky mobile bar (Call / WhatsApp / Directions) and a floating WhatsApp button on desktop
  - Inter font
- **Tap-your-problem lists** ("Projector not turning on", "CCTV not recording"…): each opens WhatsApp with that problem pre-written. Tracked as `whatsapp_click` with `cta_location` `need_chip` / `home_need_chip`.
- **Call-back form:** cut to 5 fields (name, phone, service, area, problem). Backend, validation, spam checks and honest error handling are unchanged.
- **Photos:**
  - 20 Unsplash-licensed photos, licence checked on each photo page.
  - Converted to 40 WebP files with descriptive names, 1.4 MB in total.
  - Served as plain `<img>` with `srcset`, dimensions and lazy loading, so Google Images sees clean file URLs.
  - Listed in an image sitemap and used as per-page share images.
  - Credits are in `image-seo-inventory.md`. Stock photos rarely rank under the site's name in Google Images; real job photos are needed for that.

**Verified (local production build):**
- lint clean, `tsc` clean, 28/28 unit tests pass, build passes.
- Crawler **23/23**, including that 36 image URLs return images and every `<img>` has alt, width and height.
- Lighthouse mobile **100 / 100 / 100** (accessibility, best practices, SEO) on `/` and `/cctv-installation/`.
- Homepage on mobile under 4× CPU + Slow 4G: **LCP 1.56 s, CLS 0.00**.
- No horizontal overflow at 375 px.
- The API accepts the 5 new service values and rejects old ones.

**Not verified:**
- WhatsApp and call links on a real phone.
- Live form delivery (still not configured).

The end-to-end webhook test from revision 1 was not repeated. The delivery code is unchanged and its unit tests pass.

**Needs the client:** the exact service scope, plus the "we explain the cost before work" promise (`client-content-needed.md` D1–D11), and real photos.

---

## Revision 1 — 20 October 2026

Date: 20 October 2026. All test results below come from commands and browser checks actually run against a **local production build** (`next build` + `next start`). Nothing has been deployed.

## 1. What was inspected

- **Project directory:** empty, with no prior code or configuration (`current-project-audit.md`).
- **harshatechnologies.in:** homepage, about, contact (desktop and mobile), robots.txt, sitemap.xml (57 URLs) and llms.txt; brands, areas and reviews were fetched but not analysed in depth. Finding: it is a **separate printer-repair business** with a different phone number in the same locality. None of its facts were reused (`reference-audit.md`).
- **europaofficesystems.com:** a GoDaddy Website Builder single page, "Your Printer's Best Friend", with no contact details or products. The domain was registered May 2026 and HSTS preload is active. It needs full replacement.

## 2. What was built

A Next.js 16 / React 19 / TypeScript site with 12 indexable pages, a thank-you page, a custom 404, and one server endpoint.

- **Design system:** "industrial datasheet". Paper `#f5f3ee`, ink `#16191d`, copper accent `#a3401a`, WhatsApp green `#13703f`, with IBM Plex Sans and Mono self-hosted. The signature element is ruled spec-sheet panels with monospace labels. Contrast was computed (body text 15.9:1, accent buttons 6.4:1, field borders 3.35:1).
- **Components:** sticky header with an accessible Products disclosure menu and mobile menu (Escape closes it, focus returns, scroll is locked); footer; breadcrumbs with matching `BreadcrumbList`; CTA group; FAQ (`<details>`); category page template; quote form plus contact aside; mobile bottom bar (Call / WhatsApp / Quote); floating WhatsApp button on desktop; consent banner; original SVG product illustrations.
- **Conversion:**
  - WhatsApp links use `wa.me/917416261929` with a prefilled message specific to each category.
  - Phone links use `tel:+917416261929`.
  - A quote form appears on the homepage, every category page (category pre-selected) and the contact page.
  - The form validates on the client and the server, and has a honeypot, a minimum fill time, a same-origin check, a 10 KB body limit and per-IP rate limiting.
  - Delivery goes to a webhook and/or Resend email. It shows success **only** after the server confirms delivery; otherwise the visitor gets an honest error, keeps their input, and sees WhatsApp/phone fallbacks.
- **Analytics:** consent-gated gtag (GA4 + Google Ads) and a PII-free event taxonomy. `generate_lead` and the Ads conversion fire only on server-confirmed delivery. UTM/gclid attribution is attached to the lead record. Everything is a no-op when no IDs are configured.
- **Technical SEO:**
  - Unique titles, descriptions and canonicals on every page, with trailing-slash URLs and a single redirect from non-slash forms.
  - `sitemap.xml` generated from a page inventory; `robots.txt` with the sitemap line, disallowing only `/api/`; `llms.txt` generated from the same inventory.
  - One coherent `LocalBusiness` + `WebSite` JSON-LD entity, verified facts only; `BreadcrumbList` only where breadcrumbs are visible.
  - Open Graph and Twitter metadata with a 1200×630 image; manifest, favicon and apple-touch icon.
  - Security headers: CSP, nosniff, Referrer-Policy, X-Frame-Options, Permissions-Policy; `X-Powered-By` removed.
- **Legal:** a privacy policy written to match the actual implementation (draft; legal review required).

## 3. Final page inventory

| URL | Indexed | In sitemap |
|---|---|---|
| `/` | yes | yes |
| `/projectors/` | yes | yes |
| `/cctv-security-systems/` | yes | yes |
| `/av-receivers/` | yes | yes |
| `/home-theatre-systems/` | yes | yes |
| `/hi-fi-speakers/` | yes | yes |
| `/projector-screens/` | yes | yes |
| `/acoustic-panels/` | yes | yes |
| `/brands/` | yes | yes |
| `/about-us/` | yes | yes |
| `/contact-us/` | yes | yes |
| `/privacy-policy/` | yes | yes |
| `/thank-you/` | **noindex** | no |
| 404 page | noindex, HTTP 404 | no |

**Not created, deliberately:**
- `/services/`, `/projects/` and `/terms-and-conditions/`: no confirmed services or real projects, and no checkout.
- Brand and locality pages: they would be thin or doorway pages.

The criteria for adding each are in `seo-page-map.md`.

## 4. SEO and conversion work completed

See `seo-page-map.md` (all titles, descriptions, H1/H2 outlines and links taken from the build) and `conversion-tracking-plan.md`. No keyword volumes were measured; prioritisation is labelled as a qualitative hypothesis.

## 5. Tests actually run and results

| Check | Tool / method | Result |
|---|---|---|
| Lint | `eslint .` (next core-web-vitals + TypeScript) | Pass, 0 problems |
| Type check | `tsc --noEmit` (strict) | Pass |
| Unit tests | `vitest run`: phone normalisation, validation, consent requirement, control-character stripping, attribution allow-list, WhatsApp URL format, unique category messages, delivery success/failure/partial success, secret header, rate limiting | **28 / 28 pass** |
| Production build | `next build` | Pass. 19 static routes plus 1 dynamic API route |
| Site crawl | `scripts/check-site.mjs` against `localhost:3100`: 12 sitemap URLs, titles and descriptions unique, exactly one H1 per page, canonical = sitemap URL, absolute og:image, JSON-LD parses, breadcrumb schema matches visible breadcrumbs, SVG/img alternatives, no `href="#"`, valid tel/wa.me links, `_blank` has `noopener`, in-page anchors exist, all 12 internal link targets return 200, thank-you is noindex, unknown URL → 404 with custom page, `/projectors` → one redirect, llms.txt links (13) resolve, manifest and icons return 200, security headers present | **22 / 22 pass** |
| Accessibility / SEO / Best practices | Lighthouse (mobile) via Chrome DevTools on `/`, `/home-theatre-systems/`, `/contact-us/` | 100 / 100 / 100 on all three, after fixing one finding (logo `aria-label` mismatch, WCAG 2.5.3) |
| Performance | DevTools trace, homepage, 375 px mobile, **4× CPU + Slow 4G, cold cache, localhost server** | LCP **1.87 s**, CLS **0.00**. Transfer: JS 149 KB, CSS 5 KB, fonts 59 KB, HTML 13 KB, 12 requests, 0 third-party. INP was not measured, because a lab trace has no real interactions. Localhost understates real-world server latency |
| Responsive | Screenshots at 1280 px and 375 px; `scrollWidth === clientWidth` at 375 px | No horizontal overflow. Fixed during QA: brand chips stretching in grid rows, missing menu icon size |
| Keyboard | Products menu: Enter opens, Tab reaches links with a visible focus ring, Escape closes and returns focus. Mobile menu: Escape closes, focus returns, body scroll is restored | Pass |
| Form: client validation | Empty submit in browser | Summary of 5 errors, focus on the first invalid field, errors linked via `aria-describedby` and `aria-invalid` | 
| Form: API abuse cases | curl | not configured → 503; validation → 400 with field errors; honeypot → 400; too fast → 400; cross-origin → 403; wrong content type → 415; bad JSON → 400; GET → 405; rate limit → 429 |
| Form: **end-to-end delivery** | Real browser submission on a page reached with UTM + gclid → local webhook receiver | Delivered with the secret header, normalised phone and full attribution; browser redirected to `/thank-you/` |
| Form: webhook down | Webhook returning 500 | 502 `delivery_failed`; server log has enquiry ID and reason only (no PII) |
| Form: not configured (UI) | Browser submission | "Your enquiry has not been sent" alert focused, input preserved, "Try sending again", WhatsApp/phone shown, no redirect |
| Consent + events | Build with placeholder IDs | 0 Google requests before consent; Reject keeps tags off; Accept loads gtag; events carry only non-personal params; failure → `form_submission_error` and no lead; success → `generate_lead` + Ads `conversion` |
| Placeholder / secret scan | grep | No TODO/FIXME/lorem/`href="#"`; no credential-like strings (only the documented test IDs in docs) |

**Not run:**
- WhatsApp opening on a real phone, and a `tel:` call on a real device. Only the link formats were verified.
- Screen-reader testing with VoiceOver or NVDA. Only the accessibility tree and Lighthouse/axe were checked.
- Delivery through the real Resend API (mocked only).
- Any GA4 or Google Ads hits reaching Google.
- Anything on production, since nothing is deployed.

## 6. Unresolved errors

None known in the build. Notes:
- `npm audit` reports 5 high-severity advisories in **dev-only** lint dependencies (`braces` → `micromatch` → `fast-glob` → `@next/eslint-plugin-next`). They are not shipped to visitors. The suggested "fix" would downgrade `eslint-config-next` to v14, which is unsuitable.
- The in-memory rate limiter is per server instance (documented).

## 7. Missing client information

See `client-content-needed.md`. The most important items:
- The relationship with Harsha Technologies, and whether printers are part of the business.
- PIN code, opening hours and whether the address is open to walk-ins.
- Service localities.
- Whether installation, setup or repair services exist.
- Brand availability and dealership status; hi-fi speaker brands.
- Real photos and logo.
- Enquiry recipient and retention period.
- Legal review of the privacy policy.

## 8. Missing external credentials

- Hosting account and GoDaddy DNS access.
- Enquiry delivery: a webhook URL, or a Resend API key with a verified sending domain.
- GA4 measurement ID; Google Ads ID and conversion labels.
- Search Console and Google Business Profile access.

## 9. Deployment steps

1. Push the repository to GitHub and import it into Vercel (framework detected automatically; build `npm run build`).
2. Set environment variables (`.env.example`) for Production and Preview.
3. Deploy a preview and send a test enquiry. Confirm it is received.
4. In Vercel, add `europaofficesystems.com` (primary) and `www.europaofficesystems.com` (redirect to the apex).
5. At GoDaddy DNS, set the apex A record and `www` CNAME to Vercel's values and remove the Website Builder site. Leave MX records alone.
6. Wait for HTTPS on both hostnames, then run `CHECK_BASE=https://europaofficesystems.com npm run check:site`.
7. Follow `launch-checklist.md` sections 3–10.

## 10. Remaining steps before Google Ads traffic

1. Configure and **test on production** at least one enquiry delivery channel.
2. Configure GA4/Ads IDs, redeploy, and confirm a single primary lead conversion is recording (Tag Assistant + Ads diagnostics).
3. Confirm the service area, and match Ads location targeting to it.
4. Confirm services. Ad copy must not promise installation, repair, dealership, prices or delivery unless they are confirmed.
5. Confirm opening hours for ad scheduling and call assets.
6. Complete the privacy-policy legal review.
7. Verify Search Console, submit the sitemap, and link the Google Business Profile.
