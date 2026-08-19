import { FNB_MEDIA, type MediaAsset } from '@/lib/media-registry'
import type { ApprovedTask4ServiceContent } from '@/lib/task4-service-content'

export function getTask4ServiceMedia(content: ApprovedTask4ServiceContent): MediaAsset {
  const asset = FNB_MEDIA[content.media.key]
  if (asset.runtimePath !== content.media.runtimePath) {
    throw new Error(`Task 4 media assignment mismatch for ${content.route}`)
  }
  return asset
}

export function getTask4HeroMedia(content: ApprovedTask4ServiceContent): MediaAsset | undefined {
  if (!content.heroMedia) return undefined
  const asset = FNB_MEDIA[content.heroMedia.key]
  if (asset.runtimePath !== content.heroMedia.runtimePath) {
    throw new Error(`Task 4 hero media assignment mismatch for ${content.route}`)
  }
  return asset
}
