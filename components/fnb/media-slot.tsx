'use client'

import { useEffect, useRef, useState } from 'react'

type MediaSlotProps = {
  /** Path in /public where the real asset will live, e.g. /media/img-001-hero-poster.jpg */
  src: string
  alt: string
  /** Asset ID from the manifest, e.g. IMG-001, VD-01 — shown on the placeholder frame */
  assetId: string
  /** Short description of what belongs here */
  brief: string
  className?: string
  imgClassName?: string
  video?: boolean
  /** poster path for video slots */
  poster?: string
  /**
   * Background mode — when the slot sits behind foreground copy (hero),
   * the placeholder renders only the technical grid, docking the asset
   * label to the top-right corner instead of the center.
   */
  subtle?: boolean
}

/**
 * MediaSlot — renders the real asset when it exists in /public/media,
 * and a technical placeholder frame when it does not. When you drop
 * the file into public/media/ with the expected name, the real media
 * appears automatically. No code changes needed.
 */
export function MediaSlot({ src, alt, assetId, brief, className, imgClassName, video, poster, subtle }: MediaSlotProps) {
  const [missing, setMissing] = useState(false)
  const [posterMissing, setPosterMissing] = useState(false)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // onError fires before hydration is missed — re-check on mount.
  useEffect(() => {
    const img = imgRef.current
    if (img && img.complete && img.naturalWidth === 0) {
      setMissing(true)
    }
    const vid = videoRef.current
    if (vid && vid.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
      setMissing(true)
    }
  }, [])

  if (missing || (video && posterMissing)) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-void ${className ?? ''}`}
        role="img"
        aria-label={`${alt} (placeholder awaiting asset ${assetId})`}
      >
        {/* technical grid backdrop */}
        <svg aria-hidden="true" className="absolute inset-0 h-full w-full opacity-[0.35]">
          <defs>
            <pattern id={`grid-${assetId}`} width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="var(--fnb-steel)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${assetId})`} />
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="var(--fnb-steel)" strokeWidth="1" />
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="var(--fnb-steel)" strokeWidth="1" />
        </svg>
        {subtle ? (
          <span className="fnb-label text-ash/70 absolute right-4 top-24 z-10">{assetId}</span>
        ) : (
          <div className="relative z-10 flex flex-col items-center gap-2 px-6 py-10 text-center">
            <span className="fnb-label text-signal">{assetId}</span>
            <span className="fnb-label text-ash max-w-xs text-balance normal-case tracking-normal">{brief}</span>
          </div>
        )}
        {/* corner ticks */}
        <span aria-hidden="true" className="absolute left-3 top-3 h-3 w-3 border-l border-t border-slate" />
        <span aria-hidden="true" className="absolute right-3 top-3 h-3 w-3 border-r border-t border-slate" />
        <span aria-hidden="true" className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-slate" />
        <span aria-hidden="true" className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-slate" />
      </div>
    )
  }

  if (video) {
    return (
      <div className={`relative overflow-hidden bg-void ${className ?? ''}`}>
        <video
          ref={videoRef}
          className={`h-full w-full object-cover ${imgClassName ?? ''}`}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          onError={() => setMissing(true)}
        >
          {poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={poster || '/placeholder.svg'}
              alt={alt}
              className="h-full w-full object-cover"
              onError={() => setPosterMissing(true)}
            />
          ) : null}
        </video>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden bg-void ${className ?? ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src || '/placeholder.svg'}
        alt={alt}
        className={`h-full w-full object-cover ${imgClassName ?? ''}`}
        loading="lazy"
        onError={() => setMissing(true)}
      />
    </div>
  )
}
