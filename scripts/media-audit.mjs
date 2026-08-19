import { createHash } from 'node:crypto'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { extname, join, relative, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const DEFAULT_ROOT = resolve(import.meta.dirname, '..')
const INVENTORY_PATH = 'data/media/source-inventory.json'
const DENYLIST_PATH = 'data/media/prohibited-sha256.json'
const RUNTIME_PATH = 'data/media/runtime-media.json'
const RUNTIME_ROOT = 'public/media/fnb'

function readJson(root, path, errors) {
  const absolutePath = join(root, path)
  if (!existsSync(absolutePath)) {
    errors.push(`Missing required media manifest: ${path}`)
    return []
  }

  try {
    return JSON.parse(readFileSync(absolutePath, 'utf8'))
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

export function auditMedia(root = DEFAULT_ROOT) {
  const errors = []
  const inventory = readJson(root, INVENTORY_PATH, errors)
  const denylist = readJson(root, DENYLIST_PATH, errors)
  const runtime = readJson(root, RUNTIME_PATH, errors)
  const runtimeRoot = join(root, RUNTIME_ROOT)

  if (inventory.length !== 76) errors.push(`Expected 76 source inventory entries; found ${inventory.length}`)
  if (denylist.length !== 26) errors.push(`Expected 26 prohibited hashes; found ${denylist.length}`)

  const inventoryPaths = new Set()
  const inventoryHashes = new Set()
  for (const item of inventory) {
    if (!item.sourcePath || inventoryPaths.has(item.sourcePath)) errors.push(`Duplicate or missing sourcePath: ${item.sourcePath ?? '<missing>'}`)
    inventoryPaths.add(item.sourcePath)
    if (!Number.isInteger(item.width) || item.width <= 0 || !Number.isInteger(item.height) || item.height <= 0) {
      errors.push(`Invalid decoded dimensions for ${item.sourcePath ?? '<missing>'}`)
    }
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
    if (!item.id || !item.sourcePath || !item.runtimePath) errors.push(`Runtime registry entry is missing required identity fields: ${JSON.stringify(item)}`)
    if (!inventoryPaths.has(item.sourcePath)) errors.push(`Runtime source is absent from inventory: ${item.sourcePath}`)
    if (runtimePaths.has(item.runtimePath)) errors.push(`Duplicate runtime path in registry: ${item.runtimePath}`)
    runtimePaths.add(item.runtimePath)
    if (runtimeHashes.has(item.sha256)) errors.push(`Byte-identical runtime registry entry: ${item.sha256}`)
    runtimeHashes.add(item.sha256)
    if (prohibitedHashes.has(item.sha256)) errors.push(`Runtime registry contains prohibited hash: ${item.sha256}`)
    if (item.sourcePath.includes('/14-Team/02-Master/')) errors.push(`Team master registered for runtime: ${item.sourcePath}`)
    if (item.sourcePath.includes('/14-Team/01-Web-Optimized/')) portraitCount += 1
    if (item.publicationStatus !== 'approved-for-runtime') errors.push(`Unapproved runtime entry: ${item.id}`)
    if (!item.truthClassification || !item.brandApprovalStatus) errors.push(`Missing governance metadata: ${item.id}`)

    const diskPath = join(root, 'public', item.runtimePath.replace(/^\//, ''))
    if (!existsSync(diskPath)) {
      errors.push(`Missing runtime file: ${item.runtimePath}`)
      continue
    }
    if (statSync(diskPath).size !== item.bytes) errors.push(`Byte-size mismatch: ${item.runtimePath}`)
    const diskHash = sha256(diskPath)
    if (diskHash !== item.sha256) errors.push(`SHA-256 mismatch: ${item.runtimePath}`)
    if (prohibitedHashes.has(diskHash)) errors.push(`Runtime file matches prohibited content: ${item.runtimePath}`)
  }
  if (portraitCount !== 23) errors.push(`Expected all 23 web-optimized portraits; found ${portraitCount}`)

  const diskFiles = walkFiles(runtimeRoot).filter((path) => ['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(extname(path).toLowerCase()))
  const diskPaths = new Set(diskFiles.map((path) => `/${relative(join(root, 'public'), path).replaceAll('\\', '/')}`))
  for (const path of diskPaths) {
    if (!runtimePaths.has(path)) errors.push(`Unregistered runtime media: ${path}`)
  }
  for (const path of runtimePaths) {
    if (!diskPaths.has(path)) errors.push(`Registered runtime media absent from disk: ${path}`)
  }

  const diskHashes = diskFiles.map(sha256)
  if (new Set(diskHashes).size !== diskHashes.length) errors.push('Runtime media contains byte-identical duplicate files')
  if (diskFiles.some((path) => /02-Master/i.test(path))) errors.push('Runtime hierarchy contains a team master path')
  if (walkFiles(runtimeRoot).some((path) => extname(path).toLowerCase() === '.mp4')) errors.push('Runtime hierarchy contains an unapproved video')

  return {
    errors,
    counts: {
      sourceInventory: inventory.length,
      prohibitedHashes: denylist.length,
      runtimeEntries: runtime.length,
      runtimeFiles: diskFiles.length,
      portraits: portraitCount,
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
