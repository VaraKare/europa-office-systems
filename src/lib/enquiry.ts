/**
 * Enquiry validation shared by the browser (for usability) and the server (authoritative).
 * Keep this free of browser- or Node-only APIs.
 */
import { enquiryCategoryOptions } from './services'

export const customerTypes = [
  { value: 'home', label: 'Home' },
  { value: 'business', label: 'Business / office' },
  { value: 'institution', label: 'School, college or institution' },
  { value: 'other', label: 'Other' },
] as const

export const LIMITS = {
  name: 80,
  phone: 20,
  location: 100,
  quantity: 100,
  message: 1500,
} as const

/** Minimum time (ms) between rendering the form and submitting it; faster is treated as a bot. */
export const MIN_FILL_MS = 2500

export type EnquiryInput = {
  name: string
  phone: string
  category: string
  customerType: string
  quantity: string
  location: string
  message: string
  consent: boolean
}

export type FieldErrors = Partial<Record<keyof EnquiryInput, string>>

const categoryValues = new Set<string>(enquiryCategoryOptions.map((o) => o.value))
const customerValues = new Set<string>(customerTypes.map((o) => o.value))

function str(v: unknown, max: number) {
  if (typeof v !== 'string') return ''
  // Strip control characters (keep newlines/tabs) and trim.
  return v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, max)
}

/**
 * Normalise an Indian phone number. Accepts 10-digit mobiles with optional +91 / 91 / 0
 * prefix, spaces and dashes. Landlines with STD codes (10 digits incl. code) also pass.
 * Returns E.164 (+91XXXXXXXXXX) or null.
 */
export function normaliseIndianPhone(raw: string): string | null {
  const digits = raw.replace(/[\s\-().]/g, '')
  if (!/^\+?\d+$/.test(digits)) return null
  let d = digits.replace(/^\+/, '')
  if (d.length === 12 && d.startsWith('91')) d = d.slice(2)
  else if (d.length === 11 && d.startsWith('0')) d = d.slice(1)
  if (d.length !== 10) return null
  if (/^0/.test(d)) return null
  return `+91${d}`
}

export function validateEnquiry(raw: Record<string, unknown>): { data?: EnquiryInput; errors: FieldErrors } {
  const data: EnquiryInput = {
    name: str(raw.name, LIMITS.name),
    phone: str(raw.phone, LIMITS.phone),
    category: str(raw.category, 40),
    customerType: str(raw.customerType, 40),
    quantity: str(raw.quantity, LIMITS.quantity),
    location: str(raw.location, LIMITS.location),
    message: str(raw.message, LIMITS.message),
    consent: raw.consent === true || raw.consent === 'on' || raw.consent === 'true',
  }
  const errors: FieldErrors = {}

  if (data.name.length < 2) errors.name = 'Enter your name.'
  const phone = normaliseIndianPhone(data.phone)
  if (!data.phone) errors.phone = 'Enter a phone number so we can reply.'
  else if (!phone) errors.phone = 'Enter a 10-digit Indian phone number, for example 98765 43210.'
  else data.phone = phone
  if (!categoryValues.has(data.category)) errors.category = 'Choose what you are enquiring about.'
  if (data.customerType && !customerValues.has(data.customerType)) errors.customerType = 'Choose an option from the list.'
  if (data.location.length < 2) errors.location = 'Enter your area or locality, for example KPHB or Miyapur.'
  if (data.message.length < 5) errors.message = 'Briefly describe what you need.'
  if (!data.consent) errors.consent = 'Please agree so that we can use these details to reply to you.'

  return Object.keys(errors).length ? { errors } : { data, errors }
}

/** Non-personal campaign context attached to the lead record (never sent to analytics with PII). */
export type Attribution = {
  landingPage?: string
  pagePath?: string
  referrer?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  gclid?: string
}

const attributionKeys: (keyof Attribution)[] = [
  'landingPage',
  'pagePath',
  'referrer',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
]

export function cleanAttribution(raw: unknown): Attribution {
  const out: Attribution = {}
  if (!raw || typeof raw !== 'object') return out
  for (const k of attributionKeys) {
    const v = str((raw as Record<string, unknown>)[k], 300)
    if (v) out[k] = v
  }
  return out
}
