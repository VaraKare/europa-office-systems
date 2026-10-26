/**
 * Crawls a running build (default http://localhost:3100) and checks SEO/link hygiene.
 * Usage: npm run build && npm start -- -p 3100 & npm run check:site
 * Exit code 1 if any check fails.
 */
import { parse } from 'node-html-parser'

const BASE = (process.env.CHECK_BASE || 'http://localhost:3100').replace(/\/$/, '')
const PROD = (process.env.NEXT_PUBLIC_SITE_URL || 'https://europaofficesystems.com').replace(/\/$/, '')
const failures = []
const passes = []
const fail = (m) => failures.push(m)
const ok = (m) => passes.push(m)
const local = (u) => u.replace(PROD, BASE)
const check = (cond, pass, failMsg) => (cond ? ok(pass) : fail(failMsg))

async function get(path, opts = {}) {
  const res = await fetch(path.startsWith('http') ? path : BASE + path, { redirect: 'manual', ...opts })
  return { res, text: await res.text() }
}

// --- robots.txt
{
  const { res, text } = await get('/robots.txt')
  check(res.status === 200, 'robots.txt 200', `robots.txt status ${res.status}`)
  check(text.includes(`Sitemap: ${PROD}/sitemap.xml`), 'robots.txt references sitemap', 'robots.txt missing sitemap line')
  check(!/Disallow: \/\s*$/m.test(text), 'robots.txt does not block site', 'robots.txt blocks everything')
}

// --- sitemap
const { res: smRes, text: sm } = await get('/sitemap.xml')
check(smRes.status === 200, 'sitemap.xml 200', `sitemap status ${smRes.status}`)
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
check(urls.length, `sitemap lists ${urls.length} URLs`, 'sitemap empty')
for (const u of urls) if (!(u.startsWith(`${PROD}/`) && u.endsWith('/'))) fail(`sitemap URL not canonical form: ${u}`)
if (urls.some((u) => u.includes('thank-you'))) fail('sitemap includes noindex thank-you page')

const titles = new Map()
const descs = new Map()
const internalLinks = new Set()
const imageUrls = new Set()

for (const url of urls) {
  const path = url.replace(PROD, '')
  const { res, text } = await get(path)
  if (res.status !== 200) {
    fail(`${path}: status ${res.status}`)
    continue
  }
  const root = parse(text)
  const title = root.querySelector('title')?.text.trim()
  const desc = root.querySelector('meta[name="description"]')?.getAttribute('content')
  const canonical = root.querySelector('link[rel="canonical"]')?.getAttribute('href')
  const robots = root.querySelector('meta[name="robots"]')?.getAttribute('content') || ''
  const h1s = root.querySelectorAll('h1')
  const og = root.querySelector('meta[property="og:image"]')?.getAttribute('content')

  if (!title) fail(`${path}: missing title`)
  else {
    if (titles.has(title)) fail(`${path}: duplicate title with ${titles.get(title)}`)
    titles.set(title, path)
    if (title.length > 75) fail(`${path}: title long (${title.length} chars)`)
  }
  if (!desc) fail(`${path}: missing meta description`)
  else {
    if (descs.has(desc)) fail(`${path}: duplicate description with ${descs.get(desc)}`)
    descs.set(desc, path)
    if (desc.length < 70 || desc.length > 200) fail(`${path}: description length ${desc.length}`)
  }
  if (h1s.length !== 1) fail(`${path}: ${h1s.length} h1 elements`)
  if (canonical !== url) fail(`${path}: canonical ${canonical} != ${url}`)
  if (/noindex/.test(robots)) fail(`${path}: noindex but in sitemap`)
  if (!og) fail(`${path}: missing og:image`)
  else if (!og.startsWith(`${PROD}/`)) fail(`${path}: og:image not absolute on production origin`)

  // JSON-LD validity
  for (const s of root.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      const data = JSON.parse(s.text)
      const items = Array.isArray(data) ? data : [data]
      for (const it of items) if (!it['@context'] || !it['@type']) fail(`${path}: JSON-LD item without @context/@type`)
      if (items.some((i) => i['@type'] === 'BreadcrumbList') && !root.querySelector('nav[aria-label="Breadcrumb"]'))
        fail(`${path}: BreadcrumbList without visible breadcrumbs`)
    } catch (e) {
      fail(`${path}: invalid JSON-LD (${e.message})`)
    }
  }

  // Images and SVGs
  for (const img of root.querySelectorAll('img')) {
    if (img.getAttribute('alt') == null) fail(`${path}: <img> without alt`)
    if (!img.getAttribute('width') || !img.getAttribute('height')) fail(`${path}: <img> without width/height`)
    for (const c of [img.getAttribute('src'), ...(img.getAttribute('srcset') || '').split(',').map((x) => x.trim().split(' ')[0])]) if (c) imageUrls.add(c)
  }
  for (const svg of root.querySelectorAll('svg')) {
    const hidden = svg.getAttribute('aria-hidden') === 'true'
    const labelled = svg.getAttribute('role') === 'img' && svg.getAttribute('aria-label')
    if (!hidden && !labelled) fail(`${path}: svg neither hidden nor labelled`)
  }

  // Links
  for (const a of root.querySelectorAll('a[href]')) {
    const href = a.getAttribute('href')
    if (href === '#' || href === '') fail(`${path}: placeholder link href="${href}"`)
    if (href.startsWith('tel:') && href !== 'tel:+917416261929') fail(`${path}: unexpected tel link ${href}`)
    if (href.startsWith('https://wa.me/') && !/^https:\/\/wa\.me\/917416261929\?text=/.test(href)) fail(`${path}: bad WhatsApp link ${href}`)
    if (a.getAttribute('target') === '_blank' && !/noopener/.test(a.getAttribute('rel') || '')) fail(`${path}: _blank without noopener`)
    if (!a.text.trim() && !a.getAttribute('aria-label')) fail(`${path}: link without accessible text (${href})`)
    if (href.startsWith('/')) internalLinks.add(href.split('#')[0])
    if (href.startsWith('#') && href.length > 1 && !root.querySelector(`[id="${href.slice(1)}"]`)) fail(`${path}: in-page anchor ${href} missing`)
  }
  // Must have a conversion path
  if (!text.includes('wa.me/917416261929') || !text.includes('tel:+917416261929')) fail(`${path}: missing WhatsApp or phone CTA`)
}
ok(`${titles.size} unique titles, ${descs.size} unique descriptions checked`)

// Internal link targets
for (const href of internalLinks) {
  const { res } = await get(href)
  if (res.status !== 200) fail(`internal link ${href} -> ${res.status}`)
}
ok(`${internalLinks.size} internal link targets checked`)

// Images referenced by pages and listed in the sitemap
for (const m of sm.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)) imageUrls.add(m[1].replace(PROD, ''))
for (const src of imageUrls) {
  const { res } = await get(src)
  if (res.status !== 200 || !(res.headers.get('content-type') || '').startsWith('image/')) fail(`image ${src} -> ${res.status}`)
}
ok(`${imageUrls.size} image URLs return images`)

// Non-sitemap pages
{
  const { res, text } = await get('/thank-you/')
  check(res.status === 200 && /noindex/.test(parse(text).querySelector('meta[name="robots"]')?.getAttribute('content') || ''), '/thank-you/ is noindex', '/thank-you/ should be 200 + noindex')
}
{
  const { res, text } = await get('/this-page-does-not-exist/')
  check(res.status === 404, 'unknown URL returns 404', `unknown URL returns ${res.status}`)
  check(text.includes('We could not find that page'), 'custom 404 page renders', 'custom 404 content missing')
}
{
  const { res } = await get('/projector-repair')
  check([301, 308].includes(res.status) && res.headers.get('location')?.endsWith('/projector-repair/'), 'non-trailing-slash URL redirects to canonical form', `/projector-repair -> ${res.status} ${res.headers.get('location')}`)
}
{
  const { res, text } = await get('/llms.txt')
  check(res.status === 200, 'llms.txt 200', `llms.txt status ${res.status}`)
  const links = [...text.matchAll(/\]\((https?:[^)]+)\)/g)].map((m) => m[1])
  for (const l of links) {
    const { res: r } = await get(local(l))
    if (r.status !== 200) fail(`llms.txt link ${l} -> ${r.status}`)
  }
  ok(`llms.txt: ${links.length} links resolve`)
}
for (const p of ['/manifest.webmanifest', '/icon.svg', '/apple-touch-icon.png', '/og-image.png']) {
  const { res } = await get(p)
  check(res.status === 200, `${p} 200`, `${p} status ${res.status}`)
}
{
  const { res } = await get('/')
  const h = res.headers
  for (const k of ['content-security-policy', 'x-content-type-options', 'referrer-policy', 'x-frame-options'])
    check(h.get(k), `header ${k} present`, `header ${k} missing`)
  if (h.get('x-powered-by')) fail('x-powered-by header exposed')
  else ok('no x-powered-by header')
}

for (const p of passes) console.log('PASS', p)
for (const f of failures) console.log('FAIL', f)
console.log(`\n${passes.length} passed, ${failures.length} failed`)
process.exit(failures.length ? 1 : 0)
