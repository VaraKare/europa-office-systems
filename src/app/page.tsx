import Link from 'next/link'
import { CheckIcon } from '@/components/Icons'
import { Photo } from '@/components/Photo'
import { QuoteSection } from '@/components/QuoteSection'
import { ContactButtons, CtaBand, Faq, HowItWorks, NeedChips } from '@/components/ui'
import { brandGroups, defaultWhatsappMessage, getService, services } from '@/lib/services'
import { photos } from '@/lib/images'
import { pageMetadata } from '@/lib/seo'
import { business } from '@/lib/site'
import { whatsappUrl } from '@/lib/whatsapp'

export const metadata = pageMetadata({
  title: 'Projector, CCTV & Home Theatre Services, Kukatpally | Europa Office Systems',
  absoluteTitle: true,
  description:
    'Projector repair and installation, CCTV camera installation and service, and home theatre setup in Kukatpally, Hyderabad. Call or WhatsApp Europa Office Systems: +91 74162 61929.',
  path: '/',
  image: photos.projectorLens,
})

const tiles = [
  { svc: getService('projector-repair'), photo: photos.projectorLens },
  { svc: getService('cctv-installation'), photo: photos.cctvTechnician },
  { svc: getService('projector-installation'), photo: photos.ceilingProjector },
  { svc: getService('home-theatre-installation'), photo: photos.theatreRoom },
]

const problemGroups = [
  { svc: getService('projector-repair'), heading: 'Projector problems', needs: getService('projector-repair').needs.slice(0, 6) },
  { svc: getService('cctv-installation'), heading: 'CCTV', needs: getService('cctv-installation').needs.slice(0, 6) },
  { svc: getService('home-theatre-installation'), heading: 'Home theatre and sound', needs: getService('home-theatre-installation').needs.slice(0, 6) },
]

const faqs = [
  {
    q: 'What services does Europa Office Systems provide?',
    a: 'Projector repair and service, projector and screen installation, CCTV camera installation and service, home theatre setup with AV receivers and speakers, and acoustic panels. We also supply the equipment.',
  },
  {
    q: 'My projector is not working. What should I do?',
    a: 'Call or WhatsApp us with the projector brand and model and what it is doing (not turning on, dim picture, no signal and so on). A photo or short video helps.',
  },
  {
    q: 'Where are you located?',
    a: `${business.address.street}, Kukatpally, Hyderabad. We have been here since ${business.foundingYear}.`,
  },
  {
    q: 'Do you cover all of Hyderabad?',
    a: 'No. We work in a limited area around Kukatpally. Tell us your locality and we will confirm.',
  },
]

export default function HomePage() {
  return (
    <>
      <section className="hero" aria-labelledby="page-title">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Kukatpally, Hyderabad · Since {business.foundingYear}</p>
            <h1 id="page-title">Projector, CCTV and home theatre services in Kukatpally</h1>
            <p className="lede">
              Projector repair, projector and screen installation, CCTV installation and home theatre setup. Call or WhatsApp
              us, tell us the problem and your area.
            </p>
            <ContactButtons whatsappMessage={defaultWhatsappMessage} location="hero" large />
            <ul className="trust-list">
              <li>
                <CheckIcon /> Since {business.foundingYear}
              </li>
              <li>
                <CheckIcon /> New Balaji Nagar, Kukatpally
              </li>
              <li>
                <CheckIcon /> Epson, BenQ, CP Plus, Hikvision and more
              </li>
            </ul>
          </div>
          <div className="hero-tiles">
            {tiles.map((t, i) => (
              <Link key={t.svc.slug} href={t.svc.path} className="hero-tile">
                <Photo photo={t.photo} sizes="(min-width: 56.25rem) 25vw, 50vw" priority={i < 2} />
                <span>{t.svc.navLabel}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="problems-title">
        <div className="container">
          <div className="section-head">
            <h2 id="problems-title">What do you need help with?</h2>
            <p className="muted">Tap your problem to send it to us on WhatsApp.</p>
          </div>
          <div className="problem-groups">
            {problemGroups.map((g) => (
              <div key={g.heading}>
                <h3>
                  <Link href={g.svc.path}>{g.heading}</Link>
                </h3>
                <NeedChips needs={g.needs} category={g.svc.key} location="home_need_chip" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft" aria-labelledby="services-title">
        <div className="container">
          <div className="section-head">
            <h2 id="services-title">Our services</h2>
          </div>
          <div className="card-grid cols-3">
            {services.map((s) => (
              <article className="card" key={s.slug}>
                <div className="card-photo">
                  <Photo photo={s.heroImage} sizes="(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw" />
                </div>
                <div className="card-body">
                  <h3>
                    <Link href={s.path}>{s.navLabel}</Link>
                  </h3>
                  <ul>
                    {s.needs.slice(0, 3).map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                  <div className="card-actions">
                    <Link href={s.path} className="btn btn-outline">
                      Details<span className="visually-hidden"> about {s.navLabel}</span>
                    </Link>
                    <a
                      href={whatsappUrl(s.whatsappMessage)}
                      className="btn btn-wa"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-track="whatsapp_click"
                      data-track-location="service_card"
                      data-track-category={s.key}
                    >
                      WhatsApp<span className="visually-hidden"> about {s.navLabel} (opens in a new tab)</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="brands-title">
        <div className="container">
          <div className="section-head">
            <h2 id="brands-title">Brands we handle</h2>
          </div>
          <div className="brand-groups">
            {brandGroups.map((g) => (
              <div key={g.label}>
                <h3>
                  <Link href={g.path}>{g.label}</Link>
                </h3>
                <ul className="brand-list">
                  {g.list.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="note" style={{ marginTop: '1rem' }}>
            Brand names belong to their owners. We are not claiming to be an authorised dealer or service centre for any brand.
          </p>
        </div>
      </section>

      <HowItWorks />

      <CtaBand
        heading="Projector or CCTV not working?"
        text="Call or WhatsApp us now with the problem and your area."
        whatsappMessage={defaultWhatsappMessage}
        location="home_cta_band"
      />

      <QuoteSection formType="homepage" whatsappMessage={defaultWhatsappMessage} />

      <Faq items={faqs} />
    </>
  )
}
