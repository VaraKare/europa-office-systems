import Link from 'next/link'
import { addressOneLine, business, telHref } from '@/lib/site'
import { whatsappUrl } from '@/lib/whatsapp'
import { defaultWhatsappMessage } from '@/lib/services'
import { companyLinks, legalLinks, serviceLinks } from '@/lib/nav'
import { BlixerCredit } from './BlixerCredit'
import { CookieSettingsButton } from './Analytics'
import { CopyrightYear } from './CopyrightYear'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <p className="footer-name">{business.name}</p>
            <p>Projector repair and installation, CCTV installation and service, home theatre setup and acoustic panels. Based in Kukatpally since {business.foundingYear}.</p>
            <address style={{ fontStyle: 'normal' }}>
              {addressOneLine}, {business.address.countryName}
            </address>
          </div>
          <div>
            <h2 className="footer-title">Services</h2>
            <ul className="footer-list">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="footer-title">Company</h2>
            <ul className="footer-list">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="footer-title">Contact</h2>
            <ul className="footer-list">
              <li>
                <a href={telHref} data-track="phone_click" data-track-location="footer">
                  {business.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl(defaultWhatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="whatsapp_click"
                  data-track-location="footer"
                >
                  WhatsApp<span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="directions_click"
                  data-track-location="footer"
                >
                  Directions<span className="visually-hidden"> (opens Google Maps in a new tab)</span>
                </a>
              </li>
              <li>
                <Link href="/contact-us/#callback">Request a call back</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © <CopyrightYear /> {business.name}. Brand names are trademarks of their owners. Photos are illustrative stock images (Unsplash).
          </p>
          <CookieSettingsButton />
          <BlixerCredit />
        </div>
      </div>
    </footer>
  )
}
