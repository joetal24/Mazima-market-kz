'use client'

import { Card } from '@/components/ui/card'
import { TrendingUp, TrendingDown } from 'lucide-react'
import type { MarketPrice } from '@/db/schemas'

interface PriceCardProps {
  price: MarketPrice
}

export function PriceCard({ price }: PriceCardProps) {
  const getTrendColor = () => {
    if (price.trend === 'up') return 'bg-red-100 text-red-700'
    if (price.trend === 'down') return 'bg-green-100 text-green-700'
    return 'bg-gray-100 text-gray-700'
  }

  const getTrendIcon = () => {
    if (price.trend === 'up') return <TrendingUp size={16} />
    if (price.trend === 'down') return <TrendingDown size={16} />
    return null
  }

  return (
    <div className="bg-muted/30 rounded-lg p-4 border">
      <p className="font-semibold text-foreground mb-2">{price.market}</p>
      <div className="flex items-end justify-between mb-2">
        <p className="text-xl font-bold text-primary">UGX {Math.round(price.pricePerKg).toLocaleString()}</p>
        <div className={`flex items-center gap-1 px-2 py-1 rounded text-sm font-medium ${getTrendColor()}`}>
          {getTrendIcon()}
          <span>{Math.abs(price.priceChange)}%</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        {price.trend === 'up' && 'Price increasing'}
        {price.trend === 'down' && 'Price decreasing'}
        {price.trend === 'stable' && 'Stable price'}
      </p>
    </div>
  )
}
