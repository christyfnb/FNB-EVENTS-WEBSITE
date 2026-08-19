const routeKinds = new Set(['page', 'service', 'legal'])
const deliveryTasks = new Set([2, 3, 4, 5])
const serviceClusters = new Set(['Experiences', 'Brand & Space', 'Digital Systems'])
const mediaTruthValues = new Set([
  'conceptual-generated-capability-imagery',
  'conceptual-generated-interface-imagery',
])

function requireArray(value, name) {
  if (!Array.isArray(value)) throw new TypeError(`Site registry ${name} must be an array`)
  return value
}

function requireRecord(value, name) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new TypeError(`Site registry ${name} must be an object`)
  }
  return value
}

function requireText(value, name) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new TypeError(`Site registry ${name} must be a non-empty string`)
  }
  return value
}

function assertUnique(values, name) {
  if (new Set(values).size !== values.length) throw new TypeError(`Site registry ${name} values must be unique`)
}

export function validateSiteRegistry(input, canonicalHrefs) {
  const registry = requireRecord(input, 'root')
  const canonical = [...requireArray(canonicalHrefs, 'canonical hrefs')]
  assertUnique(canonical, 'canonical href')

  const routes = requireArray(registry.routes, 'routes')
  const routeIds = []
  const routeHrefs = []
  for (const [index, entry] of routes.entries()) {
    const route = requireRecord(entry, `routes[${index}]`)
    routeIds.push(requireText(route.id, `routes[${index}].id`))
    routeHrefs.push(requireText(route.href, `routes[${index}].href`))
    requireText(route.label, `routes[${index}].label`)
    if (!routeKinds.has(route.kind)) throw new TypeError(`Site registry route kind is invalid at index ${index}`)
    if (!deliveryTasks.has(route.deliveryTask)) throw new TypeError(`Site registry delivery task is invalid at index ${index}`)
  }
  assertUnique(routeIds, 'route id')
  assertUnique(routeHrefs, 'route href')
  if (routeHrefs.length !== canonical.length || routeHrefs.some((href, index) => href !== canonical[index])) {
    throw new TypeError('Site registry route hrefs must exactly match canonical hrefs')
  }

  const allowedNavigationHrefs = new Set([...canonical, '/#process'])
  for (const group of ['primaryNavigation', 'footerNavigation', 'utilityNavigation']) {
    const navigation = requireArray(registry[group], group)
    for (const [index, entry] of navigation.entries()) {
      const item = requireRecord(entry, `${group}[${index}]`)
      requireText(item.label, `${group}[${index}].label`)
      const href = requireText(item.href, `${group}[${index}].href`)
      if (!allowedNavigationHrefs.has(href)) {
        throw new TypeError(`Site registry navigation href is not canonical: ${href}`)
      }
    }
  }

  const services = requireArray(registry.services, 'services')
  const serviceHrefs = []
  const serviceNumbers = []
  for (const [index, entry] of services.entries()) {
    const service = requireRecord(entry, `services[${index}]`)
    serviceNumbers.push(requireText(service.number, `services[${index}].number`))
    const href = requireText(service.href, `services[${index}].href`)
    serviceHrefs.push(href)
    if (!canonical.includes(href) || !href.startsWith('/services/')) {
      throw new TypeError(`Site registry service href is not canonical: ${href}`)
    }
    requireText(service.name, `services[${index}].name`)
    requireText(service.problem, `services[${index}].problem`)
    requireText(service.summary, `services[${index}].summary`)
    requireText(service.mediaId, `services[${index}].mediaId`)
    if (!serviceClusters.has(service.cluster)) throw new TypeError(`Site registry service cluster is invalid at index ${index}`)
    if (!mediaTruthValues.has(service.mediaTruth)) throw new TypeError(`Site registry media truth is invalid at index ${index}`)
    if (service.publicationStatus !== 'approved-copy') throw new TypeError(`Site registry publication status is invalid at index ${index}`)
  }
  assertUnique(serviceHrefs, 'service href')
  assertUnique(serviceNumbers, 'service number')
  if (services.length !== 8 || serviceNumbers.some((number, index) => number !== `0${index + 1}`)) {
    throw new TypeError('Site registry services must contain canonical numbers 01 through 08')
  }

  return registry
}

export function isNavigationActive(pathname, href) {
  const route = href === '/#process' ? '/' : href
  if (route === '/') return pathname === '/'
  if (route === '/services') return pathname === route || pathname.startsWith('/services/')
  return pathname === route
}
