'use client'

import { usePathname } from 'next/navigation'
import { business, telHref } from '@/lib/site'
import { whatsappUrl } from '@/lib/whatsapp'
import { pageContext } from '@/lib/nav'
import { ChatIcon, MapIcon, PhoneIcon } from './Icons'

/**
 * Persistent contact controls.
 * - Below 900px: a bottom bar (Call / WhatsApp / Directions). The body has matching bottom
 *   padding so it never covers content or form controls.
 * - 900px and up: a floating WhatsApp button.
 * The WhatsApp message matches the service page the visitor is on.
 */
export function ContactDock() {
  const pathname = usePathname() || '/'
  const ctx = pageContext(pathname)
  const wa = whatsappUrl(ctx.whatsappMessage)
  const common = { 'data-track-category': ctx.categoryKey }

  return (
    <>
      <nav className="mobile-bar" aria-label="Quick contact">
        <a href={telHref} className="is-call" data-track="phone_click" data-track-location="mobile_bar" {...common}>
          <PhoneIcon /> Call now
        </a>
        <a href={wa} className="is-wa" target="_blank" rel="noopener noreferrer" data-track="whatsapp_click" data-track-location="mobile_bar" {...common}>
          <ChatIcon /> WhatsApp
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" data-track="directions_click" data-track-location="mobile_bar" {...common}>
          <MapIcon /> Directions
          <span className="visually-hidden"> (opens Google Maps in a new tab)</span>
        </a>
      </nav>
      <a href={wa} className="wa-float" target="_blank" rel="noopener noreferrer" data-track="whatsapp_click" data-track-location="floating_button" {...common}>
        <ChatIcon /> Chat on WhatsApp
        <span className="visually-hidden"> (opens in a new tab)</span>
      </a>
    </>
  )
}
