'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function CTA() {
  const router = useRouter()

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 to-accent/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
          Ready to Transform Agricultural Trade?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of Ugandan farmers and buyers already using MazimaMarket to access fair prices, reliable supplies, and direct connections.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white"
            onClick={() => router.push('/sign-up')}
          >
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => router.push('/market-prices')}
          >
            Check Market Prices
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          No credit card required. Start buying and selling in minutes.
        </p>

        <div className="mt-16 bg-card rounded-lg p-8 border border-border">
          <p className="text-lg italic text-foreground mb-4">
            "Imagine if every Ugandan farmer could see today's market prices, connect directly with buyers, and sell produce without being exploited by middlemen — all from their phone, in their own language."
          </p>
          <p className="text-sm font-semibold text-primary">MazimaMarket Vision</p>
        </div>
      </div>
    </section>
  )
}
