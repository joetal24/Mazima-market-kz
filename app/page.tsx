import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'
import { ProblemSolution } from '@/components/problem-solution'
import { Features } from '@/components/features'
import { HowItWorks } from '@/components/how-it-works'
import { ProductCategories } from '@/components/product-categories'
import { BuyerProfiles } from '@/components/buyer-profiles'
import { PricingRevenue } from '@/components/pricing-revenue'
import { AIIntegration } from '@/components/ai-integration'
import { CTA } from '@/components/cta'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <ProblemSolution />
      <Features />
      <HowItWorks />
      <ProductCategories />
      <BuyerProfiles />
      <PricingRevenue />
      <AIIntegration />
      <CTA />
      <Footer />
    </div>
  )
}
