import { Card } from '@/components/ui/card'
import { DollarSign, Target, TrendingUp } from 'lucide-react'

export function PricingRevenue() {
  const revenueStreams = [
    {
      icon: DollarSign,
      title: "Transaction Fees",
      description: "1–5% commission on successful deals between farmers and buyers"
    },
    {
      icon: Target,
      title: "Premium Listings",
      description: "For high-volume farmers and serious bulk buyers seeking priority visibility"
    },
    {
      icon: TrendingUp,
      title: "Advertising Space",
      description: "Input suppliers, financial services, and insurance companies reaching farmers"
    },
    {
      icon: Target,
      title: "Data Insights",
      description: "(With consent) Anonymized trends on crop demand, pricing, and locations"
    },
    {
      icon: DollarSign,
      title: "Training Content",
      description: "Paid access to advanced farming guides, workshops, and business courses"
    },
    {
      icon: TrendingUp,
      title: "Logistics Partnerships",
      description: "Commission on integrated delivery and warehousing services"
    }
  ]

  return (
    <section id="pricing" className="py-20 md:py-32 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-balance">
          Revenue Model & Profitability
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
          Sustainable business model designed for rapid growth and farmer empowerment
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {revenueStreams.map((stream, idx) => (
            <Card key={idx} className="p-6 hover:shadow-lg transition">
              <stream.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2 text-foreground">{stream.title}</h3>
              <p className="text-muted-foreground text-sm">{stream.description}</p>
            </Card>
          ))}
        </div>

        {/* Market Potential */}
        <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20">
          <h3 className="text-2xl font-bold mb-4 text-foreground">Market Potential</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">7M+</div>
              <p className="text-muted-foreground">Smallholder farmers in Uganda</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">↑90%</div>
              <p className="text-muted-foreground">Smartphone penetration growth</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">$40B+</div>
              <p className="text-muted-foreground">Agricultural sector value in Uganda</p>
            </div>
          </div>
          <p className="mt-6 text-foreground leading-relaxed">
            With rapid smartphone adoption and Uganda's agricultural backbone, MazimaMarket is positioned to capture significant market share, creating sustainable income for farmers and reliable supply chains for buyers.
          </p>
        </Card>
      </div>
    </section>
  )
}
