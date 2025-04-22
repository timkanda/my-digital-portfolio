"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, Menu, X, Database, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState, useEffect } from "react"
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from '@clerk/nextjs'
import { useAdmin } from "@/hooks/use-admin"

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAdmin, isLoading } = useAdmin()

  // Define base routes available to all authenticated users
  const baseRoutes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/blog",
      label: "Blog",
      active: pathname === "/blog" || pathname.startsWith("/blog/"),
    },
    {
      href: "/projects",
      label: "Projects",
      active: pathname === "/projects",
    },
  ]
  
  // Define admin routes only visible to admin users
  const adminRoutes = [
    {
      href: "/admin",
      label: "Admin",
      active: pathname === "/admin",
      icon: <Lock className="mr-1 h-4 w-4" />
    },
  ]
  
  // Combine routes based on admin status
  const routes = isLoading 
    ? baseRoutes 
    : isAdmin 
    ? [...baseRoutes, ...adminRoutes] 
    : baseRoutes

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">CyberShield</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm font-medium transition-colors hover:text-primary flex items-center ${
                route.active ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {/* {route.icon} */}
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <ThemeToggle />
          
          {/* Only show Admin Dashboard button to admin users */}
          {isAdmin && (
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Admin Dashboard
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 flex flex-col gap-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`text-sm font-medium transition-colors hover:text-primary flex items-center ${
                  route.active ? "text-foreground" : "text-muted-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {/* {route.icon} */}
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
