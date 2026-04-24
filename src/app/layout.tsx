import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TrainIQ — Corporate Training System',
  description: 'Professional training and examination platform for corporate teams. Take tests, manage exam sessions, and track performance.',
  keywords: 'training, examination, quiz, corporate learning, test management',
  authors: [{ name: 'TrainIQ' }],
  openGraph: {
    title: 'TrainIQ — Corporate Training System',
    description: 'Professional training and examination platform',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
