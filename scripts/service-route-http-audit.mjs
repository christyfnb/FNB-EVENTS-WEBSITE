import { pathToFileURL } from 'node:url'
import { TASK4_SERVICE_ROUTES, getTask4ServiceContent } from '../lib/task4-service-content.ts'

function decodeHtml(value) {
  return value
    .replace(/<[^>]+>/g, '')
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#x27;', "'")
    .replaceAll('&#39;', "'")
    .replaceAll('&nbsp;', ' ')
    .trim()
}

export function auditServiceRouteHtml({ status, html, expected }) {
  const failures = []
  const mainCount = (html.match(/<main\b[^>]*\bid=["']main["'][^>]*>/gi) ?? []).length
  const h1Matches = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)]
  const h1Text = h1Matches[0] ? decodeHtml(h1Matches[0][1]) : ''
  const encodedMediaPath = encodeURIComponent(expected.mediaPath)

  if (status !== 200) failures.push(`${expected.route}: expected status 200, received ${status}`)
  if (mainCount !== 1) failures.push(`${expected.route}: expected one main landmark, found ${mainCount}`)
  if (h1Matches.length !== 1) failures.push(`${expected.route}: expected one h1, found ${h1Matches.length}`)
  if (h1Text !== expected.h1) failures.push(`${expected.route}: expected h1 "${expected.h1}", received "${h1Text}"`)
  if (!html.includes(expected.mediaPath) && !html.includes(encodedMediaPath)) failures.push(`${expected.route}: assigned media is absent`)
  if (!html.includes(expected.disclosure)) failures.push(`${expected.route}: truth disclosure is absent`)
  if (!new RegExp(`href=["']${expected.ctaHref}["']`).test(html)) failures.push(`${expected.route}: canonical CTA is absent`)
  return failures
}

export async function auditTask4ServiceRoutes(baseUrl, fetchImpl = fetch) {
  const results = []
  for (const route of TASK4_SERVICE_ROUTES) {
    const content = getTask4ServiceContent(route)
    const response = await fetchImpl(new URL(route, baseUrl))
    const html = await response.text()
    const expected = { route, h1: content.hero.title, mediaPath: content.media.runtimePath, ctaHref: content.cta.href, disclosure: content.media.disclosure }
    results.push({ route, status: response.status, failures: auditServiceRouteHtml({ status: response.status, html, expected }) })
  }
  return results
}

function parseBaseUrl() {
  const index = process.argv.indexOf('--base-url')
  return index >= 0 ? process.argv[index + 1] : process.env.SERVICE_AUDIT_BASE_URL ?? 'http://127.0.0.1:3114'
}

async function main() {
  const baseUrl = parseBaseUrl()
  const results = await auditTask4ServiceRoutes(baseUrl)
  for (const result of results) {
    const marker = result.failures.length === 0 ? 'PASS' : 'FAIL'
    console.log(`${marker} ${result.status} ${result.route}`)
    for (const failure of result.failures) console.error(`  ${failure}`)
  }
  const failures = results.flatMap((result) => result.failures)
  if (failures.length) process.exitCode = 1
  else console.log(`PASS ${results.length}/${results.length} Task 4 service routes`)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main()
