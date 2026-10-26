import Link from 'next/link'
import { pageMetadata } from '@/lib/seo'
import { business, telHref } from '@/lib/site'
import { whatsappUrl } from '@/lib/whatsapp'
import { defaultWhatsappMessage } from '@/lib/services'

// Not indexed and excluded from the sitemap. This page does not record conversions:
// the lead event fires only when the server confirms delivery (see QuoteForm).
export const metadata = pageMetadata({
  title: 'Enquiry Sent',
  description: 'Your enquiry has been sent to Europa Office Systems.',
  path: '/thank-you/',
  noindex: true,
})

export default function ThankYouPage() {
  return (
    <section className="center-page" aria-labelledby="page-title">
      <div className="container prose">
        <p className="eyebrow">Enquiry received</p>
        <h1 id="page-title">Thank you. Your enquiry has been sent.</h1>
        <p className="lede">
          {business.name} has received your details and will contact you on the number you gave.
        </p>
        <p>
          If your requirement is urgent, or you would like to send photos of your room or site, you can also{' '}
          <a
            href={whatsappUrl(defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            data-track="whatsapp_click"
            data-track-location="thank_you"
          >
            message us on WhatsApp<span className="visually-hidden"> (opens in a new tab)</span>
          </a>{' '}
          or call{' '}
          <a href={telHref} data-track="phone_click" data-track-location="thank_you">
            {business.phone.display}
          </a>
          .
        </p>
        <p>
          <Link href="/">Back to the homepage</Link>
        </p>
      </div>
    </section>
  )
}
