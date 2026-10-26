# Europa Office Systems — website

Service-business website for **Europa Office Systems**, New Balaji Nagar, Kukatpally, Hyderabad: projector repair, projector and screen installation, CCTV installation and service, home theatre setup and acoustic panels. Every page is built to get the visitor to **call or WhatsApp**.

Built with Next.js 16 (App Router, TypeScript). Every content page is statically generated. One server endpoint (`POST /api/enquiry/`) receives quote requests.

## Quick start

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000. The site works with **no** environment variables: analytics stay off, and the quote form honestly reports that online enquiries are not configured.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build (`-- -p 3100` to choose a port) |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest unit tests (validation, WhatsApp links, delivery, rate limit) |
| `npm run check:site` | Crawls a **running** build: titles, descriptions, H1s, canonicals, JSON-LD, links, sitemap, robots, llms.txt, 404, redirects, security headers. Set `CHECK_BASE` to test another origin |
| `npm run verify` | lint + typecheck + test + build |

## Environment variables

See [`.env.example`](.env.example). Summary:

| Variable | Scope | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | build | Canonical origin (default `https://europaofficesystems.com`) |
| `ENQUIRY_WEBHOOK_URL`, `ENQUIRY_WEBHOOK_SECRET` | server runtime | POST enquiries as JSON to a webhook |
| `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL` | server runtime | Email enquiries through Resend |
| `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_GOOGLE_ADS_ID`, `NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_LABEL`, `NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION_LABEL` | build | Consent-gated measurement (redeploy after changing) |

Never commit `.env*` files with real values (`.gitignore` excludes them).

## Enquiry form — integration status

| Part | Status |
|---|---|
| Client validation, accessible errors, loading/success/error states | Done |
| Server validation, honeypot, minimum fill time, same-origin check, size limit, rate limit (8 per IP per 10 min, in-memory) | Done |
| Delivery to webhook | Implemented and **tested end to end locally** against a test receiver |
| Delivery by email (Resend) | Implemented and unit-tested with a mocked API. **Not tested against the real Resend service** (no account) |
| Production delivery | **Not configured.** Needs one of the channels above |

The form shows success (redirect to `/thank-you/`) **only** when the server confirms delivery. Otherwise it keeps the visitor's input and offers WhatsApp and phone.

### Webhook payload

```json
{
  "id": "uuid", "receivedAt": "ISO-8601",
  "name": "…", "phone": "+91XXXXXXXXXX", "category": "projectors",
  "customerType": "business", "quantity": "…", "location": "…", "message": "…", "consent": true,
  "attribution": { "landingPage": "/projectors/", "pagePath": "/projectors/", "referrer": "google.com",
                   "utm_source": "google", "utm_medium": "cpc", "utm_campaign": "…", "gclid": "…" },
  "text": "Plain-text summary suitable for email or chat"
}
```

The header `X-Enquiry-Secret` is sent when `ENQUIRY_WEBHOOK_SECRET` is set. The receiver must return a 2xx status, or the visitor is told the enquiry was **not** sent.

**Google Sheets option:** a Google Apps Script web app can append rows. Apps Script `doPost(e)` cannot read request headers, so put a long random token in the webhook URL query string (for example `…/exec?token=…`) and check `e.parameter.token` in the script.

### Stronger spam protection (optional)

If spam appears, add Cloudflare Turnstile (verify the token server-side in `src/app/api/enquiry/route.ts`) and/or a shared rate-limit store such as Upstash Redis. The in-memory limiter is per server instance.

## Project structure

```
src/
  app/                    routes (one folder per page), sitemap.ts, robots.ts, manifest.ts,
                          llms.txt/route.ts, api/enquiry/route.ts, not-found.tsx, globals.css
  components/             SiteHeader, SiteFooter, ContactDock (mobile bar + floating WhatsApp),
                          ServicePage template, Photo, QuoteForm, QuoteSection, Analytics (consent), ui.tsx
  lib/
    site.ts               ★ verified business facts — the single source of truth
    services.ts           ★ service pages: problems list, offer, brands, FAQs, WhatsApp messages
    images.ts             photo registry (file names, alt text, credits)
    pages.ts              indexable page inventory (drives sitemap.xml and llms.txt)
    seo.ts                metadata + JSON-LD builders
    enquiry.ts            shared validation
    analytics.ts          consent-gated gtag layer, event taxonomy
    server/               deliver.ts, rate-limit.ts (server-only)
public/                   images/ (WebP photos, 640 + 1280), og-image.png, apple-touch-icon.png
docs/                     audits, SEO map, client questions, tracking plan, launch checklist
scripts/check-site.mjs    post-build crawler
tests/                    unit tests
```

## Maintenance

- **Business facts** (hours, PIN code, email, GBP link, social profiles): edit `src/lib/site.ts`. `null` values are hidden automatically. Add facts **only** once the client confirms them.
- **Service content / problems / brands / FAQs**: edit `src/lib/services.ts`.
- **Photos**: add `<name>-640.webp` and `<name>-1280.webp` (3:2) to `public/images/`, register them in `src/lib/images.ts`. They appear in the image sitemap automatically.
- **New page**: create the route, use `pageMetadata()`, and add it to `src/lib/pages.ts` so it enters the sitemap and llms.txt. Then run `npm run check:site`.
- **Privacy policy**: update `LAST_UPDATED` in `src/app/privacy-policy/page.tsx` whenever data handling changes (new provider, analytics, retention).
- **Images**: follow `docs/image-seo-inventory.md` (use `next/image`, record the source and licence).
- **Dependencies**: `npm audit` currently reports advisories in **dev-only** lint tooling (`braces` via `eslint-config-next`), which is not shipped to visitors. Update `next`/`eslint-config-next` together, after reading the release notes.

## Deployment

See [`docs/launch-checklist.md`](docs/launch-checklist.md). In short: deploy to Vercel (or any Node ≥ 20.9 host running `npm run build && npm start`), set environment variables, add both domains, update the GoDaddy DNS records, and verify with `CHECK_BASE=https://europaofficesystems.com npm run check:site`.

The site needs a server runtime for `/api/enquiry/`, so a static export would not work.

## Documentation

- [`docs/reference-audit.md`](docs/reference-audit.md) — harshatechnologies.in and the current europaofficesystems.com
- [`docs/current-project-audit.md`](docs/current-project-audit.md) — starting state and stack decision
- [`docs/client-content-needed.md`](docs/client-content-needed.md) — everything awaiting client confirmation
- [`docs/seo-page-map.md`](docs/seo-page-map.md) — page-by-page SEO plan
- [`docs/image-seo-inventory.md`](docs/image-seo-inventory.md)
- [`docs/conversion-tracking-plan.md`](docs/conversion-tracking-plan.md)
- [`docs/launch-checklist.md`](docs/launch-checklist.md)
- [`docs/implementation-report.md`](docs/implementation-report.md) — what was built and tested
