'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, Filter, TrendingUp } from 'lucide-react'
import { useState } from 'react'

const products = [
  {
    id: 1,
    name: "Fresh Maize",
    farmer: "John Mukwano",
    location: "Kampala",
    price: 45000,
    priceUnit: "per 50kg bag",
    image: "/maize-corn.jpg",
    rating: 4.8,
    quantity: "500kg available"
  },
  {
    id: 2,
    name: "Organic Beans",
    farmer: "Mary Namugera",
    location: "Masaka",
    price: 65000,
    priceUnit: "per 50kg bag",
    image: "/dried-beans.jpg",
    rating: 4.9,
    quantity: "300kg available"
  },
  {
    id: 3,
    name: "Fresh Tomatoes",
    farmer: "Samuel Sserwanja",
    location: "Mpigi",
    price: 35000,
    priceUnit: "per crate",
    image: "/fresh-tomatoes.png",
    rating: 4.7,
    quantity: "200 crates available"
  },
  {
    id: 4,
    name: "Quality Onions",
    farmer: "Grace Nakamya",
    location: "Soroti",
    price: 28000,
    priceUnit: "per 50kg bag",
    image: "/yellow-onions.jpg",
    rating: 4.6,
    quantity: "400kg available"
  },
  {
    id: 5,
    name: "Irish Potatoes",
    farmer: "David Kiwanuka",
    location: "Kabale",
    price: 32000,
    priceUnit: "per 50kg bag",
    image: "/irish-potatoes.jpg",
    rating: 4.8,
    quantity: "600kg available"
  },
  {
    id: 6,
    name: "Fresh Cabbage",
    farmer: "Rose Namfuna",
    location: "Wakiso",
    price: 18000,
    priceUnit: "per 25kg bag",
    image: "/green-cabbage.jpg",
    rating: 4.5,
    quantity: "350kg available"
  },
  {
    id: 7,
    name: "Premium Coffee Beans",
    farmer: "Peter Kwasa",
    location: "Kasese",
    price: 120000,
    priceUnit: "per 50kg bag",
    image: "/pile-of-coffee-beans.png",
    rating: 4.9,
    quantity: "200kg available"
  },
  {
    id: 8,
    name: "Hot Peppers",
    farmer: "Lucy Nampijja",
    location: "Jinja",
    price: 42000,
    priceUnit: "per 20kg box",
    image: "/red-hot-peppers.jpg",
    rating: 4.7,
    quantity: "150kg available"
  }
]

export default function FarmersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
          <Button variant="outline" className="gap-2">
            <Filter size={20} />
            Filter
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(product => (
            <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all group">
              <div className="relative bg-secondary/30 aspect-square overflow-hidden">
                <img 
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  {product.rating} ★
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-foreground mb-2">{product.name}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">{product.farmer}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{product.location}</p>
                  <p className="text-xs text-muted-foreground">{product.quantity}</p>
                </div>

                <div className="border-t pt-3 mb-4">
                  <p className="text-2xl font-bold text-primary">UGX {product.price.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{product.priceUnit}</p>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">
                  Contact Farmer
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No products found</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
