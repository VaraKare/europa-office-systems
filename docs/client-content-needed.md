# Client content and confirmations needed

Everything below is either **missing** or **unverified**. Nothing here has been published as fact. Where the site needs a value, it is `null` in [`src/lib/site.ts`](../src/lib/site.ts) and is simply not rendered. Fill in that file (and [`src/lib/categories.ts`](../src/lib/categories.ts) for product content) once the client confirms.

**Priority:** P1 = needed before Google Ads traffic or launch; P2 = needed soon after launch; P3 = nice to have.

## A. Business identity and relationships

| # | Question | Why it matters | Priority |
|---|---|---|---|
| A1 | What is the relationship between Europa Office Systems and **Harsha Technologies** (harshatechnologies.in)? Same owner, family business, partner, or unrelated? | The two sites share a locality (New Balaji Nagar) and a 13-year timeline. Until this is confirmed, no Harsha facts (owner name, hours, email, service areas, reviews) can be used. Google also treats closely related businesses carefully on Business Profiles. | P1 |
| A2 | The current europaofficesystems.com tagline is **"Your Printer's Best Friend"**. Does Europa sell or service **printers** or office equipment? | The new site follows the AV/CCTV brief and does not mention printers. If printers are part of the business, a page may be needed. If not, the old tagline should not reappear anywhere (social profiles, GBP). | P1 |
| A3 | Is "2013" the year **this business** started, or the owner's personal experience? Exact month if known. | The site says "since 2013" and "Est. 2013", and JSON-LD `foundingDate` is 2013. We deliberately avoided "13+ years". | P1 |
| A4 | Exact legal / trading name and how it should be written (Europa Office Systems vs EUROPA OFFICE SYSTEMS). Is it registered (GST, Udyam, etc.)? | NAP consistency with the Google Business Profile; registration details are optional to publish. | P2 |
| A5 | **Logo** (vector SVG preferred) and brand colours, if any. | The site currently uses a text wordmark and a placeholder "E" icon. | P2 |
| A6 | Owner or contact person name, if the client wants it shown. | Optional trust signal; not required. | P3 |

## B. Contact details and location

| # | Question | Priority |
|---|---|---|
| B1 | Confirm the phone **+91 74162 61929** is answered for both calls and WhatsApp, and whether it is a WhatsApp Business account. | P1 |
| B2 | **PIN code** and the exact postal address format (is "15-21-150/7, New Balaji Nagar, Kukatpally, Hyderabad, Telangana" complete? Building name, landmark, floor?). | P1 |
| B3 | Is the address a **showroom / shop open to walk-in customers**, an office, or a residence used for business? | P1. The site does not say a showroom exists. If it is open to the public, we can switch the schema type and add "visit us" content. |
| B4 | **Opening hours** (days and times). | P1 for the Business Profile; the site shows none until confirmed. |
| B5 | Official **email address**, if one should be published. | P2. None is shown now. |
| B6 | The **Google Business Profile** URL (share link) and the map pin. | P1. Replaces the address-search link in `business.mapsUrl` and adds `sameAs`. |
| B7 | Any genuine **social profiles** (Facebook, Instagram, YouTube, IndiaMART, JustDial) to link. | P3 |

## C. Service area

| # | Question | Priority |
|---|---|---|
| C1 | Which **localities** are actually served (for example Kukatpally, KPHB, Miyapur, Nizampet, Moosapet, Bachupally)? Any distance limit? | P1. The site currently says "a limited area around Kukatpally — ask to confirm", and Google Ads location targeting must match it. |
| C2 | Does service coverage differ by product (for example projectors supplied city-wide, CCTV only nearby)? | P2 |
| C3 | Is delivery offered, and is it free or charged? | P2 |

## D. Services (now published, scope still to confirm)

On 26 October 2026 the agency confirmed that Europa is a **services business**, so the site was rebuilt around five service pages:
- Projector Repair
- Projector & Screen Installation
- CCTV Installation
- Home Theatre Setup
- Acoustic Panels

Please confirm the detail of each, and tell us about anything that should be removed.

| # | Question | Where it appears | Priority |
|---|---|---|---|
| D1 | **Projector repair**: which brands and faults are repaired? Is repair done at the customer's location, at Europa's premises, or both? Are lamps and parts supplied? | `/projector-repair/` | P1 |
| D2 | **Projector & screen installation**: ceiling mounting, cabling, motorised screen wiring — all offered? | `/projector-installation/` | P1 |
| D3 | **CCTV**: new installation, repair of existing systems (including other installers' systems), mobile-app setup, maintenance or AMC? | `/cctv-installation/` | P1 |
| D4 | **Home theatre**: what does "setup" include (in-wall wiring, calibration, acoustic treatment)? Does Europa fix sound problems on existing systems? | `/home-theatre-installation/` | P1 |
| D5 | **Acoustic panels**: supply and fixing both? Which materials (fabric, wood)? | `/acoustic-panel-installation/` | P1 |
| D6 | The "How it works" step says **"We explain what is needed and what it will cost before any work goes ahead."** Is this true for every job? If not, we will soften it. | All service pages | P1 |
| D7 | Are site visits or inspection charges applicable? | Not stated anywhere yet | P2 |
| D8 | Is there a service warranty on repairs or installations? | Not stated anywhere (deliberately) | P2 |
| D9 | Same-day or emergency service? | Not stated anywhere (deliberately) | P2 |
| D10 | Projector rental for events? | Not offered on the site | P3 |
| D11 | Should the site include TV or printer services? The old site's tagline was "Your Printer's Best Friend" (see A2). | Not offered on the site | P1 |

## E. Products and brands

| # | Question | Priority |
|---|---|---|
| E1 | Confirm each listed brand is **currently** supplied. Projectors: Epson, BenQ, Panasonic, Hitachi, Sony, LG, Samsung, **Optoma** (spelling is correct as written; confirm availability). AV receivers: Marantz, Denon, Sony, Yamaha, Onkyo, Anthem, Pioneer. CCTV: CP Plus, Hikvision, TP-Link. | P1 |
| E2 | Is Europa an **authorised dealer / partner** for any brand? If yes, which, and is there proof (certificate, brand-site dealer listing)? | P2. The site currently states that listing does **not** imply dealership. |
| E3 | **Hi-fi speaker brands** handled (none supplied). | P2 |
| E4 | **Screen** and **acoustic panel** brands or manufacturers, and materials or finishes available. | P2 |
| E5 | Does Europa sell **TVs**, soundbars, amplifiers, streamers, cables, mounts or video-conferencing equipment? | P2 |
| E6 | Who buys: homes, offices, schools, government tenders, dealers (B2B resale)? The homepage currently says "homes, offices and institutions". Confirm or correct. | P1 |
| E7 | A **product catalogue** (PDFs, model list) if individual product pages are wanted. Each needs a maintenance owner, since prices and stock change. | P3 |
| E8 | Warranty handling (manufacturer warranty only? any added support?). | P2. Nothing is claimed now. |
| E9 | Payment methods, GST invoices, EMI options. | P3 |

## F. Proof and trust (never fabricate)

| # | Item | Priority |
|---|---|---|
| F1 | Real **photos**: repairs in progress, completed installations (with customer permission), the shop/office and the team. | P1. The site currently uses illustrative Unsplash stock photos. Real photos build trust and are the only images that will rank under Europa's name in Google Images. |
| F2 | Real **projects** for a future `/projects/` page: customer type, locality, what was supplied, photos, and permission to publish. | P2 |
| F3 | Genuine **customer reviews**, ideally on the Google Business Profile. Do not copy reviews onto the site without permission and a verifiable source. | P2 |
| F4 | Any certifications, memberships or awards, with evidence. | P3 |

## G. Privacy and legal

| # | Question | Priority |
|---|---|---|
| G1 | Who receives website enquiries (person or role), and where are they stored (email inbox, Google Sheet, CRM)? | P1 (needed to configure delivery) |
| G2 | **Retention period** for enquiries. The policy currently says "only as long as needed … then delete". The client must confirm an actual practice. | P1 |
| G3 | A grievance contact for privacy requests (a name or role plus an email/phone). | P1 |
| G4 | Legal review of the privacy policy against the DPDP Act, 2023 and the DPDP Rules. The policy is a factual draft, **not** legal advice. | P1 |
| G5 | Are terms and conditions needed (for example for quotations, delivery, returns)? None are published, because no checkout exists. | P3 |

## H. Accounts and credentials (for the developer, not the public site)

- Hosting account (Vercel recommended) and DNS access at GoDaddy.
- Enquiry delivery: a webhook endpoint or a Resend account with a verified sending domain.
- Google Analytics 4 property, Google Ads account and conversion labels.
- Google Search Console access for `europaofficesystems.com` (domain property via DNS).
- Google Business Profile manager access.
