# Launch checklist

None of these steps have been performed. No hosting, DNS, Search Console, Analytics, Ads or Business Profile access was available. Tick items only after doing them and checking the result.

## 0. Before deployment
- [ ] Client answers the **P1** items in `client-content-needed.md` (relationship with Harsha Technologies, printer tagline, hours, PIN code, service area, services, delivery recipient, retention).
- [ ] Update `src/lib/site.ts` and `src/lib/categories.ts` with confirmed facts. Re-run `npm run verify`.
- [ ] Privacy policy reviewed by a qualified professional (DPDP Act 2023 / DPDP Rules).
- [ ] Choose an enquiry delivery channel and configure it (`ENQUIRY_WEBHOOK_URL` and/or Resend). **The form does not deliver anything until this is done.**

## 1. Deploy
- [ ] Create a Vercel project (or another Node 20+ host) from this repository. Build command `npm run build`; output is the Next.js default.
- [ ] Set environment variables in the host (Production **and** Preview): see `.env.example`. Keep `ENQUIRY_*` and `RESEND_API_KEY` server-only (no `NEXT_PUBLIC_` prefix).
- [ ] Deploy a preview and send a test enquiry. Confirm it arrives in the inbox or sheet with the source details.
- [ ] Add the domains `europaofficesystems.com` and `www.europaofficesystems.com` in the host.
- [ ] At GoDaddy DNS: point the apex (A record) and `www` (CNAME) to the host's values. Remove the Website Builder site/forwarding. Keep the existing MX/email records untouched if email exists.
- [ ] Redirect `www` → apex with a single 301/308 (the host's domain settings).
- [ ] HTTPS works on both hosts. The domain already sends **HSTS with preload**, so HTTPS must work before DNS is switched.

## 2. Verify the live site
- [ ] `https://europaofficesystems.com/` returns 200; `http://` and `www` redirect in **one** hop.
- [ ] Run `CHECK_BASE=https://europaofficesystems.com npm run check:site`. Expect all checks to pass.
- [ ] `/robots.txt` lists `Sitemap: https://europaofficesystems.com/sitemap.xml`.
- [ ] `/sitemap.xml` lists 10 URLs, all HTTPS, trailing slash, and 200.
- [ ] `/llms.txt` returns 200 and its links resolve.
- [ ] A random URL returns a **404** status with the custom page.
- [ ] `/projector-repair` (no slash) redirects once to `/projector-repair/`.
- [ ] Response headers include CSP, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, and no `X-Powered-By`.

## 3. Forms and contact actions (on production)
- [ ] Submit a real test enquiry from a category page and from `/contact-us/`; both arrive.
- [ ] Submit with the delivery channel temporarily broken (in a preview deployment): an honest error is shown, input is preserved, and no thank-you page appears.
- [ ] On a phone: the Call button opens the dialler with +91 74162 61929.
- [ ] On a phone: WhatsApp opens a chat with the right number and the page-specific message.
- [ ] The Directions link opens the correct location (replace it with the GBP link once known).

## 4. Search Console
- [ ] Add a **Domain property** for `europaofficesystems.com` and verify it with the DNS TXT record at GoDaddy.
- [ ] Submit `https://europaofficesystems.com/sitemap.xml`.
- [ ] URL Inspection → "Test live URL" for `/`, `/projector-repair/`, `/cctv-installation/`, `/home-theatre-installation/`, `/contact-us/`. Confirm "URL is available to Google", that the user-declared and Google-selected canonicals match, and that the page renders fully.
- [ ] Request indexing for the homepage and the category pages.
- [ ] After 1–2 weeks: Pages report (no unexpected "Excluded"), Core Web Vitals and Enhancements (Breadcrumbs).
- [ ] Remove any old GoDaddy URLs that 404 (expected for an almost empty site), or leave them to drop out.

## 5. Structured data
- [ ] Rich Results Test on `/` and `/projector-repair/`: Breadcrumb detected (category pages), no errors.
- [ ] Schema Markup Validator: `LocalBusiness` and `WebSite` parse without errors.
- [ ] After hours, PIN code, GBP link and logo are confirmed, add `openingHoursSpecification`, `postalCode`, `sameAs` and a raster logo.

## 6. Analytics and Ads
- [ ] Create a GA4 property and web data stream; set `NEXT_PUBLIC_GA4_ID`.
- [ ] Create Google Ads conversion actions per `conversion-tracking-plan.md`; set `NEXT_PUBLIC_GOOGLE_ADS_ID` and the labels. Redeploy (IDs are build-time).
- [ ] Run the Tag Assistant, DebugView and Ads diagnostics checklist in `conversion-tracking-plan.md`.
- [ ] Link GA4 ↔ Google Ads and GA4 ↔ Search Console.

## 7. Performance and mobile
- [ ] PageSpeed Insights (mobile) for `/`, one category page and `/contact-us/`. Record the results.
- [ ] Check at 320 px, 375 px, 768 px and 1280 px widths and at 200 % zoom: no horizontal scroll, and the bottom bar doesn't cover form controls.

## 8. Privacy and consent
- [ ] With IDs configured, confirm no Google requests before consent (browser DevTools → Network).
- [ ] The privacy policy matches the real delivery provider, recipients and retention.
- [ ] Enquiry inbox/sheet access is limited to the people who need it.

## 9. Google Business Profile
- [ ] Confirm whether a profile exists. Claim it, and do **not** create a duplicate.
- [ ] Name exactly "Europa Office Systems". Do not add keywords to the business name.
- [ ] Address and phone match the website exactly. If customers do not visit the address, use a service-area business with the address hidden.
- [ ] Primary category chosen from what the business mainly does (for example "Audio visual equipment supplier", "Security system supplier" or "Electronics store" only if a store is open to the public). Add secondary categories sparingly and accurately.
- [ ] Service areas: only localities genuinely served (C1).
- [ ] Website link `https://europaofficesystems.com/`. Optionally use UTM tags (for example `?utm_source=google&utm_medium=organic&utm_campaign=gbp`) to separate GBP traffic.
- [ ] Add real photos (premises, products, installations), hours and products. Update `business.sameAs` and `business.mapsUrl` in the code with the profile link.
- [ ] Ask satisfied customers for reviews using the profile's review link. Never offer incentives, never write reviews yourself, and never gate reviews.
- [ ] Reply to reviews promptly and factually.

## 10. Final accuracy review
- [ ] Contact information and service areas on the site, GBP, Ads extensions and any directories (JustDial, IndiaMART) are identical.
- [ ] No unverified claims (dealership, installation, warranty, stock, reviews) anywhere.

## Before sending Google Ads traffic (minimum)
1. Enquiry delivery configured and tested end to end on production (section 3).
2. Real GA4/Ads IDs configured; one primary lead conversion recording (section 6).
3. Service area confirmed, with Ads location targeting matching it (C1).
4. Services confirmed or explicitly excluded from ad copy (D1–D3). Ads must not promise installation unless it is offered.
5. Hours confirmed, so ad schedules and call assets match staffed times (B4).
6. Privacy policy reviewed (G4).
