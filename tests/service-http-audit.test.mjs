import assert from 'node:assert/strict'
import test from 'node:test'
import { auditServiceRouteHtml } from '../scripts/service-route-http-audit.mjs'

const expected = {
  route: '/services/example',
  h1: 'Example Service',
  mediaPath: '/media/fnb/capabilities/example.png',
  ctaHref: '/project-enquiry',
  disclosure: 'Conceptual capability imagery — not project evidence',
}

const validHtml = `<!doctype html><html><head><title>Example Service | FNB Events</title></head><body><main id="main"><h1>Example Service</h1><img src="/media/fnb/capabilities/example.png" alt="Conceptual example"><figcaption>Conceptual capability imagery — not project evidence</figcaption><a href="/project-enquiry">Start a project</a></main></body></html>`

test('built-route HTTP audit accepts the complete controlled contract', () => {
  assert.deepEqual(auditServiceRouteHtml({ status: 200, html: validHtml, expected }), [])
})

test('built-route HTTP audit reports status, landmark, heading, media, disclosure, and CTA failures', () => {
  const failures = auditServiceRouteHtml({ status: 500, html: '<main></main>', expected })
  for (const marker of ['status 200', 'one main', 'one h1', 'expected h1', 'assigned media', 'truth disclosure', 'canonical cta']) {
    assert.ok(failures.some((failure) => failure.toLowerCase().includes(marker)), `missing ${marker} failure`)
  }
})
