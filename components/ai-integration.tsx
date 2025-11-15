import { Card } from '@/components/ui/card'
import { Brain, Zap, Shield, MapPin, TrendingUp, MessageSquare } from 'lucide-react'

export function AIIntegration() {
  const aiFeatures = [
    {
      icon: TrendingUp,
      title: "Price Prediction & Trend Analysis",
      description: "AI forecasts price movements helping farmers make better selling decisions"
    },
    {
      icon: Zap,
      title: "Smart Matching",
      description: "Intelligent farmer-buyer pairing based on location, product, and history"
    },
    {
      icon: Brain,
      title: "Quality Verification",
      description: "Image recognition technology verifies produce quality automatically"
    },
    {
      icon: MessageSquare,
      title: "AI Chat Assistant",
      description: "24/7 farmer support in local languages answering farming questions"
    },
    {
      icon: Shield,
      title: "Fraud & Risk Detection",
      description: "Identifies suspicious activities to protect farmers and buyers"
    },
    {
      icon: MapPin,
      title: "Logistics Optimization",
      description: "AI-powered route optimization and delivery scheduling"
    }
  ]

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Brain className="h-4 w-4" />
            <span className="text-sm font-semibold">Powered by AI</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            AI Makes MazimaMarket Smarter
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Artificial intelligence optimizes every interaction, making the marketplace faster, safer, and more profitable for farmers and buyers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiFeatures.map((feature, idx) => (
            <Card key={idx} className="p-6 hover:shadow-lg hover:border-primary/50 transition group">
              <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* AI Benefits */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-transparent">
            <h3 className="text-2xl font-bold mb-4 text-foreground">For Farmers</h3>
            <ul className="space-y-3">
              {[
                "Better pricing insights with AI predictions",
                "Matched with buyers who want their products",
                "Quality verification reduces disputes",
                "24/7 support in your language"
              ].map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-accent/5 to-transparent">
            <h3 className="text-2xl font-bold mb-4 text-foreground">For Buyers</h3>
            <ul className="space-y-3">
              {[
                "Smart recommendations for reliable suppliers",
                "Risk detection prevents fraud and bad deals",
                "Optimized logistics save money on delivery",
                "Data insights for better business planning"
              ].map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  )
}
