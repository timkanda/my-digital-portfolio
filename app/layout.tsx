import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AuthSync } from "@/components/auth-sync"
import { Toaster } from "@/components/ui/toaster"
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CyberShield | Cybersecurity Portfolio",
  description: "Professional portfolio showcasing expertise in cybersecurity",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Include AuthSync component for auto user role assignment */}
        <SignedIn>
          <AuthSync />
        </SignedIn>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  )
}
