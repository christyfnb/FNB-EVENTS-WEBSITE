import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import test from 'node:test'
import { auditMedia, auditMediaRecords, auditPublicMedia } from '../scripts/media-audit.mjs'

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
    sourceSha256: HASH_A,
    publicationStatus: 'approved-for-runtime',
    truthClassification: 'conceptual-generated-capability-imagery',
    brandApprovalStatus: 'owner-categorized-source',
    ...overrides,
  }
}

function withPublicFixture(files, run) {
  const fixtureRoot = mkdtempSync(join(tmpdir(), 'fnb-public-media-audit-'))
  const publicRoot = join(fixtureRoot, 'public')
  try {
    for (const [path, bytes] of Object.entries(files)) {
      const absolutePath = join(publicRoot, path)
      mkdirSync(dirname(absolutePath), { recursive: true })
      writeFileSync(absolutePath, bytes)
    }
    return run(publicRoot)
  } finally {
    rmSync(fixtureRoot, { recursive: true, force: true })
  }
}

function hash(bytes) {
  return createHash('sha256').update(bytes).digest('hex')
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

test('rejects a declared sourceSha256 that does not match original source inventory record', () => {
  const result = auditMediaRecords({
    inventory: [sourceRecord({ sha256: HASH_A })],
    denylist: [],
    runtime: [runtimeRecord({ sourceSha256: HASH_B })],
  })

  assert.ok(result.errors.includes('Runtime sourceSha256 does not match approved source inventory record: home-example'))
})

test('rejects copying an optimized runtime hash into the source hash field when bytes differ', () => {
  const result = auditMediaRecords({
    inventory: [sourceRecord({ sha256: HASH_A, bytes: 4096 })],
    denylist: [],
    runtime: [runtimeRecord({ sha256: HASH_B, sourceSha256: HASH_B, bytes: 2048 })],
  })

  assert.ok(result.errors.includes('Runtime sourceSha256 does not match approved source inventory record: home-example'))
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

test('rejects unregistered deployable media outside the canonical media directory', () => {
  const registeredBytes = Buffer.from('registered-image')
  const result = withPublicFixture(
    {
      'media/fnb/home/example.png': registeredBytes,
      'images/stray.png': Buffer.from('unregistered-image'),
    },
    (publicRoot) =>
      auditPublicMedia({
        publicRoot,
        runtime: [runtimeRecord({ runtimePath: '/media/fnb/home/example.png', bytes: registeredBytes.length, sha256: hash(registeredBytes) })],
        prohibitedHashes: new Set(),
      }),
  )

  assert.ok(result.errors.includes('Unregistered public media: /images/stray.png'))
})

test('rejects any stray public MP4', () => {
  const result = withPublicFixture({ 'legacy/promo.mp4': Buffer.from('video-bytes') }, (publicRoot) =>
    auditPublicMedia({ publicRoot, runtime: [], prohibitedHashes: new Set() }),
  )

  assert.ok(result.errors.includes('Unapproved public video: /legacy/promo.mp4'))
  assert.ok(result.errors.includes('Unregistered public media: /legacy/promo.mp4'))
})

test('rejects duplicate media bytes anywhere under public', () => {
  const bytes = Buffer.from('duplicate-image')
  const result = withPublicFixture(
    {
      'media/fnb/home/example.png': bytes,
      'images/duplicate.png': bytes,
    },
    (publicRoot) =>
      auditPublicMedia({
        publicRoot,
        runtime: [runtimeRecord({ runtimePath: '/media/fnb/home/example.png', bytes: bytes.length, sha256: hash(bytes) })],
        prohibitedHashes: new Set(),
      }),
  )

  assert.ok(
    result.errors.includes('Duplicate public media bytes: /images/duplicate.png, /media/fnb/home/example.png'),
  )
})
