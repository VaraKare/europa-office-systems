import type { Metadata } from 'next'
import { absoluteUrl, business, SITE_URL } from './site'
import { photoSrc, type Photo } from './images'

type PageMeta = {
  title: string
  description: string
  path: string
  noindex?: boolean
  /** Use the title as-is instead of appending the brand */
  absoluteTitle?: boolean
  /** Page photo used for social sharing (falls back to the generic card) */
  image?: Photo
}

export const OG_IMAGE = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: 'Europa Office Systems, Kukatpally, Hyderabad: projectors, CCTV, AV receivers and home theatre',
}

export function pageMetadata({ title, description, path, noindex, absoluteTitle, image }: PageMeta): Metadata {
  const url = absoluteUrl(path)
  const og = image ? { url: photoSrc(image), width: 1280, height: 853, alt: image.alt } : OG_IMAGE
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      siteName: business.name,
      url,
      title: absoluteTitle ? title : `${title} | ${business.name}`,
      description,
      images: [og],
    },
    twitter: {
      card: 'summary_large_image',
      title: absoluteTitle ? title : `${title} | ${business.name}`,
      description,
      images: [og.url],
    },
  }
}

export const ORG_ID = `${SITE_URL}/#business`
export const WEBSITE_ID = `${SITE_URL}/#website`

/**
 * The single primary business entity. Uses the generic LocalBusiness type because a
 * public showroom / store has not been confirmed (ElectronicsStore would imply one).
 * Only verified properties are included; null facts are omitted.
 */
export function businessJsonLd() {
  const a = business.address
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': ORG_ID,
    name: business.name,
    url: `${SITE_URL}/`,
    telephone: business.phone.e164,
    foundingDate: String(business.foundingYear),
    image: absoluteUrl(OG_IMAGE.url),
    logo: absoluteUrl('/icon.svg'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: `${a.locality}, ${a.city}`,
      addressRegion: a.region,
      addressCountry: a.country,
      ...(a.postalCode ? { postalCode: a.postalCode } : {}),
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: business.phone.e164,
      contactType: 'sales',
      availableLanguage: ['en'],
    },
  }
  if (business.email) data.email = business.email
  if (business.sameAs.length) data.sameAs = business.sameAs
  return data
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: business.name,
    url: `${SITE_URL}/`,
    inLanguage: 'en-IN',
    publisher: { '@id': ORG_ID },
  }
}

export type Crumb = { name: string; path: string }

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  }
}

/** Serialise JSON-LD safely for inline <script> (prevents </script> breakout). */
export function jsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
