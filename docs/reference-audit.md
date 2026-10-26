# Reference audit

Audit date: 20 October 2026. Tools used: `curl` (HTTP status, headers, raw HTML, robots.txt, sitemap.xml, llms.txt), `dig`, `whois`, and the built-in browser (desktop and 375 × 812 mobile screenshots, rendered page text).

Legend: **Verified** = observed directly during this audit. **Assumption** = inference that needs client confirmation. **Recommendation** = what we did or advise.

---

## 1. harshatechnologies.in (client-identified reference site)

### URLs successfully inspected

| URL | Status | Method |
|---|---|---|
| https://harshatechnologies.in/ | 200 | curl + browser (desktop) |
| https://harshatechnologies.in/about | 200 | curl |
| https://harshatechnologies.in/contact | 200 | curl + browser (mobile) |
| https://harshatechnologies.in/brands | 200 | curl (fetched, not analysed in depth) |
| https://harshatechnologies.in/areas | 200 | curl (fetched, not analysed in depth) |
| https://harshatechnologies.in/reviews | 200 | curl (fetched, not analysed in depth) |
| https://harshatechnologies.in/robots.txt | 200 | curl |
| https://harshatechnologies.in/sitemap.xml | 200 | curl — 57 URLs listed |
| https://harshatechnologies.in/llms.txt | 200 | curl |

Not inspected individually: the 16+ area pages, 9 brand pages, 8 service pages, 5 AMC pages and 5 blog posts listed in the sitemap. Their URLs were read from the sitemap only.

### Verified findings — business identity

- **It is a different business.** Harsha Technologies is a **printer repair and printer AMC** service. Its pages contain no projectors, CCTV, AV receivers, home theatre, screens or acoustic products.
- Business name: Harsha Technologies. Owner shown on the site and in JSON-LD: Pothugunta Naresh.
- Phone/WhatsApp: +91 90634 84335 — **different** from Europa's 7416261929.
- Email shown: an address on the harshatechnologies.in domain.
- Address shown: Ground Floor, Nirav's Royal Fontana, New Balaji Nagar, Balaji Nagar, Kukatpally — the **same locality** as Europa's address (15-21-150/7, New Balaji Nagar), but not the same address string.
- It claims "13+ years" printer-repair experience, hours of 8 AM–9 PM, 7 days, and a named service-area list. All of these are **Harsha's** claims.

### Relationship to Europa Office Systems

- **Not established.** The shared locality, the matching 13-year timeline (Europa: since 2013) and the printer theme on the current Europa domain ("Your Printer's Best Friend") suggest the businesses may be connected, for example the same owner or family. That is an **assumption**.
- **Recommendation (applied):** we did **not** copy any Harsha fact (owner, hours, email, service areas, brands, experience claim, reviews) onto the Europa site. The relationship question is in `client-content-needed.md`.

### Verified findings — technical SEO and conversion design

- Stack: Next.js (seen in `/_next/` assets and RSC payload).
- Title/description: keyword-led ("Printer Service and Repair Near Me | Printer Repair Hyderabad") and repeats "near me" phrasing.
- Structured data: `ProfessionalService`, `WebSite`, `Organization` and `FAQPage` JSON-LD on the homepage.
- robots.txt: `Allow: /` plus sitemap reference. Sitemap: 57 URLs, including 19 locality pages and 9 brand pages.
- GA4 tag present (ID not reproduced here).
- Conversion paths: header Call and WhatsApp buttons, a fixed bottom bar on mobile (Call / WhatsApp / Directions), and a contact "form" that **opens WhatsApp** with the details filled in rather than submitting to a server.
- Visual language: white background, navy and green accents, rounded cards, bold sans-serif headings.

### What we took from it (principles only)

- A mobile bottom contact bar works for this audience, so we built our own version.
- Phone and WhatsApp should be visible in the header.
- We did **not** copy its code, copy, logo, colours or layout.
- We **deliberately avoided** its mass locality and brand pages (19 + 9 near-identical URLs). For Europa that pattern would be doorway-like, because the service area is limited and unconfirmed.
- We avoided "near me" keyword stuffing in titles.
- We used a real server-side enquiry endpoint instead of a WhatsApp-only form, so leads can be counted as server-confirmed conversions.

---

## 2. europaofficesystems.com (target domain)

### URLs inspected

| URL | Result |
|---|---|
| https://europaofficesystems.com/ | 200, single page |
| https://www.europaofficesystems.com/ | 301 → apex domain |
| http://europaofficesystems.com/ | 301 → HTTPS apex |
| /robots.txt | 200 — `Disallow: /404` only, no sitemap line |
| /sitemap.xml | 200 (GoDaddy-generated) |
| /manifest.webmanifest | 200 — GoDaddy default icons |

### Verified findings

- Platform: GoDaddy Website Builder / Airo (`generator` meta tag; "Powered by GoDaddy Airo" footer; promotional "Start for free" banner, which suggests a free plan).
- Content: business name, the tagline "Your Printer's Best Friend", a Getty stock image of a person servicing a printer, and an empty "Contact Us" heading. There is **no phone, address, product information or form**.
- Metadata: title "EUROPA OFFICE SYSTEMS", no meta description, Twitter description "Your Printer's Best Friend", no structured data.
- Cookie banner: GoDaddy's default banner.
- DNS: the domain was registered at GoDaddy on **13 May 2026** and uses GoDaddy nameservers (`domaincontrol.com`). The apex resolves to GoDaddy/AWS Global Accelerator IPs. HSTS with `preload` and `includeSubDomains` is already sent.
- No analytics or Google Ads tags were found in the HTML.

### Conclusions

- The current site has no useful content to preserve. It **needs a complete replacement**. The stock image belongs to GoDaddy's Getty licence and must not be reused.
- **Open question:** the printer tagline conflicts with the AV/CCTV product brief. We need to confirm whether Europa also sells or services printers (see `client-content-needed.md`). The new site follows the client brief and does not mention printers.
- The domain is new (May 2026), so search engines have essentially no history for it.
- HSTS preload is already active. The replacement host **must serve HTTPS on the apex and on `www`**.
