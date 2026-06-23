import type { Metadata } from 'next'
import { Bricolage_Grotesque, Newsreader, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { NavBar } from '@/components/NavBar'
import { SiteFooter } from '@/components/SiteFooter'
import './globals.css'

// Display: characterful, used with restraint for prompts + stage headings.
const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
})

// Body: chosen for sustained reading. This is the most important type decision.
const body = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-body',
  display: 'swap',
})

// Utility/mono: badges, vertical/difficulty tags, the framework label.
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://interview.vishalbuilds.com'),
  title: {
    default: 'Product Strategy Interview QnA',
    template: '%s · Product Strategy Interview QnA',
  },
  description:
    'A browsable library of fully-worked product and strategy interview answers. Read or listen to staged answers that show the moves a strong candidate makes.',
  applicationName: 'Product Strategy Interview QnA',
  openGraph: {
    type: 'website',
    siteName: 'Product Strategy Interview QnA',
    locale: 'en_US',
    url: '/',
    title: 'Product Strategy Interview QnA',
    description:
      'Fully-worked product and strategy interview answers that show the thinking, not the framework.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Product Strategy Interview QnA',
    description:
      'Fully-worked product and strategy interview answers that show the thinking, not the framework.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <NavBar />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  )
}
