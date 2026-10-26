import Link from 'next/link'
import { Breadcrumbs } from '@/components/ui'
import { pageMetadata } from '@/lib/seo'
import { addressOneLine, business, telHref } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'How Europa Office Systems collects and uses the personal details you share through this website, WhatsApp or phone, and the choices you have about analytics cookies.',
  path: '/privacy-policy/',
})

// Update this date whenever the policy content changes.
const LAST_UPDATED = '26 October 2026'

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Privacy policy', path: '/privacy-policy/' }]} />
      <section className="hero" aria-labelledby="page-title">
        <div className="container prose">
          <p className="eyebrow">Last updated {LAST_UPDATED}</p>
          <h1 id="page-title">Privacy policy</h1>
          <p className="lede">
            This policy explains what personal details {business.name} collects through this website, why, and what you can
            do about it.
          </p>

          <h2>Who we are</h2>
          <p>
            {business.name}, {addressOneLine}, {business.address.countryName}. Phone:{' '}
            <a href={telHref}>{business.phone.display}</a>.
          </p>

          <h2>What we collect</h2>
          <h3>When you send the call-back form</h3>
          <ul>
            <li>Your name and phone number.</li>
            <li>Your area or locality.</li>
            <li>The service you need and your description of the problem or requirement.</li>
            <li>
              Basic context about how you reached the site: the page you submitted from, the first page you visited, the
              referring website and any campaign tags in the link (for example utm_source, or a Google Ads click
              identifier). This helps us understand which adverts and pages bring enquiries.
            </li>
          </ul>
          <p>We do not ask for your email address, home address, payment details or any government ID through this website.</p>

          <h3>When you contact us by WhatsApp or phone</h3>
          <p>
            We receive whatever you send or tell us, such as your number, messages and photos. WhatsApp messages are also
            processed by WhatsApp under its own terms and privacy policy.
          </p>

          <h3>Technical data</h3>
          <p>
            Like most websites, our hosting provider automatically processes technical data such as your IP address and
            browser type to deliver pages and protect the site from abuse. We use your IP address briefly to limit repeated
            form submissions.
          </p>

          <h2>How we use your details</h2>
          <ul>
            <li>To call you back, advise you and quote for the work.</li>
            <li>To keep a record of enquiries and any resulting sale.</li>
            <li>To understand, in aggregate, which pages and adverts lead to enquiries.</li>
          </ul>
          <p>We do not sell your personal details, and we do not add you to marketing lists from the enquiry form.</p>

          <h2>Consent</h2>
          <p>
            The call-back form asks for your consent before it sends your details. You can withdraw consent at any time by
            contacting us. Withdrawing consent does not affect anything we did before you withdrew it.
          </p>

          <h2>Who receives your details</h2>
          <p>
            Your enquiry is sent to {business.name} through our website hosting provider and the email or spreadsheet
            service we use to receive enquiries. These providers process the data only to deliver that service. We may also
            share details where the law requires it.
          </p>

          <h2 id="cookies">Cookies and analytics</h2>
          <p>
            The site works without any analytics cookies. If analytics are switched on, we ask for your permission first.
            Only if you select <strong>Accept analytics</strong> do we load Google Analytics and Google Ads measurement
            tags, which set cookies to count visits and measure which adverts lead to enquiries. We do not send your name,
            phone number or messages to Google.
          </p>
          <p>
            Your choice is stored in your browser so that we do not ask on every page. The site also keeps the campaign
            context described above in your browser for the current visit only. You can change your choice at any time
            with the <strong>Cookie settings</strong> link at the bottom of every page, when analytics are enabled, or by
            clearing your browser&apos;s site data.
          </p>

          <h2>How long we keep details</h2>
          <p>
            We keep enquiry details only for as long as we need them to respond to you and for ordinary business records,
            and then delete them.
          </p>

          <h2>Your rights</h2>
          <p>
            Under India&apos;s Digital Personal Data Protection Act, 2023, you can ask us for a summary of the personal data
            we hold about you, ask us to correct or erase it, withdraw consent, and raise a grievance with us. To do any of
            these, call <a href={telHref}>{business.phone.display}</a> or write to us at the address above. If you are not
            satisfied with our response, you may approach the Data Protection Board of India.
          </p>

          <h2>Children</h2>
          <p>This website is intended for adults making purchase enquiries. Please do not send us a child&apos;s personal details.</p>

          <h2>Changes</h2>
          <p>
            We will update this page if the way we handle personal data changes. The date at the top shows the latest
            revision.
          </p>

          <p>
            <Link href="/contact-us/">Contact us</Link>
          </p>
        </div>
      </section>
    </>
  )
}
