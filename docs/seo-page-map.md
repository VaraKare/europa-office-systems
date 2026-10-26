# SEO page map

Updated 26 October 2026 after the switch to a **service-led** site. Titles, descriptions, H1s and H2s below are copied from the production build.

**Keyword data disclaimer:** no Keyword Planner, Search Console or SEO-tool access was available, so **no search volumes, difficulty or rankings were measured**. Keyword priorities are a qualitative hypothesis based on commercial intent and on how customers describe problems ("projector not working", "CCTV not recording"). Validate them with Keyword Planner and Search Console data before adding pages.

## Keyword themes → pages

| Theme (hypothesis) | Intent | Page |
|---|---|---|
| projector repair Kukatpally / Hyderabad, projector service, projector not turning on, projector lamp replacement, Epson / BenQ projector repair | Urgent, service, local | `/projector-repair/` |
| projector installation, ceiling projector mounting, motorised projector screen, projector screen Hyderabad, classroom / office projector | Commercial job | `/projector-installation/` |
| CCTV installation Kukatpally / Hyderabad, CCTV camera for home / shop, CCTV not working, CP Plus / Hikvision CCTV | Commercial + urgent, local | `/cctv-installation/` |
| home theatre setup Kukatpally, home theatre installation Hyderabad, AV receiver Denon / Marantz / Yamaha | Project, planning | `/home-theatre-installation/` |
| acoustic panels Hyderabad, acoustic panel installation, home theatre acoustic treatment | Commercial | `/acoustic-panel-installation/` |
| Europa Office Systems (brand), contact, address | Navigational | `/`, `/contact-us/`, `/about-us/` |

The problem phrases customers actually type ("projector not turning on", "CCTV not recording", "no sound from some speakers") appear as visible text on the service pages, in the tap-to-WhatsApp problem lists.

## Page inventory (from the build)

| URL | Title | Meta description | H1 | H2 outline |
|---|---|---|---|---|
| `/` | Projector, CCTV & Home Theatre Services, Kukatpally \| Europa Office Systems | Projector repair and installation, CCTV camera installation and service, and home theatre setup in Kukatpally, Hyderabad. Call or WhatsApp Europa Office Systems: +91 74162 61929. | Projector, CCTV and home theatre services in Kukatpally | What do you need help with? · Our services · Brands we handle · How it works · Projector or CCTV not working? · Request a call back · Questions people ask |
| `/projector-repair/` | Projector Repair & Service in Kukatpally \| Europa Office Systems | Projector not working? Call or WhatsApp Europa Office Systems, Kukatpally, Hyderabad for projector repair and service. Epson, BenQ, Panasonic, Sony, Optoma and more. | Projector repair and service in Kukatpally | Is your projector doing this? · Projector service · Brands · How it works · Book Projector Repair · Request a call back · Questions people ask · Other services |
| `/projector-installation/` | Projector & Screen Installation in Hyderabad \| Europa Office Systems | New projector for your office, classroom or home? Europa Office Systems, Kukatpally supplies and installs projectors and tripod, wall-mounted and motorised screens. | Projector and screen installation | What do you need? · Projectors and screens · Brands · How it works · Get an Installation Quote · Request a call back · Questions people ask · Other services |
| `/cctv-installation/` | CCTV Camera Installation & Service in Hyderabad \| Europa Office Systems | CCTV cameras for home, shop or office, or cameras not working? Europa Office Systems, Kukatpally, installs and services CP Plus, Hikvision and TP-Link CCTV. Call or WhatsApp. | CCTV camera installation and service | What do you need help with? · CCTV service · Brands · How it works · Get a CCTV Quote · Request a call back · Questions people ask · Other services |
| `/home-theatre-installation/` | Home Theatre Setup & Installation in Kukatpally \| Europa Office Systems | Home theatre setup in Kukatpally, Hyderabad: projector, screen, AV receiver (Denon, Marantz, Yamaha and more) and speakers supplied and set up by Europa Office Systems. | Home theatre setup and installation | What are you planning? · Home theatre · Brands · How it works · Plan Your Home Theatre · Request a call back · Questions people ask · Other services |
| `/acoustic-panel-installation/` | Acoustic Panels Supply & Installation, Hyderabad \| Europa Office Systems | Echo in your home theatre, meeting room or studio? Europa Office Systems, Kukatpally supplies and fixes acoustic panels to make sound clearer. Call or WhatsApp. | Acoustic panels for home theatres, offices and studios | Where is the echo? · Acoustic treatment · How it works · Ask About Acoustic Panels · Request a call back · Questions people ask · Other services |
| `/brands/` | Projector, CCTV & AV Receiver Brands \| Europa Office Systems | Brands handled by Europa Office Systems, Kukatpally: Epson, BenQ, Panasonic, Sony and more projectors; CP Plus, Hikvision and TP-Link CCTV; Denon, Marantz, Yamaha and more AV receivers. | Brands we handle | Projectors · CCTV · AV receivers · Looking for a particular brand or model? |
| `/about-us/` | About Us: Kukatpally Since 2013 \| Europa Office Systems | Europa Office Systems has been based in New Balaji Nagar, Kukatpally, Hyderabad since 2013, providing projector, CCTV, home theatre and acoustic services. | About Europa Office Systems | What we do · Where we work · Contact · Need help with a projector, CCTV or home theatre? |
| `/contact-us/` | Contact Us: Call or WhatsApp \| Europa Office Systems | Contact Europa Office Systems, New Balaji Nagar, Kukatpally, Hyderabad. Call or WhatsApp +91 74162 61929 for projector repair, CCTV installation or home theatre setup. | Contact Europa Office Systems | Request a call back |
| `/privacy-policy/` | Privacy Policy \| Europa Office Systems | How Europa Office Systems collects and uses the personal details you share through this website, WhatsApp or phone, and the choices you have about analytics cookies. | Privacy policy | Who we are · What we collect · How we use your details · Consent · Who receives your details · Cookies and analytics · How long we keep details · Your rights · Children · Changes |

All pages are indexable and listed in `sitemap.xml` with their images. `/thank-you/` is `noindex` and not in the sitemap. The 404 page returns HTTP 404.

## Conversion path on every service page

1. **Hero**: H1, one-line problem statement, **Call** (blue) and **WhatsApp** (green) buttons.
2. **Problem list**: each problem is a one-tap WhatsApp message, for example "Hello Europa Office Systems, I need help: Projector not turning on. Area: ___."
3. Service cards with photos.
4. Brands.
5. How it works.
6. Blue Call / WhatsApp band.
7. Call-back form.
8. FAQ.
9. Links to other services.

The mobile sticky bar (Call / WhatsApp / Directions) is present on every page.

## Structured data

- Every page: `LocalBusiness` + `WebSite` (one entity, `@id` `https://europaofficesystems.com/#business`), with verified facts only.
- Every page except home: `BreadcrumbList`, matching the visible breadcrumbs.
- `Service` schema is **not** added yet. Add it per service page once the scope in `client-content-needed.md` section D is confirmed.
- `FAQPage` schema is not used. Google limits FAQ rich results to authoritative government and health sites.

## Deliberately not created

- **Locality pages**, such as "projector repair KPHB": the service area is unconfirmed, and template pages that only swap the place name are doorway pages that Google penalises. Add them only for confirmed areas, each with genuinely local content.
- **Brand repair pages**, such as "Epson projector repair": add them only with real brand-specific content, like common faults seen and photos of real jobs.
- **Projects page**: add it when real job photos and descriptions exist.

## Recommended Google Ads landing pages

| Ad group | Landing page |
|---|---|
| Projector repair / service / not working | `/projector-repair/` |
| Projector installation / screens | `/projector-installation/` |
| CCTV installation / CCTV repair | `/cctv-installation/` |
| Home theatre setup | `/home-theatre-installation/` |
| Brand name / generic | `/` |
