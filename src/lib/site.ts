/**
 * Single source of truth for business facts.
 *
 * RULE: only client-verified information belongs here. Anything unconfirmed is `null`
 * and is simply not rendered (see docs/client-content-needed.md). Do not fill these
 * in with guesses: they feed visible copy, JSON-LD and llms.txt.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://europaofficesystems.com').replace(/\/+$/, '')

export const business = {
  name: 'Europa Office Systems',
  foundingYear: 2013,
  phone: {
    /** E.164 for tel: links and schema */
    e164: '+917416261929',
    /** Human-readable display format */
    display: '+91 74162 61929',
    /** Digits only, as required by wa.me */
    whatsappDigits: '917416261929',
  },
  address: {
    street: '15-21-150/7, New Balaji Nagar',
    locality: 'Kukatpally',
    city: 'Hyderabad',
    region: 'Telangana',
    regionCode: 'TG',
    country: 'IN',
    countryName: 'India',
    /** Not supplied by the client. Do not guess. */
    postalCode: null as string | null,
  },
  /** Not supplied by the client. Do not invent. */
  email: null as string | null,
  openingHours: null as string | null,
  /** Google Business Profile / social URLs - add only real, client-confirmed profiles. */
  sameAs: [] as string[],
  /** Replace with the Google Business Profile share link once confirmed. */
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Europa Office Systems, 15-21-150/7, New Balaji Nagar, Kukatpally, Hyderabad, Telangana'),
} as const

export const addressOneLine = `${business.address.street}, ${business.address.locality}, ${business.address.city}, ${business.address.region}`

export function absoluteUrl(path = '/') {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export const telHref = `tel:${business.phone.e164}`
