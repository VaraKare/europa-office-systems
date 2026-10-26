import { brandGroups } from '@/lib/services'
import { publicPages } from '@/lib/pages'
import { absoluteUrl, addressOneLine, business } from '@/lib/site'

export const dynamic = 'force-static'

/** /llms.txt, following the llmstxt.org proposal: H1, blockquote summary, then link lists. */
export function GET() {
  const link = (p: { path: string; name: string; summary: string }) => `- [${p.name}](${absoluteUrl(p.path)}): ${p.summary}`
  const brands = brandGroups.map((g) => `- ${g.label}: ${g.list.join(', ')}`).join('\n')

  const body = `# ${business.name}

> ${business.name} is a business in Kukatpally, Hyderabad, Telangana, India, operating since ${business.foundingYear}. It provides projector repair and service, projector and screen installation, CCTV camera installation and service, home theatre setup (AV receivers, speakers, screens) and acoustic panel installation, and supplies the related equipment. Customers contact it by phone or WhatsApp, or through the website call-back form. Prices are not published; they depend on the job.

Key facts:

- Address: ${addressOneLine}, ${business.address.countryName}
- Phone and WhatsApp: ${business.phone.display}
- Service area: a limited area around Kukatpally, not all of Hyderabad. Customers should confirm coverage for their locality.
- Brands handled (not a claim of authorised dealership):
${brands.replace(/^/gm, '  ')}

## Services

${publicPages.filter((p) => p.group === 'services').map(link).join('\n')}

## Company

${publicPages.filter((p) => p.group === 'main' || p.group === 'company').map(link).join('\n')}

## Optional

${publicPages.filter((p) => p.group === 'legal').map(link).join('\n')}
- [Sitemap](${absoluteUrl('/sitemap.xml')}): XML sitemap of all public pages
`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
