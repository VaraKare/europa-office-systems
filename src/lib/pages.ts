import { services } from './services'
import { photos, type Photo } from './images'

/**
 * Inventory of public, indexable pages. Drives sitemap.xml (including image entries) and llms.txt.
 * Add a page here when (and only when) it is live, canonical and indexable.
 */
export type PublicPage = {
  path: string
  name: string
  summary: string
  group: 'main' | 'services' | 'company' | 'legal'
  images?: Photo[]
}

export const homeImages = [photos.projectorLens, photos.cctvTechnician, photos.theatreRoom, photos.ceilingProjector, photos.acousticPanels]

export const publicPages: PublicPage[] = [
  { path: '/', name: 'Home', summary: 'Projector, CCTV and home theatre services in Kukatpally, Hyderabad. Call or WhatsApp.', group: 'main', images: homeImages },
  ...services.map((s) => ({
    path: s.path,
    name: s.navLabel,
    summary: s.description,
    group: 'services' as const,
    images: Array.from(new Set([s.heroImage, ...s.offer.flatMap((o) => (o.image ? [o.image] : []))])),
  })),
  { path: '/brands/', name: 'Brands', summary: 'Projector, CCTV and AV receiver brands handled.', group: 'company' },
  { path: '/about-us/', name: 'About us', summary: 'Based in New Balaji Nagar, Kukatpally since 2013.', group: 'company' },
  { path: '/contact-us/', name: 'Contact us', summary: 'Phone, WhatsApp, address, directions and call-back form.', group: 'company' },
  { path: '/privacy-policy/', name: 'Privacy policy', summary: 'How enquiry data and analytics cookies are handled.', group: 'legal' },
]
