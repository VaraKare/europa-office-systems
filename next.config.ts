import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

// Origins needed only when GA4 / Google Ads are configured and the visitor has consented.
const google = {
  script: 'https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net',
  connect:
    'https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.g.doubleclick.net https://www.google.com https://www.google.co.in https://www.googleadservices.com https://pagead2.googlesyndication.com',
  img: 'https://*.google-analytics.com https://*.googletagmanager.com https://*.g.doubleclick.net https://www.google.com https://www.google.co.in https://googleads.g.doubleclick.net',
  frame: 'https://td.doubleclick.net https://www.googletagmanager.com',
}

// 'unsafe-inline' is required for Next.js inline bootstrap scripts and JSON-LD on statically
// generated pages (nonces would force every page to render dynamically). The policy still
// restricts which external origins can run scripts or receive data.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProd ? '' : " 'unsafe-eval'"} ${google.script}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${google.img}`,
  "font-src 'self'",
  `connect-src 'self' ${google.connect}`,
  `frame-src ${google.frame}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  isProd ? 'upgrade-insecure-requests' : '',
]
  .filter(Boolean)
  .join('; ')

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
        ],
      },
      {
        source: '/api/:path*',
        headers: [{ key: 'Cache-Control', value: 'no-store' }],
      },
    ]
  },
}

export default nextConfig
