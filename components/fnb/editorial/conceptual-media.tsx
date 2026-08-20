import type { MediaAsset } from '@/lib/media-registry'
import { MediaSlot } from '@/components/fnb/media-slot'

type ConceptualMediaProps = {
  asset: MediaAsset
  className?: string
  imageClassName?: string
  sizes: string
  label?: string
  preload?: boolean
}

/** Truth-labelled media treatment for approved conceptual capability imagery. */
export function ConceptualMedia({
  asset,
  className,
  imageClassName,
  sizes,
  label = 'Conceptual capability imagery — not project evidence',
  preload = false,
}: ConceptualMediaProps) {
  return (
    <figure className={`fnb-editorial-media ${className ?? ''}`} data-truth-classification={asset.truthClassification}>
      <MediaSlot
        asset={asset}
        sizes={sizes}
        preload={preload}
        className="h-full w-full"
        imgClassName={`fnb-editorial-image ${imageClassName ?? ''}`}
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-void/85 px-4 py-3 backdrop-blur-sm">
        <span className="fnb-label text-mist">{label}</span>
      </figcaption>
    </figure>
  )
}
