type SitemapEntry = { url: string; changeFrequency: 'monthly' | 'yearly'; priority: number }
type RobotsConfig = { rules: { userAgent: '*'; allow: '/' }; sitemap?: string }

const forbiddenHosts = new Set(['localhost', '127.0.0.1', '0.0.0.0', 'example.com', 'www.example.com'])

export function getVerifiedSiteUrl(value: string | undefined): string | undefined {
  if (!value) return undefined
  try {
    const url = new URL(value)
    const hostname = url.hostname.toLowerCase()
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return undefined
    if (forbiddenHosts.has(hostname) || hostname.endsWith('.localhost') || hostname.endsWith('.invalid') || hostname.endsWith('.test')) return undefined
    if (url.pathname !== '/' || url.search || url.hash) return undefined
    return url.origin
  } catch {
    return undefined
  }
}

export function buildSitemapEntries(siteUrl: string | undefined, hrefs: readonly string[]): SitemapEntry[] {
  if (!siteUrl) return []
  return hrefs.map((href) => ({
    url: new URL(href, `${siteUrl}/`).href,
    changeFrequency: href === '/' ? 'monthly' : 'yearly',
    priority: href === '/' ? 1 : 0.7,
  }))
}

export function buildRobotsConfig(siteUrl: string | undefined): RobotsConfig {
  return { rules: { userAgent: '*', allow: '/' }, ...(siteUrl ? { sitemap: `${siteUrl}/sitemap.xml` } : {}) }
}
