import { Card } from '@/components/ui/card'
import { AlertCircle, Zap } from 'lucide-react'

export function ProblemSolution() {
  const problems = [
    {
      icon: AlertCircle,
      title: "No Real-Time Prices",
      desc: "Farmers exploited by middlemen due to lack of market information"
    },
    {
      icon: AlertCircle,
      title: "Limited Market Reach",
      desc: "Can only sell locally, trapped in low-profit cycles"
    },
    {
      icon: AlertCircle,
      title: "Poor Information Flow",
      desc: "No access to best farming practices or buyer needs"
    },
    {
      icon: AlertCircle,
      title: "Low Bargaining Power",
      desc: "Unstable income due to fluctuating prices and middlemen"
    }
  ]

  const solutions = [
    {
      icon: Zap,
      title: "Live Price Updates",
      desc: "Access updated crop prices from major markets daily"
    },
    {
      icon: Zap,
      title: "Direct Market Access",
      desc: "Post produce for sale, connect with verified buyers"
    },
    {
      icon: Zap,
      title: "Secure Negotiations",
      desc: "Verified buyer-farmer chat for trust-building"
    },
    {
      icon: Zap,
      title: "Farming Support",
      desc: "Localized tips, weather alerts, and growth resources"
    }
  ]

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-balance">
          The Problem Farmers Face
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
          Ugandan farmers are trapped in a cycle of exploitation and low income. MazimaMarket breaks this cycle.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {problems.map((problem, idx) => (
            <Card key={idx} className="p-6 border border-destructive/30 bg-destructive/5 hover:shadow-lg transition">
              <problem.icon className="h-8 w-8 text-destructive mb-4" />
              <h3 className="font-semibold text-lg mb-2 text-foreground">{problem.title}</h3>
              <p className="text-muted-foreground">{problem.desc}</p>
            </Card>
          ))}
        </div>

        <div className="relative py-8 text-center mb-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative inline-block bg-background px-4">
            <span className="text-primary font-bold text-xl">↓ Our Solution ↓</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {solutions.map((solution, idx) => (
            <Card key={idx} className="p-6 border border-primary/30 bg-primary/5 hover:shadow-lg transition">
              <solution.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2 text-foreground">{solution.title}</h3>
              <p className="text-muted-foreground">{solution.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
