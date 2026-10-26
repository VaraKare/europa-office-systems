'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import { enquiryCategoryOptions } from '@/lib/services'
import { LIMITS, validateEnquiry, type FieldErrors } from '@/lib/enquiry'
import { readAttribution, track, trackLead } from '@/lib/analytics'
import { business, telHref } from '@/lib/site'
import { whatsappUrl } from '@/lib/whatsapp'

type Status = 'idle' | 'submitting' | 'error'

type Props = {
  defaultCategory?: string
  /** Analytics label for where the form sits, e.g. "contact_page" */
  formType: string
  whatsappMessage: string
}

const fieldOrder = ['name', 'phone', 'category', 'location', 'message', 'consent'] as const

const serverMessages: Record<string, string> = {
  not_configured:
    'Online enquiries are not switched on yet, so your details have not been sent. Please call or WhatsApp us instead. Your details are still in the form.',
  delivery_failed:
    'We could not deliver your enquiry because of a problem on our side. Your details are still in the form. Please try again in a moment, or call or WhatsApp us.',
  rate_limited: 'Too many enquiries have been sent from this connection. Please wait a few minutes, or call or WhatsApp us.',
  spam_check:
    'Your enquiry could not be sent because it was flagged by our spam check. Please wait a few seconds and try again, or call or WhatsApp us.',
  network: 'We could not reach the server. Check your internet connection and try again, or call or WhatsApp us.',
  generic: 'Something went wrong and your enquiry was not sent. Please try again, or call or WhatsApp us.',
}

export function QuoteForm({ defaultCategory = '', formType, whatsappMessage }: Props) {
  const router = useRouter()
  const uid = useId()
  const id = (name: string) => `${uid}-${name}`
  const formRef = useRef<HTMLFormElement>(null)
  const alertRef = useRef<HTMLDivElement>(null)
  const startedAt = useRef<number>(0)
  const started = useRef(false)
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [serverError, setServerError] = useState<string | null>(null)

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  function onFirstInteraction() {
    if (started.current) return
    started.current = true
    track('quote_form_start', { form_type: formType, product_category: defaultCategory || undefined })
  }

  function focusFirstError(errs: FieldErrors) {
    const first = fieldOrder.find((k) => errs[k])
    if (first) document.getElementById(id(first))?.focus()
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'submitting') return
    const form = e.currentTarget
    const fd = new FormData(form)
    const values = Object.fromEntries(fd.entries()) as Record<string, string>
    const payload = { ...values, consent: fd.get('consent') === 'on' }

    const { errors: clientErrors } = validateEnquiry(payload)
    setServerError(null)
    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors)
      focusFirstError(clientErrors)
      return
    }
    setErrors({})
    setStatus('submitting')

    let code = 'generic'
    try {
      const res = await fetch('/api/enquiry/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          elapsedMs: Date.now() - startedAt.current,
          attribution: { ...readAttribution(), pagePath: window.location.pathname },
        }),
      })
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fieldErrors?: FieldErrors }
      if (res.ok && json.ok) {
        // Server confirmed delivery: this is the only place a lead conversion is recorded.
        trackLead({ form_type: formType, product_category: values.category || undefined })
        router.push('/thank-you/')
        return
      }
      if (json.error === 'validation' && json.fieldErrors) {
        setErrors(json.fieldErrors)
        setStatus('idle')
        focusFirstError(json.fieldErrors)
        track('form_submission_error', { form_type: formType, error_type: 'validation' })
        return
      }
      code = json.error && serverMessages[json.error] ? json.error : 'generic'
    } catch {
      code = 'network'
    }
    track('form_submission_error', { form_type: formType, error_type: code })
    setServerError(code)
    setStatus('error')
    requestAnimationFrame(() => alertRef.current?.focus())
  }

  const describedBy = (name: string, hint?: boolean) =>
    [hint ? id(`${name}-hint`) : '', errors[name as keyof FieldErrors] ? id(`${name}-error`) : ''].filter(Boolean).join(' ') || undefined

  const err = (name: keyof FieldErrors) =>
    errors[name] ? (
      <p className="field-error" id={id(`${name}-error`)}>
        <span aria-hidden="true">!</span> {errors[name]}
      </p>
    ) : null

  const errorCount = Object.keys(errors).length
  const submitting = status === 'submitting'

  return (
    <form
      ref={formRef}
      className="form"
      noValidate
      onSubmit={onSubmit}
      onFocus={onFirstInteraction}
      aria-describedby={id('intro')}
    >
      <p id={id('intro')} className="small muted">
        Leave your number and we will call you back. We use these details only to reply to you.
      </p>

      {errorCount > 0 && (
        <div className="alert alert-error" role="alert">
          <h3>Please correct {errorCount === 1 ? '1 field' : `${errorCount} fields`}</h3>
          <ul>
            {fieldOrder
              .filter((k) => errors[k])
              .map((k) => (
                <li key={k}>
                  <a href={`#${id(k)}`}>{errors[k]}</a>
                </li>
              ))}
          </ul>
        </div>
      )}

      {serverError && (
        <div className="alert alert-error" role="alert" tabIndex={-1} ref={alertRef}>
          <h3>Your enquiry has not been sent</h3>
          <p>{serverMessages[serverError]}</p>
          <div className="btn-row">
            <a
              href={whatsappUrl(whatsappMessage)}
              className="btn btn-wa"
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp_click"
              data-track-location="form_error"
            >
              WhatsApp us<span className="visually-hidden"> (opens in a new tab)</span>
            </a>
            <a href={telHref} className="btn btn-outline" data-track="phone_click" data-track-location="form_error">
              Call {business.phone.display}
            </a>
          </div>
        </div>
      )}

      <div className="form-grid">
        <div className="field">
          <label htmlFor={id('name')}>Your name</label>
          <input
            id={id('name')}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={LIMITS.name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy('name')}
          />
          {err('name')}
        </div>

        <div className="field">
          <label htmlFor={id('phone')}>Phone or WhatsApp number</label>
          <p className="hint" id={id('phone-hint')}>
            So we can call or message you back.
          </p>
          <input
            id={id('phone')}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            maxLength={LIMITS.phone}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={describedBy('phone', true)}
          />
          {err('phone')}
        </div>

        <div className="field">
          <label htmlFor={id('category')}>Service needed</label>
          <select
            id={id('category')}
            name="category"
            required
            defaultValue={defaultCategory}
            aria-invalid={errors.category ? true : undefined}
            aria-describedby={describedBy('category')}
          >
            <option value="" disabled>
              Choose a service
            </option>
            {enquiryCategoryOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {err('category')}
        </div>

        <div className="field">
          <label htmlFor={id('location')}>Your area</label>
          <p className="hint" id={id('location-hint')}>
            For example KPHB, Miyapur, Nizampet.
          </p>
          <input
            id={id('location')}
            name="location"
            type="text"
            autoComplete="address-level3"
            required
            maxLength={LIMITS.location}
            aria-invalid={errors.location ? true : undefined}
            aria-describedby={describedBy('location', true)}
          />
          {err('location')}
        </div>

        <div className="field field-full">
          <label htmlFor={id('message')}>Problem or requirement</label>
          <p className="hint" id={id('message-hint')}>
            For example “Epson projector not turning on” or “4 CCTV cameras for my shop”.
          </p>
          <textarea
            id={id('message')}
            name="message"
            required
            rows={5}
            maxLength={LIMITS.message}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy('message', true)}
          />
          {err('message')}
        </div>

        {/* Honeypot: hidden from people and assistive technology; bots tend to fill it. */}
        <div className="hp-field" aria-hidden="true">
          <label htmlFor={id('website')}>Leave this field empty</label>
          <input id={id('website')} name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="field field-full">
          <div className="consent">
            <input
              id={id('consent')}
              name="consent"
              type="checkbox"
              aria-required="true"
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={describedBy('consent')}
            />
            <label htmlFor={id('consent')}>
              I agree that {business.name} may use these details to contact me about this enquiry, as described in the{' '}
              <Link href="/privacy-policy/">privacy policy</Link>.
            </label>
          </div>
          {err('consent')}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-call btn-lg" disabled={submitting} aria-disabled={submitting}>
          {submitting ? 'Sending…' : status === 'error' ? 'Try sending again' : 'Request call back'}
        </button>
        <p className="small muted" aria-live="polite" style={{ margin: 0 }}>
          {submitting ? 'Sending your enquiry…' : ''}
        </p>
      </div>
    </form>
  )
}
