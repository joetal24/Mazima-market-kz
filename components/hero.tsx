'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, TrendingUp, Users, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function Hero() {
  const router = useRouter()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20 py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                Farmers Meet Buyers, <span className="text-primary">Fairly</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Real prices, direct connections, fair deals. No middlemen. Works even on poor internet.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 py-8 border-y border-border">
              <div>
                <div className="text-2xl font-bold text-primary">7M+</div>
                <div className="text-sm text-muted-foreground">Farmers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">10+</div>
                <div className="text-sm text-muted-foreground">Markets</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Updates</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
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
                onClick={() => router.push('/farmers')}
              >
                Browse Listings
              </Button>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">Real prices, daily updates</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">Direct buyer-farmer connections</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">Works on 2G networks</span>
              </div>
            </div>
          </div>

          <div className="relative h-96 md:h-full min-h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl overflow-hidden flex items-center justify-center">
            <div className="space-y-4 p-8">
              <div className="bg-card rounded-lg p-6 shadow-lg space-y-3 transform hover:scale-105 transition">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">Maize Today</span>
                  <span className="text-primary font-bold text-lg">↑ 5%</span>
                </div>
                <div className="text-3xl font-bold text-foreground">2,500 UGX/kg</div>
                <div className="text-xs text-muted-foreground">Updated 2hrs ago</div>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-lg space-y-3 transform hover:scale-105 transition">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">Tomatoes</span>
                  <span className="text-primary font-bold text-sm">Direct Buyer</span>
                </div>
                <div className="text-3xl font-bold text-foreground">1,500 UGX/crate</div>
                <div className="text-xs text-muted-foreground">5 buyers interested</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
