import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'MazimaMarket - Connect Farmers to Buyers',
  description: 'Real-time market prices, direct buyer connections, and farming support for Ugandan farmers',
  keywords: 'agriculture, marketplace, Uganda, farmers, buyers, market prices',
  openGraph: {
    title: 'MazimaMarket - Empowering Ugandan Farmers',
    description: 'Connect directly with buyers, access real-time prices, and grow your farm business',
    type: 'website',
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
