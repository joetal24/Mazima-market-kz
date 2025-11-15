'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const [userRole, setUserRole] = useState<'farmer' | 'buyer' | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would check authentication and user role from session/token
    const role = localStorage.getItem('userRole') as 'farmer' | 'buyer' | null
    
    if (!role) {
      // Redirect to sign-up if no role is set
      router.push('/sign-up')
      return
    }

    setUserRole(role)
    setLoading(false)
  }, [router])

  const handleSignOut = () => {
    localStorage.removeItem('userRole')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  // Route to appropriate dashboard based on role
  if (userRole === 'farmer') {
    router.push('/dashboard/farmer')
  } else if (userRole === 'buyer') {
    router.push('/dashboard/buyer')
  }

  return null
}
