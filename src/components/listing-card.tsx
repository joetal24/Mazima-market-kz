'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, MessageCircle, Phone } from 'lucide-react'
import { useState } from 'react'
import type { Listing } from '@/db/schemas'

interface ListingCardProps {
  listing: Listing
  onContact?: (listing: Listing) => void
}

export function ListingCard({ listing, onContact }: ListingCardProps) {
  const [showContact, setShowContact] = useState(false)

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all group">
      <div className="relative bg-secondary/30 aspect-square overflow-hidden">
        <img 
          src={listing.imageUrl || '/placeholder.svg?height=300&width=300&query=farm produce'}
          alt={listing.produceName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <Star size={14} className="fill-accent-foreground" />
          4.8
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-foreground mb-2">{listing.produceName}</h3>
        
        <div className="space-y-2 mb-4">
          <p className="text-xs text-muted-foreground uppercase">Location: {listing.location}</p>
          {listing.market && (
            <p className="text-xs text-muted-foreground">Market: {listing.market}</p>
          )}
          <p className="text-xs text-muted-foreground">{listing.availableQuantity} {listing.unit} available</p>
        </div>

        <div className="border-t pt-3 mb-4">
          <p className="text-2xl font-bold text-primary">UGX {Math.round(listing.pricePerKg).toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">per {listing.unit}</p>
        </div>

        <Button 
          className="w-full bg-primary hover:bg-primary/90"
          onClick={() => setShowContact(!showContact)}
        >
          {showContact ? 'Hide Contact' : 'Contact Farmer'}
        </Button>

        {showContact && (
          <div className="mt-4 pt-4 border-t space-y-3">
            <Button className="w-full flex items-center gap-2" variant="outline">
              <MessageCircle size={16} />
              Send Message
            </Button>
            <Button className="w-full flex items-center gap-2" variant="outline">
              <Phone size={16} />
              Call Now
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
