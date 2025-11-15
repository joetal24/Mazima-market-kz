'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { Mail, Lock, User, ArrowLeft, Sprout, DollarSign } from 'lucide-react'

export default function SignUpPage() {
  const router = useRouter()
  const [showRoleSelector, setShowRoleSelector] = useState(false)
  const [userType, setUserType] = useState<'farmer' | 'buyer' | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setShowRoleSelector(true)
      setLoading(false)
    } catch (err) {
      setError('Failed to create account. Please try again.')
      console.error('[v0] Sign up error:', err)
      setLoading(false)
    }
  }

  if (showRoleSelector) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <Card className="w-full max-w-md p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">Choose Your Role</h1>
            <p className="text-muted-foreground mt-2">How would you like to use MazimaMarket?</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={() => {
                localStorage.setItem('userRole', 'farmer')
                router.push('/dashboard')
              }}
              className="p-6 border-2 border-input rounded-lg hover:border-green-500 hover:bg-green-50 transition-all group"
            >
              <Sprout className="w-8 h-8 text-green-600 mb-3 group-hover:scale-110 transition" />
              <h3 className="text-lg font-semibold text-foreground">I'm a Farmer</h3>
              <p className="text-sm text-muted-foreground mt-2">Sell produce, reach buyers, grow your income</p>
            </button>

            <button
              onClick={() => {
                localStorage.setItem('userRole', 'buyer')
                router.push('/dashboard')
              }}
              className="p-6 border-2 border-input rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all group"
            >
              <DollarSign className="w-8 h-8 text-orange-600 mb-3 group-hover:scale-110 transition" />
              <h3 className="text-lg font-semibold text-foreground">I'm a Buyer</h3>
              <p className="text-sm text-muted-foreground mt-2">Source quality produce, support farmers directly</p>
            </button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <Button 
        variant="ghost" 
        className="absolute top-4 left-4"
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
          <p className="text-muted-foreground mt-2">Join MazimaMarket today</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white" disabled={loading}>
            {loading ? 'Creating account...' : 'Continue'}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <Link href="/sign-in" className="text-primary font-semibold hover:underline">
            Sign In
          </Link>
        </div>
      </Card>
    </div>
  )
}
