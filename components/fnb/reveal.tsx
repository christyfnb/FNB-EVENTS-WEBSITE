'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  /** stagger delay in ms */
  delay?: number
  as?: 'div' | 'span' | 'p' | 'h2' | 'h3' | 'li' | 'figure'
  className?: string
  /** fire once and stay revealed (default true) */
  once?: boolean
}

/**
 * Viewport-triggered reveal. CSS handles the motion (720ms ease-out-expo)
 * and prefers-reduced-motion disables it entirely — content is always
 * present in the DOM.
 */
export function Reveal({ children, delay = 0, as = 'div', className, once = true }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            if (once) observer.disconnect()
          } else if (!once) {
            setInView(false)
          }
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [once])

  const Tag = as
  return (
    <Tag
      // @ts-expect-error polymorphic ref
      ref={ref}
      data-reveal={inView ? 'in' : ''}
      className={className}
      style={{ ['--reveal-delay' as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

/** Line-masked headline reveal. Each string in `lines` reveals with a stagger. */
export function LineReveal({
  lines,
  className,
  delayStep = 60,
  startDelay = 0,
}: {
  lines: string[]
  className?: string
  delayStep?: number
  startDelay?: number
}) {
  return (
    <Reveal className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          className="fnb-line-mask"
          style={{ ['--reveal-delay' as string]: `${startDelay + i * delayStep}ms` }}
        >
          <span style={{ ['--reveal-delay' as string]: `${startDelay + i * delayStep}ms` }}>{line}</span>
        </span>
      ))}
    </Reveal>
  )
}
