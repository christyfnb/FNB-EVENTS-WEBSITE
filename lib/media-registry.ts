import runtimeMedia from '@/data/media/runtime-media.json'

export type MediaPage = '/' | '/team' | 'global'
export type MediaPriority = 'lcp' | 'eager-global' | 'lazy'
export type TruthClassification =
  | 'official-brand-asset'
  | 'conceptual-generated-capability-imagery'
  | 'conceptual-generated-interface-imagery'
  | 'approved-portrait-media-metadata-gated'

export type MediaAsset = {
  id: string
  sourcePath: string
  runtimePath: `/media/fnb/${string}`
  page: MediaPage
  section: string
  semanticRole: string
  alt: string
  focalPoint: `${number}% ${number}%`
  desktopMobileBehavior: string
  priority: MediaPriority
  truthClassification: TruthClassification
  brandApprovalStatus: string
  uses: readonly string[]
  publicationStatus: 'approved-for-runtime'
  width: number
  height: number
  aspectRatio: number
  bytes: number
  sha256: string
  sourceSha256: string
}

export const mediaRegistry = runtimeMedia as readonly MediaAsset[]

const mediaById = new Map(mediaRegistry.map((asset) => [asset.id, asset]))
const mediaByRuntimePath = new Map(mediaRegistry.map((asset) => [asset.runtimePath, asset]))

export function getMedia(id: string): MediaAsset {
  const asset = mediaById.get(id)
  if (!asset) throw new Error(`Unknown media registry id: ${id}`)
  return asset
}

export function getMediaByRuntimePath(runtimePath: string): MediaAsset {
  const asset = mediaByRuntimePath.get(runtimePath as MediaAsset['runtimePath'])
  if (!asset) throw new Error(`Unregistered runtime media path: ${runtimePath}`)
  return asset
}

export const teamPortraitMedia = mediaRegistry.filter(
  (asset) => asset.truthClassification === 'approved-portrait-media-metadata-gated',
)

export const FNB_MEDIA = {
  logo: getMedia('brand-official-logo'),
  hero: getMedia('home-hero-stage'),
  editorialGateway: getMedia('home-editorial-skyline'),
  exhibitionStudio: getMedia('capability-exhibition-studio'),
  boothBuild: getMedia('process-booth-build'),
  eventKeynote: getMedia('capability-event-keynote'),
  brandingLobby: getMedia('capability-branding-lobby'),
  technicalControl: getMedia('capability-technical-control'),
  digitalDashboard: getMedia('capability-digital-dashboard'),
  automationAnalytics: getMedia('capability-automation-analytics'),
  aiPavilion: getMedia('capability-ai-pavilion'),
  interiorsLobby: getMedia('capability-interiors-lobby'),
  teamPortraits: teamPortraitMedia,
} as const
