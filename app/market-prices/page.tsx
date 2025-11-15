'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { useState, useEffect } from 'react'
import { trpcClient } from '@/lib/trpc'
import { PriceCard } from '@/components/price-card'
import type { MarketPrice } from '@/db/schemas'

export default function MarketPricesPage() {
  const [prices, setPrices] = useState<MarketPrice[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const data = await trpcClient.price.getAll.query()
        setPrices(data || [])
      } catch (error) {
        console.error('Failed to fetch prices:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPrices()
  }, [])

  // Group prices by produce name
  const groupedPrices = prices.reduce((acc, price) => {
    const existing = acc.find(group => group.produceName === price.produceName)
    if (existing) {
      existing.markets.push(price)
    } else {
      acc.push({
        produceName: price.produceName,
        markets: [price],
      })
    }
    return acc
  }, [] as Array<{ produceName: string; markets: MarketPrice[] }>)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Real-Time Market Prices</h1>
          <p className="text-muted-foreground text-lg">Check daily prices across Uganda's major markets</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Price Cards */}
        {loading ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Loading market prices...</p>
          </div>
        ) : groupedPrices.length > 0 ? (
          <div className="space-y-6">
            {groupedPrices.map((group, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-lg transition-all">
                <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6 border-b">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{group.produceName}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-primary">
                        UGX {Math.round(group.markets[0]?.pricePerKg || 0).toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">Latest price</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="font-semibold text-foreground mb-4">Prices by Market:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {group.markets.map((price, midx) => (
                      <PriceCard key={midx} price={price} />
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No price data available</p>
          </div>
        )}

        {/* Info Box */}
        <Card className="mt-12 bg-primary/5 border-primary/20 p-6">
          <p className="text-foreground">
            <span className="font-bold">Tip:</span> Prices are updated daily. Compare across markets to get the best price for your products. Connect with buyers in high-price markets to maximize your profits.
          </p>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
