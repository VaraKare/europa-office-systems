import Link from 'next/link'
import type { Metadata } from 'next'
import { serviceLinks } from '@/lib/nav'
import { business, telHref } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section className="center-page" aria-labelledby="page-title">
      <div className="container prose">
        <p className="eyebrow">Error 404</p>
        <h1 id="page-title">We could not find that page</h1>
        <p className="lede">The link may be out of date, or the address may have a typing error.</p>
        <h2>Try one of these</h2>
        <ul className="inline-list">
          <li>
            <Link href="/">Homepage</Link>
          </li>
          {serviceLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
          <li>
            <Link href="/contact-us/">Contact us</Link>
          </li>
        </ul>
        <p>
          Or call {business.name} on <a href={telHref}>{business.phone.display}</a>.
        </p>
      </div>
    </section>
  )
}
