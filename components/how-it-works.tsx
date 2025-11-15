import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function HowItWorks() {
  const farmerSteps = [
    {
      number: "1",
      title: "Sign Up & Profile",
      description: "Create your farmer account in your local language"
    },
    {
      number: "2",
      title: "Check Prices",
      description: "View real-time market prices across regions daily"
    },
    {
      number: "3",
      title: "Post Your Produce",
      description: "List what you're selling with photos and quantities"
    },
    {
      number: "4",
      title: "Connect with Buyers",
      description: "Chat directly with verified buyers, negotiate prices"
    },
    {
      number: "5",
      title: "Complete the Sale",
      description: "Arrange delivery or pickup at fair prices"
    }
  ]

  const buyerSteps = [
    {
      number: "1",
      title: "Register",
      description: "Sign up as a retailer, wholesaler, or exporter"
    },
    {
      number: "2",
      title: "Browse Farmers",
      description: "Find verified farmers with quality produce"
    },
    {
      number: "3",
      title: "Post Bulk Requests",
      description: "Let farmers know what you need and quantities"
    },
    {
      number: "4",
      title: "Negotiate Directly",
      description: "Chat with farmers to agree on prices and terms"
    },
    {
      number: "5",
      title: "Secure Supply",
      description: "Get consistent, quality produce at better prices"
    }
  ]

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-balance">
          How MazimaMarket Works
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
          Simple steps to connect, negotiate, and grow your business
        </p>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Farmers Flow */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-foreground">For Farmers</h3>
            <div className="space-y-4">
              {farmerSteps.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground font-bold">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-grow pt-1">
                    <h4 className="font-semibold text-foreground">{step.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                  </div>
                  {idx < farmerSteps.length - 1 && (
                    <div className="absolute left-5 h-8 border-l-2 border-primary/30 mt-10"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Buyers Flow */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-foreground">For Buyers</h3>
            <div className="space-y-4">
              {buyerSteps.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent text-accent-foreground font-bold">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-grow pt-1">
                    <h4 className="font-semibold text-foreground">{step.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                  </div>
                  {idx < buyerSteps.length - 1 && (
                    <div className="absolute left-5 h-8 border-l-2 border-accent/30 mt-10"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
