'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, MapPin, Star, MessageCircle, Filter } from 'lucide-react'
import { trpc } from '@/lib/trpc'

export default function SearchPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedMarket, setSelectedMarket] = useState('')
  const [selectedFarmer, setSelectedFarmer] = useState<number | null>(null)

  const categories = ['fresh_produce', 'cash_crops', 'horticulture', 'other']
  const markets = ['Owino', 'Kalerwe', 'Gulu', 'Mbale', 'Soroti']

  const { data: listings, isLoading: listingsLoading } = trpc.listing.getAll.useQuery(
    {
      search: searchQuery || undefined,
      category: selectedCategory || undefined,
      market: selectedMarket || undefined,
    },
    {
      enabled: searchQuery.length > 0 || selectedCategory || selectedMarket,
    }
  )

  const farmerGroups = listings?.reduce((acc, listing) => {
    const farmerId = listing.farmerId
    if (!acc[farmerId]) {
      acc[farmerId] = {
        farmerId,
        listings: [],
        farmerName: listing.farmerName || 'Farmer',
        farmerLocation: listing.farmerLocation || 'Uganda',
        farmRating: 4.5,
        reviewCount: 12,
      }
    }
    acc[farmerId].listings.push(listing)
    return acc
  }, {} as Record<string, any>) || {}

  const handleChatWithFarmer = (farmerId: string) => {
    router.push(`/chat?farmerId=${farmerId}`)
  }

  const handleSelectFarmer = (farmerId: string) => {
    setSelectedFarmer(farmerId as any)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-balance mb-4">Find Farm Products</h1>
            <p className="text-lg text-muted-foreground mb-8">Search for fresh produce and connect directly with verified farmers</p>

            {/* Search Bar */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search by product name (e.g., Maize, Tomatoes, Avocado)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4 flex-wrap">
              <div className="flex gap-2 items-center">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filter by:</span>
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg text-sm bg-background"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.replace('_', ' ').toUpperCase()}
                  </option>
                ))}
              </select>

              <select
                value={selectedMarket}
                onChange={(e) => setSelectedMarket(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg text-sm bg-background"
              >
                <option value="">All Markets</option>
                {markets.map(market => (
                  <option key={market} value={market}>
                    {market}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results */}
          {listingsLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          ) : listings && listings.length > 0 ? (
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Found <span className="font-semibold">{listings.length}</span> products from <span className="font-semibold">{Object.keys(farmerGroups).length}</span> farmers
              </p>

              {/* Farmer Groups */}
              <div className="grid gap-6">
                {Object.values(farmerGroups).map((farmerGroup: any) => (
                  <Card key={farmerGroup.farmerId} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      {/* Farmer Header */}
                      <div className="flex items-start justify-between mb-4 pb-4 border-b border-border">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold">{farmerGroup.farmerName}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <MapPin className="h-4 w-4" />
                            {farmerGroup.farmerLocation}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.round(farmerGroup.farmRating)
                                      ? 'fill-accent text-accent'
                                      : 'text-muted'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-medium">{farmerGroup.farmRating}</span>
                            <span className="text-xs text-muted-foreground">({farmerGroup.reviewCount} reviews)</span>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleChatWithFarmer(farmerGroup.farmerId)}
                          className="gap-2 bg-primary hover:bg-primary/90"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Chat Now
                        </Button>
                      </div>

                      {/* Farmer's Products */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {farmerGroup.listings.map((prod: any) => (
                          <div key={prod.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                            {prod.imageUrl && (
                              <img
                                src={prod.imageUrl || "/placeholder.svg"}
                                alt={prod.produceName}
                                className="w-full h-32 object-cover rounded mb-3"
                              />
                            )}
                            <h4 className="font-semibold text-sm mb-2">{prod.produceName}</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Price:</span>
                                <span className="font-medium">{prod.pricePerKg} UGX / {prod.unit}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Available:</span>
                                <span className="font-medium">{prod.availableQuantity} {prod.unit}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Status:</span>
                                <Badge
                                  variant={prod.status === 'available' ? 'default' : 'secondary'}
                                  className="text-xs"
                                >
                                  {prod.status}
                                </Badge>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full mt-3 text-xs"
                              onClick={() => handleChatWithFarmer(farmerGroup.farmerId)}
                            >
                              Interest in this product
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ) : searchQuery || selectedCategory || selectedMarket ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No products found matching your criteria</p>
              <Button onClick={() => {
                setSearchQuery('')
                setSelectedCategory('')
                setSelectedMarket('')
              }}>
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Start searching to find products and connect with farmers</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
