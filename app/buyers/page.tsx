'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Briefcase, Users, TrendingUp, CheckCircle } from 'lucide-react'
import { useState } from 'react'

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

const activeOrders = [
  {
    id: 101,
    buyer: "Nakasero Market Wholesalers",
    type: "Wholesalers",
    product: "Maize",
    quantity: "2000 bags",
    status: "Looking for supplier",
    budget: "UGX 90M",
    deadline: "Next 7 days"
  },
  {
    id: 102,
    buyer: "Nakumatt Supermarkets",
    type: "Retail Store",
    product: "Fresh Tomatoes",
    quantity: "500 crates/week",
    status: "Ongoing supply",
    budget: "UGX 17.5M/month",
    deadline: "Continuous"
  },
  {
    id: 103,
    buyer: "Uganda Tea & Coffee Export Ltd",
    type: "Exporters",
    product: "Coffee Beans (Grade A)",
    quantity: "50 tons",
    status: "Order confirmed",
    budget: "UGX 600M",
    deadline: "2 months"
  },
  {
    id: 104,
    buyer: "Mulago Hospital",
    type: "Institutions",
    product: "Fresh Vegetables Mix",
    quantity: "200kg weekly",
    status: "Seeking reliable supplier",
    budget: "UGX 3M/week",
    deadline: "Immediate"
  }
]

export default function BuyersPage() {
  const [activeTab, setActiveTab] = useState('overview')

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
                <Card key={buyer.id} className="overflow-hidden hover:shadow-lg transition-all group">
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
          <div className="space-y-4">
            {activeOrders.map(order => (
              <Card key={order.id} className="p-6 hover:shadow-lg transition-all">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase mb-1">Buyer</p>
                    <p className="font-bold text-foreground">{order.buyer}</p>
                    <p className="text-sm text-primary">{order.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase mb-1">Product</p>
                    <p className="font-bold text-foreground">{order.product}</p>
                    <p className="text-sm text-muted-foreground">{order.quantity}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase mb-1">Budget</p>
                    <p className="font-bold text-primary text-lg">{order.budget}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase mb-1">Status</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      {order.status}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground uppercase mb-2">Action</p>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      Respond
                    </Button>
                  </div>
                </div>
                <div className="border-t pt-3">
                  <p className="text-xs text-muted-foreground">Deadline: {order.deadline}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
