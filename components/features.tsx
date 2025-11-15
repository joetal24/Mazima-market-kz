import { TrendingUp, MessageSquare, Cloud, Smartphone, Lock, MapPin } from 'lucide-react'

export function Features() {
  const features = [
    {
      icon: TrendingUp,
      title: "Live Prices",
      description: "Real-time market rates updated daily"
    },
    {
      icon: MessageSquare,
      title: "Verified Chat",
      description: "Secure buyer-farmer negotiations"
    },
    {
      icon: Cloud,
      title: "Smart Alerts",
      description: "Weather & farming tips delivered"
    },
    {
      icon: Smartphone,
      title: "2G Ready",
      description: "Works on low-bandwidth networks"
    },
    {
      icon: Lock,
      title: "Direct Trading",
      description: "No middlemen, fair deals"
    },
    {
      icon: MapPin,
      title: "Regional Access",
      description: "Connect across Uganda instantly"
    }
  ]

  return (
    <section id="features" className="py-20 md:py-32 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-2 text-balance">
          Core <span className="text-primary">Features</span>
        </h2>
        <p className="text-center text-muted-foreground max-w-xl mx-auto mb-16 text-sm">
          Everything you need to trade smarter
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-card rounded-lg p-6 hover:shadow-lg hover:border-primary/50 transition group border">
              <div className="mb-3 p-2 bg-primary/10 rounded-lg w-fit">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-base mb-1 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
