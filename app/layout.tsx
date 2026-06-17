import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/Nav'

const font = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'ACT Optimizer',
  description: 'Track your ACT progress and reach a 36',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${font.variable} font-sans antialiased`} suppressHydrationWarning>
        <Nav />
        {children}
      </body>
    </html>
  )
}
