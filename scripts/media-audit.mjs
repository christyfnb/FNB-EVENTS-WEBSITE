import { createHash } from 'node:crypto'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { extname, join, relative, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const DEFAULT_ROOT = resolve(import.meta.dirname, '..')
const INVENTORY_PATH = 'data/media/source-inventory.json'
const DENYLIST_PATH = 'data/media/prohibited-sha256.json'
const RUNTIME_PATH = 'data/media/runtime-media.json'
const EXPECTED_RUNTIME_ENTRIES = 35
const PUBLIC_MEDIA_EXTENSIONS = new Set([
  '.avif',
  '.bmp',
  '.gif',
  '.heic',
  '.heif',
  '.ico',
  '.jpeg',
  '.jpg',
  '.jxl',
  '.m4v',
  '.mov',
  '.mp4',
  '.mpeg',
  '.mpg',
  '.ogv',
  '.png',
  '.svg',
  '.tif',
  '.tiff',
  '.webm',
  '.webp',
])
const PUBLIC_VIDEO_EXTENSIONS = new Set(['.m4v', '.mov', '.mp4', '.mpeg', '.mpg', '.ogv', '.webm'])
const ELIGIBLE_SOURCE_STATUSES = new Set(['source-eligible', 'source-eligible-portrait'])
const TRUTH_CLASSIFICATIONS = new Set([
  'official-brand-asset',
  'conceptual-generated-capability-imagery',
  'conceptual-generated-interface-imagery',
  'approved-portrait-media-metadata-gated',
])

function readJson(root, path, errors) {
  const absolutePath = join(root, path)
  if (!existsSync(absolutePath)) {
    errors.push(`Missing required media manifest: ${path}`)
    return []
  }

  try {
    const value = JSON.parse(readFileSync(absolutePath, 'utf8'))
    if (!Array.isArray(value)) {
      errors.push(`Expected a JSON array in ${path}`)
      return []
    }
    return value
  } catch (error) {
    errors.push(`Invalid JSON in ${path}: ${error.message}`)
    return []
  }
}

function walkFiles(root) {
  if (!existsSync(root)) return []
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = join(root, entry.name)
    return entry.isDirectory() ? walkFiles(absolutePath) : [absolutePath]
  })
}

function sha256(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex')
}

export function auditMediaRecords({ inventory, denylist, runtime }) {
  const errors = []
  const inventoryByPath = new Map()
  const inventoryHashes = new Set()

  if (runtime.length !== EXPECTED_RUNTIME_ENTRIES) {
    errors.push(`Expected exactly ${EXPECTED_RUNTIME_ENTRIES} runtime manifest entries; found ${runtime.length}`)
  }

  for (const item of inventory) {
    if (!item.sourcePath || inventoryByPath.has(item.sourcePath)) {
      errors.push(`Duplicate or missing sourcePath: ${item.sourcePath ?? '<missing>'}`)
    } else {
      inventoryByPath.set(item.sourcePath, item)
    }
    if (!Number.isInteger(item.width) || item.width <= 0 || !Number.isInteger(item.height) || item.height <= 0) {
      errors.push(`Invalid decoded dimensions for ${item.sourcePath ?? '<missing>'}`)
    }
    if (!Number.isInteger(item.bytes) || item.bytes <= 0) errors.push(`Invalid source byte size for ${item.sourcePath ?? '<missing>'}`)
    if (!/^[a-f0-9]{64}$/.test(item.sha256 ?? '')) errors.push(`Invalid source SHA-256 for ${item.sourcePath ?? '<missing>'}`)
    inventoryHashes.add(item.sha256)
  }

  const prohibitedHashes = new Set()
  for (const item of denylist) {
    if (!/^[a-f0-9]{64}$/.test(item.sha256 ?? '')) errors.push(`Invalid prohibited SHA-256 for ${item.sourcePath ?? '<missing>'}`)
    if (prohibitedHashes.has(item.sha256)) errors.push(`Duplicate prohibited hash: ${item.sha256}`)
    prohibitedHashes.add(item.sha256)
  }
  for (const hash of inventoryHashes) {
    if (prohibitedHashes.has(hash)) errors.push(`Source inventory contains prohibited hash: ${hash}`)
  }

  const runtimePaths = new Set()
  const runtimeHashes = new Set()
  let portraitCount = 0
  for (const item of runtime) {
    if (!item.id || !item.sourcePath || !item.runtimePath) {
      errors.push(`Runtime registry entry is missing required identity fields: ${JSON.stringify(item)}`)
    }
    if (!item.runtimePath?.startsWith('/media/fnb/')) errors.push(`Runtime path is outside canonical media root: ${item.runtimePath}`)
    const source = inventoryByPath.get(item.sourcePath)
    if (!source) {
      errors.push(`Runtime source is absent from inventory: ${item.sourcePath}`)
    } else {
      if (source.sourceEligibility && !ELIGIBLE_SOURCE_STATUSES.has(source.sourceEligibility)) {
        errors.push(`Runtime source is not eligible: ${item.id} (${source.sourceEligibility})`)
      }
      if (item.sourceSha256 !== source.sha256) {
        errors.push(`Runtime sourceSha256 does not match approved source inventory record: ${item.id}`)
      }
      if (item.sha256 === source.sha256 && item.bytes !== source.bytes) {
        errors.push(`Runtime hash equals original source hash but bytes differ: ${item.id}`)
      }
      if (item.width !== source.width || item.height !== source.height) {
        errors.push(`Runtime dimensions do not match declared source: ${item.id}`)
      }
      if (item.aspectRatio !== undefined && source.aspectRatio !== undefined && item.aspectRatio !== source.aspectRatio) {
        errors.push(`Runtime aspect ratio does not match declared source: ${item.id}`)
      }
    }

    if (runtimePaths.has(item.runtimePath)) errors.push(`Duplicate runtime path in registry: ${item.runtimePath}`)
    runtimePaths.add(item.runtimePath)
    if (runtimeHashes.has(item.sha256)) errors.push(`Byte-identical runtime registry entry: ${item.sha256}`)
    runtimeHashes.add(item.sha256)
    if (prohibitedHashes.has(item.sha256)) errors.push(`Runtime registry contains prohibited hash: ${item.sha256}`)
    if (item.sourcePath?.includes('/14-Team/02-Master/')) errors.push(`Team master registered for runtime: ${item.sourcePath}`)
    if (item.sourcePath?.includes('/14-Team/01-Web-Optimized/')) portraitCount += 1
    if (item.publicationStatus !== 'approved-for-runtime') errors.push(`Unapproved runtime entry: ${item.id}`)
    if (!TRUTH_CLASSIFICATIONS.has(item.truthClassification)) {
      errors.push(`Unsupported truth classification: ${item.id} (${item.truthClassification ?? '<missing>'})`)
    }
    if (!item.brandApprovalStatus) errors.push(`Missing brand approval status: ${item.id}`)
  }

  return {
    errors,
    inventoryByPath,
    prohibitedHashes,
    runtimePaths,
    counts: {
      sourceInventory: inventory.length,
      prohibitedHashes: denylist.length,
      runtimeEntries: runtime.length,
      portraits: portraitCount,
    },
  }
}

export function auditPublicMedia({ publicRoot, runtime, prohibitedHashes }) {
  const errors = []
  const runtimeByPath = new Map(runtime.map((item) => [item.runtimePath, item]))
  const publicFiles = walkFiles(publicRoot).filter((path) => PUBLIC_MEDIA_EXTENSIONS.has(extname(path).toLowerCase()))
  const publicPaths = new Set()
  const pathsByHash = new Map()

  for (const path of publicFiles) {
    const runtimePath = `/${relative(publicRoot, path).replaceAll('\\', '/')}`
    const extension = extname(path).toLowerCase()
    const diskHash = sha256(path)
    const diskBytes = statSync(path).size
    const item = runtimeByPath.get(runtimePath)
    publicPaths.add(runtimePath)

    const matchingPaths = pathsByHash.get(diskHash) ?? []
    matchingPaths.push(runtimePath)
    pathsByHash.set(diskHash, matchingPaths)

    if (PUBLIC_VIDEO_EXTENSIONS.has(extension)) errors.push(`Unapproved public video: ${runtimePath}`)
    if (!item) {
      errors.push(`Unregistered public media: ${runtimePath}`)
      continue
    }
    if (diskBytes !== item.bytes) errors.push(`Byte-size mismatch: ${runtimePath}`)
    if (diskHash !== item.sha256) errors.push(`SHA-256 mismatch: ${runtimePath}`)
    if (prohibitedHashes.has(diskHash)) errors.push(`Runtime file matches prohibited content: ${runtimePath}`)
  }

  for (const runtimePath of runtimeByPath.keys()) {
    if (!publicPaths.has(runtimePath)) errors.push(`Registered runtime media absent from disk: ${runtimePath}`)
  }
  for (const paths of pathsByHash.values()) {
    if (paths.length > 1) errors.push(`Duplicate public media bytes: ${paths.sort().join(', ')}`)
  }

  return {
    errors,
    counts: {
      publicMediaFiles: publicFiles.length,
      publicVideos: publicFiles.filter((path) => PUBLIC_VIDEO_EXTENSIONS.has(extname(path).toLowerCase())).length,
    },
  }
}

export function auditMedia(root = DEFAULT_ROOT) {
  const manifestErrors = []
  const inventory = readJson(root, INVENTORY_PATH, manifestErrors)
  const denylist = readJson(root, DENYLIST_PATH, manifestErrors)
  const runtime = readJson(root, RUNTIME_PATH, manifestErrors)
  const recordAudit = auditMediaRecords({ inventory, denylist, runtime })
  const errors = [...manifestErrors, ...recordAudit.errors]
  const publicAudit = auditPublicMedia({
    publicRoot: join(root, 'public'),
    runtime,
    prohibitedHashes: recordAudit.prohibitedHashes,
  })
  errors.push(...publicAudit.errors)

  if (inventory.length !== 76) errors.push(`Expected 76 source inventory entries; found ${inventory.length}`)
  if (denylist.length !== 26) errors.push(`Expected 26 prohibited hashes; found ${denylist.length}`)
  if (recordAudit.counts.portraits !== 23) errors.push(`Expected all 23 web-optimized portraits; found ${recordAudit.counts.portraits}`)
  if (publicAudit.counts.publicMediaFiles !== EXPECTED_RUNTIME_ENTRIES) {
    errors.push(`Expected exactly ${EXPECTED_RUNTIME_ENTRIES} deployable public media files; found ${publicAudit.counts.publicMediaFiles}`)
  }

  return {
    errors,
    counts: {
      ...recordAudit.counts,
      runtimeFiles: publicAudit.counts.publicMediaFiles,
      publicVideos: publicAudit.counts.publicVideos,
    },
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = auditMedia()
  if (result.errors.length > 0) {
    console.error(result.errors.map((error) => `- ${error}`).join('\n'))
    process.exitCode = 1
  } else {
    console.log(`Media audit passed: ${JSON.stringify(result.counts)}`)
  }
}
