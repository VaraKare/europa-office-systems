import { describe, expect, it, vi, afterEach } from 'vitest'
import { cleanAttribution, normaliseIndianPhone, validateEnquiry } from '@/lib/enquiry'
import { whatsappUrl } from '@/lib/whatsapp'
import { configuredChannels, deliverEnquiry, formatText, type EnquiryRecord } from '@/lib/server/deliver'
import { rateLimit } from '@/lib/server/rate-limit'
import { services } from '@/lib/services'

const valid = {
  name: 'Test Person',
  phone: '98765 43210',
  category: 'projector-repair',
  customerType: 'business',
  quantity: '2',
  location: 'KPHB',
  message: 'Need a projector for a meeting room',
  consent: true,
}

describe('normaliseIndianPhone', () => {
  it.each([
    ['9876543210', '+919876543210'],
    ['98765 43210', '+919876543210'],
    ['+91 98765-43210', '+919876543210'],
    ['919876543210', '+919876543210'],
    ['09876543210', '+919876543210'],
    ['040 2345 6789', '+914023456789'],
  ])('accepts %s', (input, out) => expect(normaliseIndianPhone(input)).toBe(out))

  it.each(['12345', 'abcdefghij', '+1 415 555 0100 22', '0000000000', ''])('rejects %s', (input) =>
    expect(normaliseIndianPhone(input)).toBeNull(),
  )
})

describe('validateEnquiry', () => {
  it('accepts a complete enquiry and normalises the phone', () => {
    const { data, errors } = validateEnquiry(valid)
    expect(errors).toEqual({})
    expect(data?.phone).toBe('+919876543210')
  })

  it('reports every missing required field', () => {
    const { data, errors } = validateEnquiry({})
    expect(data).toBeUndefined()
    expect(Object.keys(errors).sort()).toEqual(['category', 'consent', 'location', 'message', 'name', 'phone'])
  })

  it('rejects unknown categories and customer types', () => {
    const { errors } = validateEnquiry({ ...valid, category: 'printers', customerType: 'alien' })
    expect(errors.category).toBeTruthy()
    expect(errors.customerType).toBeTruthy()
  })

  it('requires explicit consent', () => {
    expect(validateEnquiry({ ...valid, consent: false }).errors.consent).toBeTruthy()
    expect(validateEnquiry({ ...valid, consent: 'yes' }).errors.consent).toBeTruthy()
  })

  it('strips control characters and enforces length limits', () => {
    const { data } = validateEnquiry({ ...valid, name: 'A\u0000B\u0007C', message: 'x'.repeat(5000) })
    expect(data?.name).toBe('ABC')
    expect(data?.message.length).toBe(1500)
  })

  it('ignores non-string values safely', () => {
    const { errors } = validateEnquiry({ ...valid, name: { $gt: '' } as unknown as string })
    expect(errors.name).toBeTruthy()
  })
})

describe('cleanAttribution', () => {
  it('keeps only known keys', () => {
    expect(cleanAttribution({ utm_source: 'google', gclid: 'abc', evil: 'x', phone: '999' })).toEqual({
      utm_source: 'google',
      gclid: 'abc',
    })
    expect(cleanAttribution(null)).toEqual({})
  })
})

describe('whatsappUrl', () => {
  it('uses wa.me with digits only and an encoded message', () => {
    expect(whatsappUrl('Hello & welcome?', '+91 74162-61929')).toBe('https://wa.me/917416261929?text=Hello%20%26%20welcome%3F')
  })
  it('defaults to the business number', () => {
    expect(whatsappUrl('Hi')).toMatch(/^https:\/\/wa\.me\/917416261929\?text=Hi$/)
  })
  it('every service has its own prefilled message', () => {
    const msgs = services.map((c) => c.whatsappMessage)
    expect(new Set(msgs).size).toBe(msgs.length)
  })
})

describe('deliverEnquiry', () => {
  const record: EnquiryRecord = {
    ...(validateEnquiry(valid).data as NonNullable<ReturnType<typeof validateEnquiry>['data']>),
    id: 'test-id',
    receivedAt: '2026-10-20T00:00:00.000Z',
    attribution: { utm_source: 'google', gclid: 'x' },
  }
  afterEach(() => vi.restoreAllMocks())

  it('reports not_configured when no channel is set', async () => {
    expect(configuredChannels({})).toEqual([])
    expect(await deliverEnquiry(record, {})).toEqual({ ok: false, reason: 'not_configured' })
  })

  it('requires all three email variables', () => {
    expect(configuredChannels({ RESEND_API_KEY: 'k', ENQUIRY_TO_EMAIL: 'a@b.c' })).toEqual([])
  })

  it('succeeds when the webhook accepts, and sends the secret header', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('ok', { status: 200 }))
    const res = await deliverEnquiry(record, { ENQUIRY_WEBHOOK_URL: 'https://hook.test/x', ENQUIRY_WEBHOOK_SECRET: 's3' })
    expect(res).toEqual({ ok: true, channels: ['webhook'] })
    const init = fetchMock.mock.calls[0][1] as RequestInit
    expect((init.headers as Record<string, string>)['X-Enquiry-Secret']).toBe('s3')
  })

  it('fails honestly when every channel fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('no', { status: 500 }))
    expect(await deliverEnquiry(record, { ENQUIRY_WEBHOOK_URL: 'https://hook.test/x' })).toEqual({
      ok: false,
      reason: 'delivery_failed',
    })
  })

  it('succeeds if at least one channel delivers', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (url) =>
      String(url).includes('resend') ? new Response('{}', { status: 200 }) : new Response('no', { status: 500 }),
    )
    const res = await deliverEnquiry(record, {
      ENQUIRY_WEBHOOK_URL: 'https://hook.test/x',
      RESEND_API_KEY: 'k',
      ENQUIRY_TO_EMAIL: 'to@example.com',
      ENQUIRY_FROM_EMAIL: 'from@example.com',
    })
    expect(res).toEqual({ ok: true, channels: ['email'] })
  })

  it('formats a readable lead summary without the raw gclid', () => {
    const text = formatText(record)
    expect(text).toContain('Phone: +919876543210')
    expect(text).toContain('Enquiry about: Projector Repair')
    expect(text).toContain('Google Ads click (gclid): yes')
  })
})

describe('rateLimit', () => {
  it('allows 5 requests per window then blocks', () => {
    const now = 1_000_000
    for (let i = 0; i < 5; i++) expect(rateLimit('ip-a', 5, 60_000, now + i).allowed).toBe(true)
    const blocked = rateLimit('ip-a', 5, 60_000, now + 10)
    expect(blocked.allowed).toBe(false)
    expect(blocked.retryAfterSec).toBeGreaterThan(0)
    expect(rateLimit('ip-a', 5, 60_000, now + 61_000).allowed).toBe(true)
    expect(rateLimit('ip-b', 5, 60_000, now).allowed).toBe(true)
  })
})
