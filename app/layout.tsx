import './globals.css'
import type { Metadata } from 'next'
import { Comfortaa } from 'next/font/google'
import Head from 'next/head'

const confortaa = Comfortaa({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'tarif',
  description: 'Rates for Climate Decision-Making & Life',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={confortaa.className}>{children}</body>
    </html>
  )
}
