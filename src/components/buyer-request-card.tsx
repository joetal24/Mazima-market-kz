'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import type { BuyerRequest } from '@/db/schemas'

interface BuyerRequestCardProps {
  request: BuyerRequest
  onRespond?: (request: BuyerRequest) => void
}

export function BuyerRequestCard({ request, onRespond }: BuyerRequestCardProps) {
  const [isResponding, setIsResponding] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')

  const status = request.status === 'open' ? 'Seeking Supplier' : request.status === 'matched' ? 'Matched' : 'Closed'
  const statusColor = request.status === 'open' ? 'text-green-600' : request.status === 'matched' ? 'text-blue-600' : 'text-gray-600'

  const handleRespond = async () => {
    console.log('[v0] Responding to buyer request:', { request, message: responseMessage })
    onRespond?.(request)
    setIsResponding(false)
    setResponseMessage('')
  }

  return (
    <Card className="p-6 hover:shadow-lg transition-all">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start mb-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase mb-1">Product</p>
          <p className="font-bold text-foreground">{request.produceName}</p>
          <p className="text-sm text-muted-foreground">{request.quantityNeeded} {request.unit}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase mb-1">Budget</p>
          <p className="font-bold text-primary text-lg">
            {request.budgetPerKg ? `UGX ${Math.round(request.budgetPerKg).toLocaleString()}` : 'Negotiable'}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase mb-1">Location</p>
          <p className="font-bold text-foreground">{request.deliveryLocation}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase mb-1">Status</p>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 ${statusColor} text-sm font-medium`}>
            <span className="w-2 h-2 rounded-full bg-current"></span>
            {status}
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground uppercase mb-2">Action</p>
          <Button 
            size="sm" 
            className="bg-primary hover:bg-primary/90"
            onClick={() => setIsResponding(!isResponding)}
            disabled={request.status === 'closed'}
          >
            {isResponding ? 'Cancel' : 'Respond'}
          </Button>
        </div>
      </div>

      {isResponding && (
        <div className="border-t pt-4 space-y-3">
          <textarea
            placeholder="Tell this buyer how you can fulfill their request..."
            value={responseMessage}
            onChange={(e) => setResponseMessage(e.target.value)}
            className="w-full p-3 border border-input rounded-lg text-foreground bg-background"
            rows={3}
          />
          <div className="flex gap-2">
            <Button 
              className="flex-1 bg-primary hover:bg-primary/90"
              onClick={handleRespond}
              disabled={!responseMessage.trim()}
            >
              Send Response
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setIsResponding(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {!isResponding && request.description && (
        <div className="border-t pt-3">
          <p className="text-sm text-muted-foreground">{request.description}</p>
        </div>
      )}
    </Card>
  )
}
