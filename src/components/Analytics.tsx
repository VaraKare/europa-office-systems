'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  analyticsEnabled,
  captureAttribution,
  loadGoogleTags,
  readConsent,
  storeConsent,
  track,
  type EventName,
} from '@/lib/analytics'

export const OPEN_CONSENT_EVENT = 'eos:open-consent'

const trackable = new Set<EventName>(['whatsapp_click', 'phone_click', 'directions_click', 'catalogue_download'])

/**
 * - Captures campaign attribution (UTM / gclid) for the enquiry record.
 * - Shows the consent banner only when analytics IDs are configured.
 * - Loads Google tags only after consent.
 * - Sends click events for elements marked with data-track="<event>" via one delegated
 *   listener, so links can stay server-rendered.
 */
export function Analytics() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    captureAttribution()
    if (!analyticsEnabled) return
    const choice = readConsent()
    if (choice === 'granted') loadGoogleTags()
    // Reading localStorage is only possible after mount, so the banner state is set here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    else if (choice === null) setShowBanner(true)

    const reopen = () => setShowBanner(true)
    window.addEventListener(OPEN_CONSENT_EVENT, reopen)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen)
  }, [])

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as Element | null)?.closest?.('[data-track]') as HTMLElement | null
      if (!el) return
      const name = el.dataset.track as EventName
      if (!trackable.has(name)) return
      track(name, {
        cta_location: el.dataset.trackLocation,
        product_category: el.dataset.trackCategory,
      })
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  if (!analyticsEnabled || !showBanner) return null

  function choose(choice: 'granted' | 'denied') {
    storeConsent(choice)
    setShowBanner(false)
    if (choice === 'granted') loadGoogleTags()
    else if (window.gtag) {
      // Withdrawn after previously granting: stop further storage; reload clears loaded tags.
      window.gtag('consent', 'update', { ad_storage: 'denied', ad_user_data: 'denied', analytics_storage: 'denied' })
    }
  }

  return (
    <section className="consent-banner" aria-labelledby="consent-title" role="region">
      <h2 id="consent-title">Analytics cookies</h2>
      <p>
        With your permission we use Google Analytics and Google Ads cookies to understand which pages and adverts
        bring enquiries. We do not send your name, number or messages to Google.{' '}
        <Link href="/privacy-policy/#cookies">Read more</Link>
      </p>
      <div className="btn-row">
        <button type="button" className="btn btn-call" onClick={() => choose('granted')}>
          Accept analytics
        </button>
        <button type="button" className="btn btn-outline" onClick={() => choose('denied')}>
          Reject
        </button>
      </div>
    </section>
  )
}

export function CookieSettingsButton() {
  if (!analyticsEnabled) return null
  return (
    <button type="button" className="link-button" onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}>
      Cookie settings
    </button>
  )
}
