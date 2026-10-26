import Link from 'next/link'
import { business, telHref } from '@/lib/site'
import { whatsappUrl } from '@/lib/whatsapp'
import { needMessage } from '@/lib/services'
import { breadcrumbJsonLd, jsonLdString, type Crumb } from '@/lib/seo'
import { ChatIcon, PhoneIcon } from './Icons'

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(data) }} />
}

/** Visible breadcrumbs plus matching BreadcrumbList JSON-LD. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: 'Home', path: '/' }, ...items]
  return (
    <>
      <nav aria-label="Breadcrumb" className="breadcrumbs container">
        <ol>
          {all.map((c, i) => (
            <li key={c.path}>
              {i < all.length - 1 ? <Link href={c.path}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </>
  )
}

type ContactButtonsProps = {
  whatsappMessage: string
  location: string
  category?: string
  large?: boolean
  callLabel?: string
}

/** The two primary actions: call and WhatsApp. */
export function ContactButtons({ whatsappMessage, location, category = 'general', large, callLabel }: ContactButtonsProps) {
  const size = large ? ' btn-lg' : ''
  return (
    <div className="btn-row">
      <a href={telHref} className={`btn btn-call${size}`} data-track="phone_click" data-track-location={location} data-track-category={category}>
        <PhoneIcon /> {callLabel ?? `Call ${business.phone.display}`}
      </a>
      <a
        href={whatsappUrl(whatsappMessage)}
        className={`btn btn-wa${size}`}
        target="_blank"
        rel="noopener noreferrer"
        data-track="whatsapp_click"
        data-track-location={location}
        data-track-category={category}
      >
        <ChatIcon /> WhatsApp us<span className="visually-hidden"> (opens WhatsApp in a new tab)</span>
      </a>
    </div>
  )
}

/** Each customer problem is a one-tap WhatsApp message. */
export function NeedChips({ needs, category, location }: { needs: string[]; category: string; location: string }) {
  return (
    <ul className="chip-grid">
      {needs.map((n) => (
        <li key={n}>
          <a
            className="chip"
            href={whatsappUrl(needMessage(n))}
            target="_blank"
            rel="noopener noreferrer"
            data-track="whatsapp_click"
            data-track-location={location}
            data-track-category={category}
          >
            {n}
            <span className="chip-cta">
              <ChatIcon /> Ask<span className="visually-hidden"> on WhatsApp (opens in a new tab)</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export function Faq({ items, heading = 'Questions people ask', id = 'faq' }: { items: { q: string; a: string }[]; heading?: string; id?: string }) {
  return (
    <section className="section" aria-labelledby={`${id}-title`}>
      <div className="container">
        <div className="section-head">
          <h2 id={`${id}-title`}>{heading}</h2>
        </div>
        <div className="faq">
          {items.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Blue call-to-action band used near the bottom of pages. */
export function CtaBand({ heading, text, whatsappMessage, location, category }: { heading: string; text: string; whatsappMessage: string; location: string; category?: string }) {
  return (
    <section className="section" aria-labelledby={`${location}-cta`}>
      <div className="container">
        <div className="cta-band">
          <div>
            <h2 id={`${location}-cta`}>{heading}</h2>
            <p>{text}</p>
          </div>
          <ContactButtons whatsappMessage={whatsappMessage} location={location} category={category} large />
        </div>
      </div>
    </section>
  )
}

/** How a job starts. Deliberately generic: no response-time or pricing promises. */
export function HowItWorks() {
  return (
    <section className="section section-soft" aria-labelledby="how-title">
      <div className="container">
        <div className="section-head">
          <h2 id="how-title">How it works</h2>
        </div>
        <ol className="steps">
          <li>
            <h3>Call or WhatsApp</h3>
            <p>Tell us the problem or what you need, the brand and model if you know it, and your area. Photos help.</p>
          </li>
          <li>
            <h3>We advise you</h3>
            <p>We explain what is needed and what it will cost before any work goes ahead.</p>
          </li>
          <li>
            <h3>Job done</h3>
            <p>Repair, installation or setup, then we check that everything works with you.</p>
          </li>
        </ol>
      </div>
    </section>
  )
}
