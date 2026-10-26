import Link from 'next/link'
import { Breadcrumbs, CtaBand } from '@/components/ui'
import { defaultWhatsappMessage, services } from '@/lib/services'
import { pageMetadata } from '@/lib/seo'
import { addressOneLine, business, telHref } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'About Us: Kukatpally Since 2013',
  description:
    'Europa Office Systems has been based in New Balaji Nagar, Kukatpally, Hyderabad since 2013, providing projector, CCTV, home theatre and acoustic services.',
  path: '/about-us/',
})

export default function AboutPage() {
  return (
    <>
      <section className="page-head" aria-labelledby="page-title">
        <Breadcrumbs items={[{ name: 'About us', path: '/about-us/' }]} />
        <div className="container" style={{ marginTop: '1rem' }}>
          <h1 id="page-title">About {business.name}</h1>
          <p className="lede">A Kukatpally business working with projectors, CCTV and home audio-visual systems since {business.foundingYear}.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="what-title">
        <div className="container prose">
          <h2 id="what-title">What we do</h2>
          <p>
            {business.name} has worked from New Balaji Nagar in Kukatpally, Hyderabad since {business.foundingYear}. People come
            to us when a projector stops working, when an office, classroom or home needs a projector or screen installed,
            when a home, shop or office needs CCTV, or when they want a home theatre set up.
          </p>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={s.path}>{s.navLabel}</Link>
              </li>
            ))}
          </ul>
          <h2>Where we work</h2>
          <p>
            We work in a limited area around Kukatpally, not all of Hyderabad. If you are not sure whether we cover your
            locality, just ask.
          </p>
          <h2>Contact</h2>
          <p>
            {addressOneLine}
            <br />
            Phone and WhatsApp: <a href={telHref}>{business.phone.display}</a>
          </p>
        </div>
      </section>

      <CtaBand heading="Need help with a projector, CCTV or home theatre?" text="Call or WhatsApp us." whatsappMessage={defaultWhatsappMessage} location="about_cta" />
    </>
  )
}
