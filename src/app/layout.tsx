import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Toaster } from 'sonner'

import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Todo List',
  description: 'Your newest task manager',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex h-screen flex-col justify-between antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}

          <footer className="mt-4 text-center text-xs text-muted-foreground">
            <Link
              href="https://andre-dev-eight.vercel.app/"
              className="hover:underline hover:underline-offset-2"
            >
              André Barbosa
            </Link>
            &copy; . Todos os direitos reservados - {new Date().getFullYear()}
          </footer>

          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
