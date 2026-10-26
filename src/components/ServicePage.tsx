import Link from 'next/link'
import { services, type Service } from '@/lib/services'
import { business } from '@/lib/site'
import { CheckIcon } from './Icons'
import { Photo } from './Photo'
import { QuoteSection } from './QuoteSection'
import { Breadcrumbs, ContactButtons, CtaBand, Faq, HowItWorks, NeedChips } from './ui'

export function ServicePage({ service: s }: { service: Service }) {
  const related = s.related.map((slug) => services.find((x) => x.slug === slug)!).filter(Boolean)

  return (
    <>
      <section className="hero" aria-labelledby="page-title">
        <Breadcrumbs items={[{ name: s.navLabel, path: s.path }]} />
        <div className="container hero-grid" style={{ marginTop: '1rem' }}>
          <div>
            <h1 id="page-title">{s.h1}</h1>
            <p className="lede">{s.lede}</p>
            <ContactButtons whatsappMessage={s.whatsappMessage} location="hero" category={s.key} large />
            <ul className="trust-list">
              <li>
                <CheckIcon /> Since {business.foundingYear}
              </li>
              <li>
                <CheckIcon /> Based in Kukatpally
              </li>
              {s.brands && (
                <li>
                  <CheckIcon /> {s.brands[0].list.slice(0, 3).join(', ')} and more
                </li>
              )}
            </ul>
          </div>
          <div className="hero-photo">
            <Photo photo={s.heroImage} priority />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="needs-title">
        <div className="container">
          <div className="section-head">
            <h2 id="needs-title">{s.needsHeading}</h2>
            <p className="muted">Tap your problem to send us a WhatsApp message straight away.</p>
          </div>
          <NeedChips needs={s.needs} category={s.key} location="need_chip" />
        </div>
      </section>

      <section className="section section-soft" aria-labelledby="offer-title">
        <div className="container">
          <div className="section-head">
            <h2 id="offer-title">{s.offerHeading}</h2>
          </div>
          <div className="card-grid">
            {s.offer.map((o) => (
              <article className="card" key={o.title}>
                {o.image && (
                  <div className="card-photo">
                    <Photo photo={o.image} sizes="(min-width: 40rem) 50vw, 100vw" />
                  </div>
                )}
                <div className="card-body">
                  <h3>{o.title}</h3>
                  <p>{o.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {s.brands && (
        <section className="section" aria-labelledby="brands-title">
          <div className="container">
            <div className="section-head">
              <h2 id="brands-title">Brands</h2>
            </div>
            <div className="brand-groups">
              {s.brands.map((b) => (
                <div key={b.label}>
                  <h3>{b.label}</h3>
                  <ul className="brand-list">
                    {b.list.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="note" style={{ marginTop: '1rem' }}>
              Brand names belong to their owners. We are not claiming to be an authorised service centre for any brand.
            </p>
          </div>
        </section>
      )}

      <HowItWorks />

      <CtaBand
        heading={s.ctaLabel}
        text={`Call or WhatsApp ${business.name} now.`}
        whatsappMessage={s.whatsappMessage}
        location="cta_band"
        category={s.key}
      />

      <QuoteSection defaultCategory={s.key} formType="service_page" whatsappMessage={s.whatsappMessage} categoryKey={s.key} />

      <Faq items={s.faqs} />

      <section className="section" aria-labelledby="other-title" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <h2 id="other-title">Other services</h2>
          </div>
          <div className="card-grid">
            {related.map((r) => (
              <article className="card" key={r.slug}>
                <div className="card-photo">
                  <Photo photo={r.heroImage} sizes="(min-width: 40rem) 50vw, 100vw" />
                </div>
                <div className="card-body">
                  <h3>
                    <Link href={r.path}>{r.navLabel}</Link>
                  </h3>
                  <p>{r.lede}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
