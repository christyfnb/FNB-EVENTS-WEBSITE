import Link from 'next/link'
import Image from 'next/image'
import { CAPABILITIES, NAV_LINKS } from '@/lib/content'
import { FNB_MEDIA } from '@/lib/media-registry'

export function FNBFooter() {
  return (
    <footer className="border-t border-steel/60 bg-void">
      <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="flex flex-col gap-6 lg:max-w-sm">
            <div className="flex items-center gap-3">
              <Image
                src={FNB_MEDIA.logo.runtimePath}
                alt=""
                width={FNB_MEDIA.logo.width}
                height={FNB_MEDIA.logo.height}
                sizes="44px"
                className="h-11 w-11 object-contain"
              />
              <div className="flex flex-col">
                <span className="fnb-label text-warm-white">FNB Events</span>
                <span className="fnb-label text-ash">Future Next Branding</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-mist">
              Presence, engineered. Physical space and digital systems, built as one practice.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <nav aria-label="Footer capabilities" className="flex flex-col gap-3">
              <span className="fnb-label text-ash">Capabilities</span>
              {CAPABILITIES.slice(0, 4).map((cap) => (
                <Link key={cap.route} href={cap.route} className="text-sm text-mist transition-colors hover:text-warm-white">
                  {cap.name}
                </Link>
              ))}
            </nav>
            <nav aria-label="Footer digital capabilities" className="flex flex-col gap-3">
              <span className="fnb-label text-ash">Digital</span>
              {CAPABILITIES.slice(4).map((cap) => (
                <Link key={cap.route} href={cap.route} className="text-sm text-mist transition-colors hover:text-warm-white">
                  {cap.name}
                </Link>
              ))}
            </nav>
            <nav aria-label="Footer company" className="flex flex-col gap-3">
              <span className="fnb-label text-ash">Company</span>
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-mist transition-colors hover:text-warm-white">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-steel/40 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <span className="fnb-label text-ash">
            {'\u00A9'} {new Date().getFullYear()} FNB Events
          </span>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="fnb-label text-ash transition-colors hover:text-mist">
              Privacy
            </Link>
            <Link href="/terms-and-conditions" className="fnb-label text-ash transition-colors hover:text-mist">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
