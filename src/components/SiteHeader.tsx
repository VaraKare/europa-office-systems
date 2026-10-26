'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import { business, telHref } from '@/lib/site'
import { whatsappUrl } from '@/lib/whatsapp'
import { companyLinks, pageContext, serviceLinks } from '@/lib/nav'
import { ChatIcon, ChevronIcon, CloseIcon, MenuIcon, PhoneIcon } from './Icons'

export function SiteHeader() {
  const pathname = usePathname() || '/'
  const ctx = pageContext(pathname)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const menuId = useId()
  const servicesId = useId()
  const menuButton = useRef<HTMLButtonElement>(null)
  const servicesItem = useRef<HTMLLIElement>(null)
  const servicesButton = useRef<HTMLButtonElement>(null)

  // Close menus on navigation (React's "adjust state on prop change" pattern).
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setMenuOpen(false)
    setServicesOpen(false)
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== 'Escape') return
      if (menuOpen) {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
      if (servicesOpen) {
        setServicesOpen(false)
        servicesButton.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen, servicesOpen])

  useEffect(() => {
    if (!servicesOpen) return
    function onPointer(e: PointerEvent) {
      if (!servicesItem.current?.contains(e.target as Node)) setServicesOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    return () => document.removeEventListener('pointerdown', onPointer)
  }, [servicesOpen])

  const isCurrent = (href: string) => (pathname === href ? 'page' : undefined)
  const serviceActive = serviceLinks.some((l) => pathname.startsWith(l.href))
  const wa = whatsappUrl(ctx.whatsappMessage)

  return (
    <>
      <div className="top-strip">
        <div className="container">
          <span>
            Projector · CCTV · Home theatre service<span className="hide-sm"> in Kukatpally, Hyderabad</span>
          </span>
          <span>
            Call / WhatsApp{' '}
            <a href={telHref} data-track="phone_click" data-track-location="top_strip" data-track-category={ctx.categoryKey}>
              {business.phone.display}
            </a>
          </span>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="brand">
            <span className="brand-name">{business.name}</span>
            <span className="brand-tag">Projector, CCTV &amp; AV services · Kukatpally</span>
          </Link>

          <nav className="primary-nav" aria-label="Main">
            <ul className="nav-list">
              <li
                className="nav-item"
                ref={servicesItem}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) setServicesOpen(false)
                }}
              >
                <button
                  ref={servicesButton}
                  type="button"
                  className={serviceActive ? 'nav-disclosure is-active' : 'nav-disclosure'}
                  aria-expanded={servicesOpen}
                  aria-controls={servicesId}
                  onClick={() => setServicesOpen((v) => !v)}
                >
                  Services <ChevronIcon />
                </button>
                <ul id={servicesId} className="nav-list nav-dropdown" hidden={!servicesOpen}>
                  {serviceLinks.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} aria-current={isCurrent(l.href)}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="nav-link" aria-current={isCurrent(l.href)}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <a href={telHref} className="btn btn-call" data-track="phone_click" data-track-location="header" data-track-category={ctx.categoryKey}>
              <PhoneIcon /> Call
            </a>
            <a
              href={wa}
              className="btn btn-wa"
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp_click"
              data-track-location="header"
              data-track-category={ctx.categoryKey}
            >
              <ChatIcon /> WhatsApp<span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </div>

          <button
            ref={menuButton}
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>

        <div id={menuId} className="mobile-menu" hidden={!menuOpen}>
          <nav aria-label="Mobile">
            <p className="group-title">Services</p>
            <ul className="nav-list">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} aria-current={isCurrent(l.href)} onClick={() => setMenuOpen(false)}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="group-title">Company</p>
            <ul className="nav-list">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} aria-current={isCurrent(l.href)} onClick={() => setMenuOpen(false)}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="btn-row">
              <a href={telHref} className="btn btn-call btn-lg" data-track="phone_click" data-track-location="mobile_menu" data-track-category={ctx.categoryKey}>
                <PhoneIcon /> Call {business.phone.display}
              </a>
              <a
                href={wa}
                className="btn btn-wa btn-lg"
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_click"
                data-track-location="mobile_menu"
                data-track-category={ctx.categoryKey}
              >
                <ChatIcon /> WhatsApp us<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}
