import type { MetadataRoute } from 'next'
import { CANONICAL_ROUTE_HREFS } from '@/lib/site-registry'
import { buildSitemapEntries, getVerifiedSiteUrl } from '@/lib/task5-seo'

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries(getVerifiedSiteUrl(process.env.NEXT_PUBLIC_SITE_URL), CANONICAL_ROUTE_HREFS)
}
