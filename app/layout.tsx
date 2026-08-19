import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Archivo, Geist_Mono } from 'next/font/google'
import { FNBFooter } from '@/components/fnb/fnb-footer'
import { FNBHeader } from '@/components/fnb/fnb-header'
import { FNB_MEDIA } from '@/lib/media-registry'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  weight: ['400', '500', '600', '700'],
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'FNB Events | Exhibition Stands, Event Production & Digital Systems',
  description:
    'FNB designs, engineers and builds the environments brands appear in, then extends that presence into the digital systems behind them. Exhibitions, events, technical production, interiors, websites, automation and AI workflows.',
  icons: {
    icon: [{ url: FNB_MEDIA.logo.runtimePath }],
  },
  openGraph: {
    title: 'FNB Events | Presence, engineered.',
    description:
      'Exhibitions, events, spatial production, websites, automation and AI workflows. One practice, one operating standard.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#211d1a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${geistMono.variable} bg-obsidian`}>
      <body className="antialiased font-sans">
        <a
          href="#main"
          className="fnb-label fixed left-4 top-3 z-[100] -translate-y-20 bg-signal px-4 py-3 text-void transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <FNBHeader />
        {children}
        <FNBFooter />
        {process.env.VERCEL === '1' && <Analytics />}
      </body>
    </html>
  )
}
