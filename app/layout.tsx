import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TiDB - AI-Native Database for Modern Developers',
  description: 'TiDB combines vector database, full-text search, and MySQL compatibility in one unified platform for AI developers.',
  keywords: 'TiDB, vector database, full-text search, MySQL, AI database, distributed database',
  authors: [{ name: 'PingCAP' }],
  creator: 'PingCAP',
  publisher: 'PingCAP',
  openGraph: {
    title: 'TiDB - AI-Native Database for Modern Developers',
    description: 'TiDB combines vector database, full-text search, and MySQL compatibility in one unified platform for AI developers.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TiDB - AI-Native Database for Modern Developers',
    description: 'TiDB combines vector database, full-text search, and MySQL compatibility in one unified platform for AI developers.',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}