import Link from 'next/link'
import { Breadcrumbs, CtaBand } from '@/components/ui'
import { brandGroups, defaultWhatsappMessage } from '@/lib/services'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Projector, CCTV & AV Receiver Brands',
  description:
    'Brands handled by Europa Office Systems, Kukatpally: Epson, BenQ, Panasonic, Sony and more projectors; CP Plus, Hikvision and TP-Link CCTV; Denon, Marantz, Yamaha and more AV receivers.',
  path: '/brands/',
})

export default function BrandsPage() {
  return (
    <>
      <section className="page-head" aria-labelledby="page-title">
        <Breadcrumbs items={[{ name: 'Brands', path: '/brands/' }]} />
        <div className="container" style={{ marginTop: '1rem' }}>
          <h1 id="page-title">Brands we handle</h1>
          <p className="lede">Projector, CCTV and AV receiver brands we work with. Ask us about a specific model.</p>
        </div>
      </section>

      <section className="section" aria-label="Brands by product">
        <div className="container">
          <div className="brand-groups">
            {brandGroups.map((g) => (
              <div key={g.label}>
                <h2 style={{ fontSize: '1.35rem' }}>{g.label}</h2>
                <ul className="brand-list" style={{ marginBottom: '1rem' }}>
                  {g.list.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <Link href={g.path}>{g.label} services</Link>
              </div>
            ))}
          </div>
          <p className="note" style={{ marginTop: '2rem' }}>
            Brand names and trademarks belong to their owners. Listing a brand does not mean we are an authorised dealer,
            distributor or service centre for it.
          </p>
        </div>
      </section>

      <CtaBand heading="Looking for a particular brand or model?" text="Ask us on WhatsApp or call." whatsappMessage={defaultWhatsappMessage} location="brands_cta" />
    </>
  )
}
