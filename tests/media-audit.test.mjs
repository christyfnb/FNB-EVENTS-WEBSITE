import assert from 'node:assert/strict'
import test from 'node:test'
import { auditMedia, auditMediaRecords } from '../scripts/media-audit.mjs'

const HASH_A = 'a'.repeat(64)
const HASH_B = 'b'.repeat(64)

function sourceRecord(overrides = {}) {
  return {
    sourcePath: '01-FINAL-WEBSITE-ASSETS/01-Home/example.png',
    width: 1536,
    height: 1024,
    bytes: 2048,
    sha256: HASH_A,
    sourceEligibility: 'source-eligible',
    ...overrides,
  }
}

function runtimeRecord(overrides = {}) {
  return {
    id: 'home-example',
    sourcePath: '01-FINAL-WEBSITE-ASSETS/01-Home/example.png',
    runtimePath: '/media/fnb/home/example.png',
    width: 1536,
    height: 1024,
    bytes: 2048,
    sha256: HASH_A,
    publicationStatus: 'approved-for-runtime',
    truthClassification: 'conceptual-generated-capability-imagery',
    brandApprovalStatus: 'owner-categorized-source',
    ...overrides,
  }
}

test('approved runtime media satisfies inventory, denylist, deduplication, and team-source policy', () => {
  const result = auditMedia()
  assert.deepEqual(result.errors, [])
  assert.equal(result.counts.sourceInventory, 76)
  assert.equal(result.counts.prohibitedHashes, 26)
  assert.equal(result.counts.portraits, 23)
  assert.equal(result.counts.runtimeEntries, 35)
  assert.equal(result.counts.runtimeEntries, result.counts.runtimeFiles)
})

test('rejects a runtime SHA-256 that does not match its declared source inventory record', () => {
  const result = auditMediaRecords({
    inventory: [sourceRecord()],
    denylist: [],
    runtime: [runtimeRecord({ sha256: HASH_B })],
  })

  assert.ok(result.errors.includes('Runtime SHA-256 does not match declared source: home-example'))
})

test('rejects a 36th runtime manifest entry', () => {
  const inventory = Array.from({ length: 36 }, (_, index) =>
    sourceRecord({
      sourcePath: `01-FINAL-WEBSITE-ASSETS/01-Home/example-${index}.png`,
      sha256: index.toString(16).padStart(64, '0'),
    }),
  )
  const runtime = inventory.map((source, index) =>
    runtimeRecord({
      id: `runtime-${index}`,
      sourcePath: source.sourcePath,
      runtimePath: `/media/fnb/home/example-${index}.png`,
      sha256: source.sha256,
    }),
  )
  const result = auditMediaRecords({ inventory, denylist: [], runtime })

  assert.ok(result.errors.includes('Expected exactly 35 runtime manifest entries; found 36'))
})

test('rejects blocked source eligibility and unsupported truth classification', () => {
  const result = auditMediaRecords({
    inventory: [sourceRecord({ sourceEligibility: 'blocked-team-master' })],
    denylist: [],
    runtime: [runtimeRecord({ truthClassification: 'fabricated-proof' })],
  })

  assert.ok(result.errors.includes('Runtime source is not eligible: home-example (blocked-team-master)'))
  assert.ok(result.errors.includes('Unsupported truth classification: home-example (fabricated-proof)'))
})
