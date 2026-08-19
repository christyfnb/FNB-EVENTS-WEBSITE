import assert from 'node:assert/strict'
import test from 'node:test'
import { auditServiceRouteHtml } from '../scripts/service-route-http-audit.mjs'

const expected = {
  route: '/services/example',
  h1: 'Example Service',
  mediaPath: '/media/fnb/capabilities/example.png',
  ctaHref: '/project-enquiry',
  disclosure: 'Conceptual capability imagery — not project evidence',
  composition: [
    { block: 'hero', primitive: 'hero' },
    { block: 'intro', primitive: 'editorial' },
    { block: 'visual', primitive: 'media-feature', mediaPosition: 'end', mediaAspect: 'landscape', rhythm: 'early' },
    { block: 'cta', primitive: 'cta' },
  ],
  boundaryMarkers: ['Venue and qualified review remain required.'],
}

const validHtml = `<!doctype html><html><head><title>Example Service | FNB Events</title></head><body><main id="main"><section data-service-block="hero" data-service-kind="hero"><h1>Example Service</h1></section><section data-service-block="intro" data-service-kind="editorial"><p data-truth-boundary="intro:aside">Venue and qualified review remain required.</p></section><section data-service-block="visual" data-service-kind="media-feature" data-media-position="end" data-media-aspect="landscape" data-media-rhythm="early"><img src="/media/fnb/capabilities/example.png" alt="Conceptual example"><figcaption>Conceptual capability imagery — not project evidence</figcaption></section><section data-service-block="cta" data-service-kind="cta"><a href="/project-enquiry">Start a project</a></section></main></body></html>`

test('built-route HTTP audit accepts the complete controlled contract', () => {
  assert.deepEqual(auditServiceRouteHtml({ status: 200, html: validHtml, expected }), [])
})

test('built-route HTTP audit reports status, landmark, heading, media, disclosure, and CTA failures', () => {
  const failures = auditServiceRouteHtml({ status: 500, html: '<main></main>', expected })
  for (const marker of ['status 200', 'one main', 'one h1', 'expected h1', 'assigned media', 'truth disclosure', 'canonical cta', 'rendered block order', 'boundary marker']) {
    assert.ok(failures.some((failure) => failure.toLowerCase().includes(marker)), `missing ${marker} failure`)
  }
})

test('built-route HTTP audit rejects the wrong rendered primitive order', () => {
  const wrongOrder = validHtml
    .replace('data-service-block="intro"', 'data-service-block="temporary"')
    .replace('data-service-block="visual"', 'data-service-block="intro"')
    .replace('data-service-block="temporary"', 'data-service-block="visual"')
  const failures = auditServiceRouteHtml({ status: 200, html: wrongOrder, expected })
  assert.ok(failures.some((failure) => /rendered block order/i.test(failure)))
})

test('built-route HTTP audit rejects a missing approved boundary marker', () => {
  const failures = auditServiceRouteHtml({ status: 200, html: validHtml.replace('Venue and qualified review remain required.', ''), expected })
  assert.ok(failures.some((failure) => /boundary marker/i.test(failure)))
})
