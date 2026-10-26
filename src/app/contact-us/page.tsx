import { QuoteSection } from '@/components/QuoteSection'
import { Breadcrumbs, ContactButtons } from '@/components/ui'
import { MapIcon } from '@/components/Icons'
import { defaultWhatsappMessage } from '@/lib/services'
import { pageMetadata } from '@/lib/seo'
import { business, telHref } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Contact Us: Call or WhatsApp',
  description:
    'Contact Europa Office Systems, New Balaji Nagar, Kukatpally, Hyderabad. Call or WhatsApp +91 74162 61929 for projector repair, CCTV installation or home theatre setup.',
  path: '/contact-us/',
})

export default function ContactPage() {
  return (
    <>
      <section className="page-head" aria-labelledby="page-title">
        <Breadcrumbs items={[{ name: 'Contact us', path: '/contact-us/' }]} />
        <div className="container" style={{ marginTop: '1rem' }}>
          <h1 id="page-title">Contact {business.name}</h1>
          <p className="lede">The fastest way to reach us is a call or a WhatsApp message.</p>
          <ContactButtons whatsappMessage={defaultWhatsappMessage} location="contact_hero" large />

          <div className="card-grid" style={{ marginTop: '2rem' }}>
            <div className="contact-card">
              <p className="label">Phone and WhatsApp</p>
              <p>
                <a className="contact-big" href={telHref} data-track="phone_click" data-track-location="contact_card">
                  {business.phone.display}
                </a>
              </p>
            </div>
            <div className="contact-card">
              <p className="label">Address</p>
              <address style={{ fontStyle: 'normal', marginBottom: '0.75rem' }}>
                {business.name}
                <br />
                {business.address.street}
                <br />
                {business.address.locality}, {business.address.city}, {business.address.region}
              </address>
              <a
                href={business.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                data-track="directions_click"
                data-track-location="contact_card"
              >
                <MapIcon /> Get directions<span className="visually-hidden"> (opens Google Maps in a new tab)</span>
              </a>
            </div>
          </div>
          <p className="note" style={{ marginTop: '1rem' }}>
            We work in a limited area around Kukatpally, not all of Hyderabad. Please tell us your locality.
          </p>
        </div>
      </section>

      <QuoteSection formType="contact_page" whatsappMessage={defaultWhatsappMessage} />
    </>
  )
}
