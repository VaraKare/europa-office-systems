import { defaultWhatsappMessage, services } from './services'

export const serviceLinks = services.map((s) => ({ href: s.path, label: s.navLabel }))

export const companyLinks = [
  { href: '/brands/', label: 'Brands' },
  { href: '/about-us/', label: 'About' },
  { href: '/contact-us/', label: 'Contact' },
]

export const legalLinks = [{ href: '/privacy-policy/', label: 'Privacy policy' }]

/** Context for the persistent contact controls, derived from the current path. */
export function pageContext(pathname: string) {
  const svc = services.find((s) => pathname.startsWith(s.path))
  return {
    categoryKey: svc?.key ?? 'general',
    whatsappMessage: svc?.whatsappMessage ?? defaultWhatsappMessage,
  }
}
