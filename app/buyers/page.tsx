'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Briefcase, Users, TrendingUp, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { trpcClient } from '@/lib/trpc'
import { BuyerRequestCard } from '@/components/buyer-request-card'
import { useRouter } from 'next/navigation'
import type { BuyerRequest } from '@/db/schemas'

const buyerTypes = [
  {
    id: 1,
    type: "Retail Store",
    icon: Briefcase,
    description: "Local supermarkets & shops",
    buyers: 2500,
    color: "from-blue-500 to-blue-600"
  },
  {
    id: 2,
    type: "Wholesalers",
    icon: Users,
    description: "Bulk buyers & distributors",
    buyers: 850,
    color: "from-green-500 to-green-600"
  },
  {
    id: 3,
    type: "Exporters",
    icon: TrendingUp,
    description: "International traders",
    buyers: 320,
    color: "from-purple-500 to-purple-600"
  },
  {
    id: 4,
    type: "Institutions",
    icon: CheckCircle,
    description: "Schools, hospitals, NGOs",
    buyers: 1200,
    color: "from-orange-500 to-orange-600"
  }
]

export default function BuyersPage() {
  const router = useRouter()
  const [buyerRequests, setBuyerRequests] = useState<BuyerRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await trpcClient.buyerRequest.getAll.query()
        setBuyerRequests(data || [])
      } catch (error) {
        console.error('Failed to fetch buyer requests:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-accent/10 to-primary/10 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Buyer Directory</h1>
          <p className="text-muted-foreground text-lg">Connect with verified buyers looking for your products</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Buyer Types */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">Buyer Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {buyerTypes.map(buyer => {
              const Icon = buyer.icon
              return (
                <Card 
                  key={buyer.id} 
                  className="overflow-hidden hover:shadow-lg transition-all group cursor-pointer"
                  onClick={() => console.log('[v0] Buyer type selected:', buyer.type)}
                >
                  <div className={`bg-gradient-to-br ${buyer.color} h-20`}></div>
                  <div className="p-6 relative -mt-10 bg-background rounded-t-lg">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                      <Icon className="text-primary" size={24} />
                    </div>
                    <h3 className="font-bold text-foreground mb-1">{buyer.type}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{buyer.description}</p>
                    <p className="text-lg font-bold text-primary">{buyer.buyers}+ buyers</p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Active Buyer Requests */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-8">Active Buyer Requests</h2>
          {loading ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Loading buyer requests...</p>
            </div>
          ) : buyerRequests.length > 0 ? (
            <div className="space-y-4">
              {buyerRequests.map(request => (
                <BuyerRequestCard 
                  key={request.id}
                  request={request}
                  onRespond={(r) => console.log('Respond to request:', r)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No active buyer requests at the moment</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
