import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Chatbot',
  description: 'AI Chatbot trả lời dựa trên kiến thức cá nhân',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className={`${inter.className} bg-gray-900 text-white min-h-screen`}>
        <main className="flex min-h-screen flex-col">
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
} 