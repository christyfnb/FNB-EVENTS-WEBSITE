import siteRegistryData from '@/data/site-registry.json'
import {
  isNavigationActive as evaluateNavigationActive,
  validateSiteRegistry,
} from '@/lib/site-registry-validation.mjs'

export const CANONICAL_ROUTE_HREFS = [
  '/',
  '/about',
  '/services',
  '/services/exhibition-booth-design-build',
  '/services/event-production',
  '/services/branding-advertising',
  '/services/technical-production',
  '/services/websites-digital-experiences',
  '/services/automation-systems',
  '/services/ai-workflow-solutions',
  '/services/interiors-commercial-spaces',
  '/industries',
  '/process',
  '/team',
  '/contact',
  '/project-enquiry',
  '/portfolio',
  '/insights',
  '/privacy-policy',
  '/terms-and-conditions',
] as const

export type CanonicalHref = (typeof CANONICAL_ROUTE_HREFS)[number]
export type ServiceHref = Extract<CanonicalHref, `/services/${string}`>
export type NavigationHref = CanonicalHref | '/#process'

export type RouteRecord = {
  id: string
  label: string
  href: CanonicalHref
  kind: 'page' | 'service' | 'legal'
  deliveryTask: 2 | 3 | 4 | 5
}

export type NavigationRecord = {
  label: string
  href: NavigationHref
}

export type ServiceRecord = {
  number: `0${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`
  name: string
  href: ServiceHref
  cluster: 'Experiences' | 'Brand & Space' | 'Digital Systems'
  problem: string
  summary: string
  mediaId: string
  mediaTruth: 'conceptual-generated-capability-imagery' | 'conceptual-generated-interface-imagery'
  publicationStatus: 'approved-copy'
}

type SiteRegistry = {
  routes: readonly RouteRecord[]
  primaryNavigation: readonly NavigationRecord[]
  footerNavigation: readonly NavigationRecord[]
  utilityNavigation: readonly NavigationRecord[]
  services: readonly ServiceRecord[]
}

const siteRegistry = validateSiteRegistry(siteRegistryData, CANONICAL_ROUTE_HREFS) as SiteRegistry

export const ROUTE_REGISTRY = siteRegistry.routes
export const PRIMARY_NAVIGATION = siteRegistry.primaryNavigation
export const FOOTER_NAVIGATION = siteRegistry.footerNavigation
export const UTILITY_NAVIGATION = siteRegistry.utilityNavigation
export const SERVICE_REGISTRY = siteRegistry.services

export function getServiceByHref(href: ServiceHref): ServiceRecord {
  const service = SERVICE_REGISTRY.find((entry) => entry.href === href)
  if (!service) throw new Error(`Unknown service route: ${href}`)
  return service
}

export function isNavigationActive(pathname: string, href: NavigationHref): boolean {
  return evaluateNavigationActive(pathname, href)
}
