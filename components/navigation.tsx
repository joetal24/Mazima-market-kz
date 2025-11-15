'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">M</span>
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:inline">MazimaMarket</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/#features" className="text-sm text-muted-foreground hover:text-foreground transition">Features</a>
            <Link href="/farmers" className="text-sm text-muted-foreground hover:text-foreground transition">Buy from Farmers</Link>
            <Link href="/buyers" className="text-sm text-muted-foreground hover:text-foreground transition">Find Buyers</Link>
            <Link href="/market-prices" className="text-sm text-muted-foreground hover:text-foreground transition">Prices</Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" size="sm">Sign In</Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">Get Started</Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <a href="/#features" className="block text-sm text-muted-foreground hover:text-foreground">Features</a>
            <Link href="/farmers" className="block text-sm text-muted-foreground hover:text-foreground">Buy from Farmers</Link>
            <Link href="/buyers" className="block text-sm text-muted-foreground hover:text-foreground">Find Buyers</Link>
            <Link href="/market-prices" className="block text-sm text-muted-foreground hover:text-foreground">Prices</Link>
            <div className="flex gap-2 pt-4">
              <Button variant="outline" size="sm" className="flex-1">Sign In</Button>
              <Button size="sm" className="flex-1 bg-primary">Get Started</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
