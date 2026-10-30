'use client'

import { usePathname } from 'next/navigation'
import { absoluteUrl } from '@/lib/site'

export function BlixerCredit() {
  const pathname = usePathname() || '/'
  const message = `Hi BlixerStudio! 👋 I came from this website page: ${absoluteUrl(pathname)} and I loved the design. Can we catch up about a website for my business?`

  return (
    <p>
      Designed by{' '}
      <a href={`https://wa.me/916302092709?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener">
        BlixerStudio<span className="visually-hidden"> (opens WhatsApp in a new tab)</span>
      </a>
    </p>
  )
}
