import '@/styles/globals.css'

import { ReactNode } from 'react'
import { Metadata } from 'next'
import { QueryProvider } from '@/modules/common/providers'

type Props = {
  children?: ReactNode
}

export const metadata: Metadata = {
  title: 'Nezuko 3',
  description: 'Nezuko 3',
  manifest: '/manifest.json',
  icons: {
    apple: '/apple-icon.png',
  },
}

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className=" bg-neutral-dark text-neutral-white">
        <QueryProvider>
          <main className="w-screen h-screen">{children}</main>
        </QueryProvider>
      </body>
    </html>
  )
}
