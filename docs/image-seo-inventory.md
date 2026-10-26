# Image SEO inventory

Updated 26 October 2026.

## Source and licence

All 20 photos come from **Unsplash** and were checked on each photo's page as "Free to use under the Unsplash License" (not Unsplash+). The licence allows free commercial use without permission or attribution. It does **not** allow selling the photos unmodified or presenting them as part of a competing photo service. We credit the photographers below anyway, and the footer says "Photos are illustrative stock images (Unsplash)".

**Important for Google Images:** these are stock photos, and the same photo appears on Unsplash and many other sites. Google usually shows the **original source** for a duplicate image, so stock photos will rarely rank under "Europa Office Systems" in Google Images. To get Europa's own images showing in Google:

1. Replace the stock photos with **real photos of Europa's work**: projectors being repaired, installations, the shop or office. Use the same file names and alt text conventions.
2. Keep the image sitemap (already generated automatically from `src/lib/pages.ts`).
3. Upload the same real photos to the Google Business Profile. Those show in Maps and local results.

None of the stock photos show Europa's own work, and the site never says they do.

## Implementation

- Files: `public/images/<descriptive-name>-640.webp` and `-1280.webp`. Centre-cropped to 3:2, WebP quality 78, camera metadata stripped. Total 1.4 MB for all 40 files; individual files are 5–140 KB.
- The `<Photo>` component (`src/components/Photo.tsx`) renders a plain `<img>` with `srcset` (640w / 1280w), `sizes`, `width` / `height` (no layout shift) and descriptive `alt`.
  - Hero images use `loading="eager"` and `fetchpriority="high"`; all others lazy-load.
  - Plain `<img>` is deliberate. It keeps clean, descriptive image URLs for Google Images, instead of `/_next/image?url=…`.
- `sitemap.xml` lists every page's images (`<image:image>` entries).
- Each service page uses its hero photo as the Open Graph / WhatsApp share image.
- Registry and credits: `src/lib/images.ts`.

## Inventory

| File (in `public/images/`, -640 / -1280) | Used on | Alt text | Photographer | Unsplash page |
|---|---|---|---|---|
| `projector-repair-service-hyderabad` | Home (tile), Projector Repair (hero) | Close-up of a projector lens during projector service | Kevin “KevDoy” Doyle | https://unsplash.com/photos/iihXfbL342c |
| `benq-projector-service-kukatpally` | Projector Repair | BenQ projector front view showing the lens | Arūnas Naujokas | https://unsplash.com/photos/EEnJpGHkU4k |
| `projector-circuit-board-repair` | Projector Repair | Technician handling an electronic circuit board during repair | ThisisEngineering | https://unsplash.com/photos/32PpagSzeGs |
| `ceiling-mounted-projector-installation` | Home (tile), Projector Installation (hero) | Projector mounted on a ceiling bracket | Nitish Lakra | https://unsplash.com/photos/lRpdB487Aos |
| `classroom-projector-screen-installation` | Projector Installation | Training room with a presentation on a projector screen | Quilia | https://unsplash.com/photos/1-aA2Fadydc |
| `classroom-projection-screen` | Projector Installation | Classroom with a projector and projection screen | Ahmed Siddiqui | https://unsplash.com/photos/DfuZPZxoxwQ |
| `living-room-projector-screen-setup` | Projector Installation | Living room with a wall-mounted projector screen | Im3rd Media | https://unsplash.com/photos/vDHEF40AQb8 |
| `projector-light-beam-home-cinema` | Reserved (not currently placed) | Projector beaming light in a dark room | Alex Litvin | https://unsplash.com/photos/MAYsdoYpGuk |
| `cctv-camera-installation-technician` | Home (tile), CCTV Installation (hero) | Technician fixing a CCTV camera to a wall | Bermix Studio | https://unsplash.com/photos/bAGo7O4prtY |
| `bullet-cctv-camera-mounting` | CCTV Installation | Bullet CCTV camera on a ceiling mount | Franck V. | https://unsplash.com/photos/ujSsIk5iZmA |
| `wifi-dome-cctv-camera-home` | CCTV Installation | Wi-Fi security camera mounted on a house wall | Alan J. Hendry | https://unsplash.com/photos/KNt4zd8HPb0 |
| `cctv-dvr-monitor-live-view` | CCTV Installation | CCTV monitor showing live camera views next to the recorder | Luis Angel Ponce Alvarez | https://unsplash.com/photos/INHrB7zV-C0 |
| `cctv-cameras-supply-hyderabad` | Reserved | Rows of CCTV bullet cameras on a wall | Lianhao Qu | https://unsplash.com/photos/LfaN1gswV5c |
| `home-theatre-room-projector-screen` | Home (tile), Home Theatre (hero) | Home theatre room with a large projector screen and seating | IRa Kang | https://unsplash.com/photos/RBWK3YcwIOQ |
| `home-theatre-recliner-seating-setup` | Home Theatre | Home theatre with recliner seats facing a projected picture | Elite prop | https://unsplash.com/photos/bVTjOXEmUbE |
| `home-theatre-speakers-tv-setup` | Home Theatre | Home theatre with floorstanding speakers either side of the screen | MING | https://unsplash.com/photos/BXKF-rHHbT4 |
| `av-receiver-home-theatre-setup` | Home Theatre | AV receiver on a living room cabinet | Daria Strategy | https://unsplash.com/photos/P868x_ce_X4 |
| `bookshelf-hifi-speaker` | Home Theatre | Bookshelf hi-fi speaker | Josh Sorenson | https://unsplash.com/photos/u8-QI4tRES0 |
| `acoustic-panels-wall-installation` | Acoustic Panels (hero), Home | Fabric acoustic panels fixed to a meeting room wall | Madeline Liu | https://unsplash.com/photos/iLlnYYHM17Y |
| `wooden-acoustic-diffuser-panels` | Acoustic Panels | Wooden slatted acoustic wall treatment | Declan Sun | https://unsplash.com/photos/MEUtre4hH3o |

`cctv-dvr-monitor-live-view` came from a portrait original (1083 px wide after cropping), so its 1280 variant is slightly upscaled. Replace it first when real photos arrive.

Other assets: `public/og-image.png` (1200×630 text card, home/fallback share image), `public/apple-touch-icon.png` and `src/app/icon.svg` (placeholder "E" monogram until the real logo arrives).

## Naming and alt-text rules for new (real) photos

- File name: what the photo shows plus the service, lowercase and hyphenated. One idea per name, for example `epson-projector-lamp-replacement-kukatpally.webp` or `cctv-installation-shop-kphb.webp`. Don't put a list of keywords in a file name.
- Alt text: describe what is actually in the photo ("Ceiling-mounted Epson projector in a school classroom"). Mention the place only if it's true and relevant.
- Process new photos the same way (3:2, 640 and 1280 WebP), add them to `src/lib/images.ts`, and they automatically appear in the image sitemap.
