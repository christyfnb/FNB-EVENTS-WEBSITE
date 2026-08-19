'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { FNB_MEDIA } from '@/lib/media-registry'
import { isNavigationActive, PRIMARY_NAVIGATION } from '@/lib/site-registry'

export function FNBHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    let frame = 0
    let ticking = false
    const update = () => {
      setScrolled((current) => {
        const next = window.scrollY > 24
        return current === next ? current : next
      })
      ticking = false
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      frame = window.requestAnimationFrame(update)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return () => {
      document.body.style.overflow = ''
    }

    const focusFrame = window.requestAnimationFrame(() => firstMobileLinkRef.current?.focus())
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      toggleRef.current?.focus()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.cancelAnimationFrame(focusFrame)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'bg-void/90 backdrop-blur-sm border-b border-steel/60' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="FNB Events home">
          <Image
            src={FNB_MEDIA.logo.runtimePath}
            alt=""
            width={FNB_MEDIA.logo.width}
            height={FNB_MEDIA.logo.height}
            sizes="36px"
            className="h-9 w-9 object-contain"
          />
          <span className="fnb-label hidden text-warm-white sm:block">FNB Events</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {PRIMARY_NAVIGATION.map((link) => {
            const active = isNavigationActive(pathname, link.href)
            return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? 'page' : undefined}
              className={`fnb-label border-b py-1 transition-colors hover:text-warm-white focus-visible:text-warm-white ${
                active ? 'border-signal text-warm-white' : 'border-transparent text-mist'
              }`}
            >
              {link.label}
            </Link>
            )
          })}
          <Link
            href="/project-enquiry"
            className="fnb-label border border-signal px-4 py-2.5 text-signal transition-colors hover:bg-signal hover:text-void focus-visible:bg-signal focus-visible:text-void"
          >
            Start a project
          </Link>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-expanded={open}
          aria-controls="fnb-mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span
            aria-hidden="true"
            className={`h-px w-6 bg-warm-white transition-transform ${open ? 'translate-y-[3.5px] rotate-45' : ''}`}
          />
          <span
            aria-hidden="true"
            className={`h-px w-6 bg-warm-white transition-transform ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`}
          />
        </button>
      </div>

      {open && (
        <nav
          id="fnb-mobile-nav"
          aria-label="Mobile"
          className="flex h-[calc(100dvh-4rem)] flex-col gap-1 border-t border-steel/60 bg-void px-5 py-8 lg:hidden"
        >
          {PRIMARY_NAVIGATION.map((link, i) => {
            const active = isNavigationActive(pathname, link.href)
            return (
            <Link
              ref={i === 0 ? firstMobileLinkRef : undefined}
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={active ? 'page' : undefined}
              className={`fnb-head border-b py-4 text-2xl ${
                active ? 'border-signal text-signal' : 'border-steel/40 text-warm-white'
              }`}
            >
              <span className="fnb-label mr-4 text-ash">{String(i + 1).padStart(2, '0')}</span>
              {link.label}
            </Link>
            )
          })}
          <Link
            href="/project-enquiry"
            onClick={() => setOpen(false)}
            className="fnb-label mt-8 flex h-14 items-center justify-center bg-signal text-void"
          >
            Start a project
          </Link>
        </nav>
      )}
    </header>
  )
}
