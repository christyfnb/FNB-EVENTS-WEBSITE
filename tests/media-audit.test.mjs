import assert from 'node:assert/strict'
import test from 'node:test'
import { auditMedia } from '../scripts/media-audit.mjs'

test('approved runtime media satisfies inventory, denylist, deduplication, and team-source policy', () => {
  const result = auditMedia()
  assert.deepEqual(result.errors, [])
  assert.equal(result.counts.sourceInventory, 76)
  assert.equal(result.counts.prohibitedHashes, 26)
  assert.equal(result.counts.portraits, 23)
  assert.equal(result.counts.runtimeEntries, result.counts.runtimeFiles)
})
