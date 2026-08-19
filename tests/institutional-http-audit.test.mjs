import assert from 'node:assert/strict'
import test from 'node:test'
import { auditInstitutionalRouteHtml, auditSeoText } from '../scripts/institutional-route-http-audit.mjs'

const expected = {
  route: '/portfolio',
  h1: 'Selected work is being prepared for publication.',
  publicationStatus: 'publication-pending',
}

const validHtml = '<!doctype html><html><body><main id="main" data-institutional-route="/portfolio" data-publication-status="publication-pending"><h1>Selected work is being prepared for publication.</h1><a href="/project-enquiry">Project enquiry</a></main></body></html>'

test('institutional HTTP audit accepts the complete controlled document contract', () => {
  assert.deepEqual(auditInstitutionalRouteHtml({ status: 200, html: validHtml, expected }), [])
})

test('institutional HTTP audit rejects status, landmark, heading, route, and publication-state failures', () => {
  const failures = auditInstitutionalRouteHtml({ status: 500, html: '<main></main>', expected })
  for (const marker of ['status 200', 'one main', 'one h1', 'expected h1', 'route marker', 'publication status']) {
    assert.ok(failures.some((failure) => failure.toLowerCase().includes(marker)), `missing ${marker}`)
  }
})

test('SEO audit forbids fabricated or local absolute domains', () => {
  assert.deepEqual(auditSeoText({ robots: 'User-Agent: *\nAllow: /', sitemap: '<urlset></urlset>', verifiedSiteUrl: undefined }), [])
  const failures = auditSeoText({ robots: 'Sitemap: http://localhost:3000/sitemap.xml', sitemap: '<loc>https://example.com/about</loc>', verifiedSiteUrl: undefined })
  assert.ok(failures.some((failure) => /localhost/i.test(failure)))
  assert.ok(failures.some((failure) => /unverified absolute url/i.test(failure)))
})
