import type { MetadataRoute } from 'next'
import { publicPages } from '@/lib/pages'
import { photoSrc } from '@/lib/images'
import { absoluteUrl } from '@/lib/site'

// lastmod is deliberately omitted: we only include it when it reflects a genuine content change.
// Image entries help Google Images associate each photo with the page it appears on.
export default function sitemap(): MetadataRoute.Sitemap {
  return publicPages.map((p) => ({
    url: absoluteUrl(p.path),
    ...(p.images?.length ? { images: p.images.map((img) => absoluteUrl(photoSrc(img))) } : {}),
  }))
}
