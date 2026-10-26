/**
 * Server-only enquiry delivery. Never import this from a client component.
 *
 * Channels are enabled by environment variables (see .env.example). The enquiry counts
 * as delivered only if at least one configured channel confirms receipt.
 */
import type { Attribution, EnquiryInput } from '../enquiry'
import { customerTypes } from '../enquiry'
import { enquiryCategoryOptions } from '../services'

export type DeliveryResult =
  | { ok: true; channels: string[] }
  | { ok: false; reason: 'not_configured' | 'delivery_failed' }

export type EnquiryRecord = EnquiryInput & {
  id: string
  receivedAt: string
  attribution: Attribution
}

const TIMEOUT_MS = 8000

type Env = Record<string, string | undefined>

function label<T extends { value: string; label: string }>(list: readonly T[], v: string) {
  return list.find((o) => o.value === v)?.label ?? (v || '-')
}

export function configuredChannels(env: Env = process.env) {
  const channels: string[] = []
  if (env.ENQUIRY_WEBHOOK_URL) channels.push('webhook')
  if (env.RESEND_API_KEY && env.ENQUIRY_TO_EMAIL && env.ENQUIRY_FROM_EMAIL) channels.push('email')
  return channels
}

export function formatText(r: EnquiryRecord) {
  const a = r.attribution
  return [
    `New website enquiry (${r.id})`,
    `Received: ${r.receivedAt}`,
    '',
    `Name: ${r.name}`,
    `Phone: ${r.phone}`,
    `Enquiry about: ${label(enquiryCategoryOptions, r.category)}`,
    `Customer type: ${label(customerTypes, r.customerType)}`,
    `Quantity / requirement: ${r.quantity || '-'}`,
    `Location: ${r.location}`,
    '',
    'Requirement:',
    r.message,
    '',
    '--- Source ---',
    `Submitted from: ${a.pagePath || '-'}`,
    `Landing page: ${a.landingPage || '-'}`,
    `Referrer: ${a.referrer || '-'}`,
    `UTM: ${[a.utm_source, a.utm_medium, a.utm_campaign, a.utm_term, a.utm_content].map((x) => x || '-').join(' / ')}`,
    `Google Ads click (gclid): ${a.gclid ? 'yes' : 'no'}`,
  ].join('\n')
}

async function sendWebhook(r: EnquiryRecord, env: Env) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (env.ENQUIRY_WEBHOOK_SECRET) headers['X-Enquiry-Secret'] = env.ENQUIRY_WEBHOOK_SECRET
  const res = await fetch(env.ENQUIRY_WEBHOOK_URL!, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...r, text: formatText(r) }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`webhook responded ${res.status}`)
}

async function sendEmail(r: EnquiryRecord, env: Env) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.ENQUIRY_FROM_EMAIL,
      to: env.ENQUIRY_TO_EMAIL!.split(',').map((s) => s.trim()),
      subject: `Website enquiry: ${label(enquiryCategoryOptions, r.category)} - ${r.location}`,
      text: formatText(r),
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  })
  if (!res.ok) throw new Error(`email provider responded ${res.status}`)
}

export async function deliverEnquiry(r: EnquiryRecord, env: Env = process.env): Promise<DeliveryResult> {
  const channels = configuredChannels(env)
  if (!channels.length) return { ok: false, reason: 'not_configured' }

  const senders: Record<string, () => Promise<void>> = {
    webhook: () => sendWebhook(r, env),
    email: () => sendEmail(r, env),
  }
  const results = await Promise.allSettled(channels.map((c) => senders[c]()))
  const delivered = channels.filter((_, i) => results[i].status === 'fulfilled')

  results.forEach((res, i) => {
    if (res.status === 'rejected') {
      // Log the failure without personal data.
      console.error(`[enquiry ${r.id}] ${channels[i]} delivery failed:`, (res.reason as Error)?.message)
    }
  })

  return delivered.length ? { ok: true, channels: delivered } : { ok: false, reason: 'delivery_failed' }
}
