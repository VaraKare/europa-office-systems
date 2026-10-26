/* eslint-disable @next/next/no-img-element -- Plain <img> keeps clean, descriptive image URLs
   (e.g. /images/projector-repair-service-hyderabad-1280.webp) for Google Images, instead of
   /_next/image?url=… . Variants are pre-generated WebP with explicit dimensions. */
import { photoSrc, type Photo as PhotoT } from '@/lib/images'

type Props = {
  photo: PhotoT
  /** CSS sizes attribute describing the rendered width */
  sizes?: string
  /** Above-the-fold hero image: load eagerly with high priority */
  priority?: boolean
  className?: string
}

export function Photo({ photo, sizes = '(min-width: 56.25rem) 50vw, 100vw', priority, className }: Props) {
  return (
    <img
      src={photoSrc(photo, 1280)}
      srcSet={`${photoSrc(photo, 640)} 640w, ${photoSrc(photo, 1280)} 1280w`}
      sizes={sizes}
      width={1280}
      height={853}
      alt={photo.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      className={className}
    />
  )
}
