import { ServicePage } from '@/components/ServicePage'
import { getService } from '@/lib/services'
import { pageMetadata } from '@/lib/seo'

const service = getService('projector-repair')

export const metadata = pageMetadata({ title: service.title, description: service.description, path: service.path, image: service.heroImage })

export default function Page() {
  return <ServicePage service={service} />
}
