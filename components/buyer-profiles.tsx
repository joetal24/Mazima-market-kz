import { Card } from '@/components/ui/card'
import { Building2, Globe } from 'lucide-react'

export function BuyerProfiles() {
  const localBuyers = [
    "Retailers & Wholesalers",
    "Restaurant Suppliers",
    "Agro-processors",
    "NGOs & Schools",
    "Bulk Traders"
  ]

  const internationalBuyers = [
    "Export Companies",
    "Diaspora-led Agri-businesses",
    "Organic & Fair Trade Buyers",
    "International Bulk Traders"
  ]

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-balance">
          Buyer Profiles
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
          Connecting farmers with the right buyers—local and global
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Local Buyers */}
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-transparent border border-primary/20 hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="h-8 w-8 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">Local Buyers</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Retailers, wholesalers, restaurants, and institutions buying directly from farmers
            </p>
            <ul className="space-y-3">
              {localBuyers.map((buyer, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span className="text-foreground font-medium">{buyer}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* International Buyers */}
          <Card className="p-8 bg-gradient-to-br from-accent/5 to-transparent border border-accent/20 hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="h-8 w-8 text-accent" />
              <h3 className="text-2xl font-bold text-foreground">International Buyers (Future)</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Export potential—connecting to global markets with quality and consistency
            </p>
            <ul className="space-y-3">
              {internationalBuyers.map((buyer, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-accent"></div>
                  <span className="text-foreground font-medium">{buyer}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Global Scalability Section */}
        <div className="mt-16 p-8 bg-secondary/40 rounded-xl border border-border">
          <h3 className="text-2xl font-bold mb-6 text-foreground">Global Scalability Strategy</h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { letter: "A", text: "Focus on Export Value Chains" },
              { letter: "B", text: "Enable Group Selling" },
              { letter: "C", text: "Dynamic Regional Pricing" },
              { letter: "D", text: "Verified Listings & Ratings" },
              { letter: "E", text: "Logistics Integration" }
            ].map((item, idx) => (
              <div key={idx} className="bg-card p-4 rounded-lg text-center hover:shadow-md transition">
                <div className="text-2xl font-bold text-primary mb-2">{item.letter}</div>
                <p className="text-sm font-medium text-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
