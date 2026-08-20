import Image from 'next/image'
import type { MediaAsset } from '@/lib/media-registry'

type MediaSlotProps = {
  asset: MediaAsset
  className?: string
  imgClassName?: string
  sizes: string
  preload?: boolean
  decorative?: boolean
}

/** Registry-bound production image with decoded dimensions and responsive source selection. */
export function MediaSlot({ asset, className, imgClassName, sizes, preload = false, decorative = false }: MediaSlotProps) {
  return (
    <div className={`relative overflow-hidden bg-void ${className ?? ''}`}>
      <Image
        src={asset.runtimePath}
        alt={decorative ? '' : asset.alt}
        width={asset.width}
        height={asset.height}
        sizes={sizes}
        preload={preload}
        className={`h-full w-full object-cover ${imgClassName ?? ''}`}
        style={{ objectPosition: asset.focalPoint }}
      />
    </div>
  )
}
