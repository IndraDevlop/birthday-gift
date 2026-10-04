import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Caveat, Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat', weight: ['400', '600', '700'] })

export const metadata: Metadata = {
  title: 'Happy Birthday My Love',
  description: 'A little interactive birthday gift — open it to find our memories.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#1e1b4b',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${caveat.variable} bg-night h-dvh w-full overflow-hidden fixed inset-0`}>
      <body className="font-sans antialiased bg-night text-white h-dvh w-full overflow-hidden fixed inset-0 m-0 p-0">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}