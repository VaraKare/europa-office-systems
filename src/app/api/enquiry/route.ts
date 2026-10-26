import { NextResponse, type NextRequest } from 'next/server'
import { randomUUID } from 'node:crypto'
import { cleanAttribution, MIN_FILL_MS, validateEnquiry } from '@/lib/enquiry'
import { deliverEnquiry } from '@/lib/server/deliver'
import { rateLimit } from '@/lib/server/rate-limit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_BODY_BYTES = 10_000

type ErrorCode =
  | 'bad_origin'
  | 'unsupported'
  | 'too_large'
  | 'invalid_json'
  | 'rate_limited'
  | 'spam_check'
  | 'validation'
  | 'not_configured'
  | 'delivery_failed'

function fail(status: number, error: ErrorCode, extra: Record<string, unknown> = {}, headers?: HeadersInit) {
  return NextResponse.json({ ok: false, error, ...extra }, { status, headers })
}

function sameOrigin(req: NextRequest) {
  const origin = req.headers.get('origin')
  if (!origin) return true // Some privacy tools strip Origin; other checks still apply.
  try {
    const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host')
    return new URL(origin).host === host
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return fail(403, 'bad_origin')
  if (!req.headers.get('content-type')?.includes('application/json')) return fail(415, 'unsupported')

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown'
  const rl = rateLimit(`enquiry:${ip}`)
  if (!rl.allowed) return fail(429, 'rate_limited', {}, { 'Retry-After': String(rl.retryAfterSec) })

  const raw = await req.text()
  if (raw.length > MAX_BODY_BYTES) return fail(413, 'too_large')

  let body: Record<string, unknown>
  try {
    body = JSON.parse(raw)
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('not an object')
  } catch {
    return fail(400, 'invalid_json')
  }

  // Spam checks. We fail visibly rather than pretending to succeed, so a real person whose
  // browser tripped a check is told to call or WhatsApp instead of losing the enquiry.
  const honeypot = typeof body.website === 'string' ? body.website.trim() : ''
  const elapsed = Number(body.elapsedMs)
  if (honeypot || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) return fail(400, 'spam_check')

  const { data, errors } = validateEnquiry(body)
  if (!data) return fail(400, 'validation', { fieldErrors: errors })

  const record = {
    ...data,
    id: randomUUID(),
    receivedAt: new Date().toISOString(),
    attribution: cleanAttribution(body.attribution),
  }

  const result = await deliverEnquiry(record)
  if (!result.ok) {
    return fail(result.reason === 'not_configured' ? 503 : 502, result.reason)
  }
  return NextResponse.json({ ok: true, id: record.id }, { status: 200 })
}

export function GET() {
  return NextResponse.json({ ok: false, error: 'method_not_allowed' }, { status: 405, headers: { Allow: 'POST' } })
}
