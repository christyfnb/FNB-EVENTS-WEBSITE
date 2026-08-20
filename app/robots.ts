import type { MetadataRoute } from 'next'
import { buildRobotsConfig, getVerifiedSiteUrl } from '@/lib/task5-seo'

export default function robots(): MetadataRoute.Robots {
  return buildRobotsConfig(getVerifiedSiteUrl(process.env.NEXT_PUBLIC_SITE_URL))
}
