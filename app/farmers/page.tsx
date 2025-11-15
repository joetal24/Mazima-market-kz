'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Search, Filter } from 'lucide-react'
import { useState, useEffect } from 'react'
import { trpcClient } from '@/lib/trpc'
import { ListingCard } from '@/components/listing-card'
import { useRouter } from 'next/navigation'
import type { Listing } from '@/db/schemas'

export default function FarmersPage() {
  const router = useRouter()
  const [listings, setListings] = useState<Listing[]>([])
  const [filtered, setFiltered] = useState<Listing[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await trpcClient.listing.getAll.query({
          category: selectedCategory !== 'all' ? selectedCategory : undefined,
        })
        setListings(data || [])
      } catch (error) {
        console.error('Failed to fetch listings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [selectedCategory])

  useEffect(() => {
    setFiltered(
      listings.filter(l =>
        l.produceName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [searchTerm, listings])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Buy Direct from Farmers</h1>
          <p className="text-muted-foreground text-lg">Fresh produce • Verified farmers • Best prices • Real-time availability</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <input 
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground"
            />
          </div>
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => console.log('[v0] Filter clicked')}
          >
            <Filter size={20} />
            Filter
          </Button>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.length > 0 ? (
              filtered.map(listing => (
                <ListingCard 
                  key={listing.id} 
                  listing={listing}
                  onContact={(l) => console.log('Contact farmer:', l)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-muted-foreground text-lg">No products found</p>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
