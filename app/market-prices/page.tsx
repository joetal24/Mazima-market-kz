'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react'
import { useState } from 'react'

const marketPrices = [
  {
    product: "Maize",
    category: "Fresh Produce",
    markets: [
      { name: "Owino Market", price: 45000, trend: "up", change: 2.5 },
      { name: "Kalerwe Market", price: 44500, trend: "stable", change: 0 },
      { name: "Gulu Market", price: 46500, trend: "down", change: -1.2 },
      { name: "Mbarara Market", price: 43500, trend: "up", change: 3.4 }
    ],
    avgPrice: 45000,
    unit: "per 50kg bag"
  },
  {
    product: "Beans",
    category: "Fresh Produce",
    markets: [
      { name: "Owino Market", price: 68000, trend: "up", change: 1.5 },
      { name: "Kalerwe Market", price: 65000, trend: "up", change: 2.3 },
      { name: "Soroti Market", price: 64000, trend: "stable", change: 0 },
      { name: "Masaka Market", price: 66500, trend: "down", change: -0.8 }
    ],
    avgPrice: 65875,
    unit: "per 50kg bag"
  },
  {
    product: "Fresh Tomatoes",
    category: "Fresh Produce",
    markets: [
      { name: "Owino Market", price: 38000, trend: "down", change: -3.2 },
      { name: "Kalerwe Market", price: 35000, trend: "down", change: -4.1 },
      { name: "Kampala Central", price: 40000, trend: "stable", change: 0 },
      { name: "Jinja Market", price: 32000, trend: "down", change: -5.6 }
    ],
    avgPrice: 36250,
    unit: "per crate"
  },
  {
    product: "Onions",
    category: "Fresh Produce",
    markets: [
      { name: "Owino Market", price: 30000, trend: "up", change: 1.8 },
      { name: "Kalerwe Market", price: 28000, trend: "up", change: 2.2 },
      { name: "Soroti Market", price: 27000, trend: "stable", change: 0 },
      { name: "Kabale Market", price: 29500, trend: "up", change: 2.9 }
    ],
    avgPrice: 28625,
    unit: "per 50kg bag"
  },
  {
    product: "Irish Potatoes",
    category: "Fresh Produce",
    markets: [
      { name: "Kabale Market", price: 32000, trend: "stable", change: 0 },
      { name: "Kampala Central", price: 34000, trend: "up", change: 1.5 },
      { name: "Kalerwe Market", price: 31500, trend: "down", change: -1.2 },
      { name: "Fort Portal Market", price: 33500, trend: "up", change: 2.1 }
    ],
    avgPrice: 32750,
    unit: "per 50kg bag"
  },
  {
    product: "Coffee Beans",
    category: "Cash Crops",
    markets: [
      { name: "Kasese Market", price: 128000, trend: "up", change: 2.4 },
      { name: "Fort Portal Market", price: 125000, trend: "up", change: 1.9 },
      { name: "Mbarara Market", price: 122000, trend: "stable", change: 0 },
      { name: "Kampala Warehouse", price: 130000, trend: "up", change: 3.2 }
    ],
    avgPrice: 126250,
    unit: "per 50kg bag"
  }
]

export default function MarketPricesPage() {
  const [selectedCategory, setSelectedCategory] = useState('Fresh Produce')

  const filtered = marketPrices.filter(p => p.category === selectedCategory)

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
        {/* Category Filter */}
        <div className="flex gap-4 mb-10 overflow-x-auto pb-4">
          {['Fresh Produce', 'Cash Crops'].map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-primary/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Price Cards */}
        <div className="space-y-6">
          {filtered.map((product, idx) => (
            <Card key={idx} className="overflow-hidden hover:shadow-lg transition-all">
              {/* Product Header */}
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6 border-b">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{product.product}</h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-primary">UGX {product.avgPrice.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Avg. price ({product.unit})</p>
                  </div>
                </div>
              </div>

              {/* Market Prices Grid */}
              <div className="p-6">
                <p className="font-semibold text-foreground mb-4">Prices by Market:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {product.markets.map((market, midx) => (
                    <div key={midx} className="bg-muted/30 rounded-lg p-4 border">
                      <p className="font-semibold text-foreground mb-2">{market.name}</p>
                      <div className="flex items-end justify-between mb-2">
                        <p className="text-xl font-bold text-primary">UGX {market.price.toLocaleString()}</p>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded text-sm font-medium ${
                          market.trend === 'up' ? 'bg-red-100 text-red-700' :
                          market.trend === 'down' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {market.trend === 'up' && <TrendingUp size={16} />}
                          {market.trend === 'down' && <TrendingDown size={16} />}
                          <span>{Math.abs(market.change)}%</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {market.trend === 'up' && 'Price increasing'}
                        {market.trend === 'down' && 'Price decreasing'}
                        {market.trend === 'stable' && 'Stable price'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

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
