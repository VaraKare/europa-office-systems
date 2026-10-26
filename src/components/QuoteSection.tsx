import { addressOneLine, business, telHref } from '@/lib/site'
import { whatsappUrl } from '@/lib/whatsapp'
import { QuoteForm } from './QuoteForm'

type Props = {
  heading?: string
  intro?: string
  defaultCategory?: string
  formType: string
  whatsappMessage: string
  categoryKey?: string
  headingLevel?: 'h1' | 'h2'
}

/** Call-back form with the faster options (call, WhatsApp) beside it. Anchor target: #callback */
export function QuoteSection({
  heading = 'Request a call back',
  intro = 'Leave your number and the problem. We will call you back.',
  defaultCategory,
  formType,
  whatsappMessage,
  categoryKey = 'general',
  headingLevel = 'h2',
}: Props) {
  const H = headingLevel
  return (
    <section id="callback" className="section section-soft" aria-labelledby="callback-title">
      <div className="container">
        <div className="section-head">
          <H id="callback-title">{heading}</H>
          <p className="lede">{intro}</p>
        </div>
        <div className="quote-grid">
          <QuoteForm defaultCategory={defaultCategory} formType={formType} whatsappMessage={whatsappMessage} />
          <aside className="contact-list" aria-label="Faster ways to reach us">
            <div className="contact-card">
              <p className="label">Call now</p>
              <p>
                <a className="contact-big" href={telHref} data-track="phone_click" data-track-location="callback_aside" data-track-category={categoryKey}>
                  {business.phone.display}
                </a>
              </p>
            </div>
            <div className="contact-card">
              <p className="label">WhatsApp</p>
              <p>
                <a
                  className="contact-big is-wa"
                  href={whatsappUrl(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="whatsapp_click"
                  data-track-location="callback_aside"
                  data-track-category={categoryKey}
                >
                  Chat on WhatsApp<span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </p>
              <p className="small muted">Send a photo or video of the problem. It helps us understand it quickly.</p>
            </div>
            <div className="contact-card">
              <p className="label">Address</p>
              <address style={{ fontStyle: 'normal' }}>{addressOneLine}</address>
              <p className="small muted">We work in a limited area around Kukatpally. Tell us your locality and we will confirm.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
