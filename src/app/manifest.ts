import type { MetadataRoute } from 'next'
import { business } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: business.name,
    short_name: 'Europa',
    description: 'Projectors, CCTV, AV receivers, home theatre, screens and acoustic panels in Kukatpally, Hyderabad.',
    start_url: '/',
    display: 'browser',
    background_color: '#f5f3ee',
    theme_color: '#16191d',
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' },
    ],
  }
}
