# Current project audit

Audit date: 20 October 2026.

## Verified findings

- The working directory `/Users/karevaraprasad/Desktop/Projects/EUROPA-OFFICE-SYSTEMS` was **empty** at the start: no files, no `package.json`, no git repository.
- So there was no existing framework, routing, styling, analytics, form, image, asset or SEO configuration to preserve.
- Local toolchain: Node.js 20.19.4 and npm 11.19.1. No pnpm, Vercel CLI or Netlify CLI installed.
- No deployment configuration or hosting credentials exist in the project. The live domain is on GoDaddy Website Builder (see `reference-audit.md`).

## Stack decision (new project)

| Need | Choice | Reason |
|---|---|---|
| Crawlable, pre-rendered HTML | **Next.js 16 (App Router)**, static generation for every content page | Server-rendered HTML, built-in metadata, sitemap, robots and manifest APIs; the same framework as the reference site, so the client's developer will already know it |
| Real form delivery | Next.js Route Handler `POST /api/enquiry` (Node runtime) | Keeps secrets server-side; server-side validation; lets "lead" conversions be counted only after the server confirms |
| Language | TypeScript (strict) | Maintainability |
| Styling | One hand-written CSS file using custom-property design tokens | No CSS framework needed for about 14 pages; small CSS payload |
| Fonts | IBM Plex Sans and IBM Plex Mono via `next/font` (self-hosted at build, SIL OFL) | No runtime request to Google Fonts; no layout shift |
| Imagery | Hand-drawn inline SVG product illustrations | No real client photos exist yet; SVGs are honest illustrations, weigh almost nothing and carry no licensing risk. Replace them with real photos when supplied |
| Tests | Vitest (unit) plus a Node crawler script against the production build | Small dependency footprint |
| Hosting (recommended) | Vercel, or any Node 20+ host that runs `next start` | The form endpoint needs a server runtime, so a purely static export would not work |

Pinned versions: next 16.3.8 (released 30 Sep 2026; 16.4.x is only days old), react 19.x, typescript 5.9.x.

## Assumptions

- The client will move DNS (or add records) from GoDaddy Website Builder to the new host.
- The client's developer or agency will create the GA4, Google Ads, Search Console and email-provider accounts. No credentials were provided.
