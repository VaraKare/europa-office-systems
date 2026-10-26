import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@/components/Analytics'
import { ContactDock } from '@/components/ContactDock'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { JsonLd } from '@/components/ui'
import { businessJsonLd, websiteJsonLd } from '@/lib/seo'
import { business, SITE_URL } from '@/lib/site'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: business.name, template: `%s | ${business.name}` },
  applicationName: business.name,
  authors: [{ name: business.name }],
  formatDetection: { telephone: false, email: false, address: false },
  icons: { apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }] },
}

export const viewport: Viewport = {
  themeColor: '#0f1e33',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={inter.variable}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <ContactDock />
        <Analytics />
        <JsonLd data={[businessJsonLd(), websiteJsonLd()]} />
      </body>
    </html>
  )
}
