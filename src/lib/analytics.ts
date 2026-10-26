/**
 * Client-side measurement layer.
 *
 * - Google tags load only after the visitor accepts analytics/advertising cookies.
 * - If no IDs are configured, everything here is a no-op and no banner is shown.
 * - NEVER pass names, phone numbers, free text or other personal data in event params.
 */
import type { Attribution } from './enquiry'
import { business } from './site'

export const analyticsConfig = {
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID || '',
  adsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || '',
  adsLeadLabel: process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_LABEL || '',
  adsCallLabel: process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION_LABEL || '',
}

export const analyticsEnabled = Boolean(analyticsConfig.ga4Id || analyticsConfig.adsId)

export type EventName =
  | 'whatsapp_click'
  | 'phone_click'
  | 'quote_form_start'
  | 'generate_lead'
  | 'form_submission_error'
  | 'catalogue_download'
  | 'directions_click'

export type EventParams = {
  page_path?: string
  product_category?: string
  cta_location?: string
  form_type?: string
  error_type?: string
  campaign_source?: string
}

type Gtag = (...args: unknown[]) => void
declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
  }
}

const CONSENT_KEY = 'eos-consent-v1'
const ATTR_KEY = 'eos-attribution-v1'

export type ConsentChoice = 'granted' | 'denied'

export function readConsent(): ConsentChoice | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}

export function storeConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(CONSENT_KEY, choice)
  } catch {
    /* storage unavailable: choice applies to this page view only */
  }
}

let loaded = false

export function loadGoogleTags() {
  if (loaded || !analyticsEnabled || typeof window === 'undefined') return
  loaded = true
  const primaryId = analyticsConfig.ga4Id || analyticsConfig.adsId
  window.dataLayer = window.dataLayer || []
  // gtag must push the `arguments` object, not an array.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  window.gtag('consent', 'default', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'denied',
    analytics_storage: 'granted',
  })
  window.gtag('js', new Date())
  if (analyticsConfig.ga4Id) window.gtag('config', analyticsConfig.ga4Id)
  if (analyticsConfig.adsId) {
    window.gtag('config', analyticsConfig.adsId)
    if (analyticsConfig.adsCallLabel) {
      // Google Ads "calls from website" (forwarding numbers swap the displayed number where supported).
      window.gtag('config', `${analyticsConfig.adsId}/${analyticsConfig.adsCallLabel}`, {
        phone_conversion_number: business.phone.display,
      })
    }
  }
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(primaryId)}`
  document.head.appendChild(s)
}

export function track(name: EventName, params: EventParams = {}) {
  if (typeof window === 'undefined' || !window.gtag) return
  const attr = readAttribution()
  window.gtag('event', name, {
    page_path: window.location.pathname,
    campaign_source: attr.utm_source,
    ...params,
  })
}

/** Call ONLY after the server has confirmed the enquiry was delivered. */
export function trackLead(params: EventParams) {
  track('generate_lead', params)
  if (typeof window !== 'undefined' && window.gtag && analyticsConfig.adsId && analyticsConfig.adsLeadLabel) {
    window.gtag('event', 'conversion', { send_to: `${analyticsConfig.adsId}/${analyticsConfig.adsLeadLabel}` })
  }
}

/** Store first-touch campaign context for this browser session (not personal data). */
export function captureAttribution() {
  try {
    if (window.sessionStorage.getItem(ATTR_KEY)) return
    const q = new URLSearchParams(window.location.search)
    const a: Attribution = { landingPage: window.location.pathname }
    if (document.referrer && !document.referrer.startsWith(window.location.origin)) {
      a.referrer = new URL(document.referrer).hostname
    }
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'] as const) {
      const v = q.get(k)
      if (v) a[k] = v.slice(0, 200)
    }
    window.sessionStorage.setItem(ATTR_KEY, JSON.stringify(a))
  } catch {
    /* ignore */
  }
}

export function readAttribution(): Attribution {
  try {
    return JSON.parse(window.sessionStorage.getItem(ATTR_KEY) || '{}')
  } catch {
    return {}
  }
}
