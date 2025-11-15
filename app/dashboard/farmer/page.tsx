'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LogOut, Plus, TrendingUp, MessageSquare, Loader2, Sprout, DollarSign, Twitch as SwitchCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { trpcClient } from '@/src/lib/trpc'
import type { User, Listing } from '@/src/db/schemas'

interface FarmerStatsData {
  activeListings: number
  salesThisMonth: number
  messages: number
  rating: number
}

export default function FarmerDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'messages' | 'settings'>('overview')
  const [userProfile, setUserProfile] = useState<User | null>(null)
  const [stats, setStats] = useState<FarmerStatsData | null>(null)
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const userRole = localStorage.getItem('userRole');
        const userId = localStorage.getItem('userId');
        
        const profile = userId ? await trpcClient.user.getById.query(userId) : null;
        setUserProfile(profile);

        const farmerStats = userId ? await trpcClient.user.getFarmerStats.query(userId) : null;
        setStats(farmerStats);

        const farmerListings = userId ? await trpcClient.listing.getByFarmer.query(userId) : [];
        setListings(farmerListings);
      } catch (error) {
        console.error('[v0] Error fetching farmer data:', error)
        // Set default values on error
        setStats({
          activeListings: 0,
          salesThisMonth: 0,
          messages: 0,
          rating: 0,
        });
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem('userRole')
    router.push('/')
  }

  const handleSwitchToDashboard = (role: 'farmer' | 'buyer') => {
    localStorage.setItem('userRole', role)
    router.push(`/dashboard/${role}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-background">
      <div className="bg-white border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-green-700 flex items-center gap-2">
                <Sprout className="w-6 h-6" />
                MazimaMarket Farmer
              </h1>
              <p className="text-sm text-muted-foreground">Welcome back, {userProfile?.name || 'Farmer'}!</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => handleSwitchToDashboard('buyer')}
                className="flex items-center gap-2 border-orange-300 hover:bg-orange-50"
              >
                <DollarSign className="w-4 h-4 text-orange-600" />
                Switch to Buyer
              </Button>
              <Button variant="outline" onClick={handleSignOut} className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 border-l-4 border-l-green-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Active Listings</p>
                <p className="text-3xl font-bold text-foreground mt-2">{stats?.activeListings || 0}</p>
              </div>
              <Plus className="w-6 h-6 text-green-500" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-orange-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Sales This Month</p>
                <p className="text-3xl font-bold text-foreground mt-2">{(stats?.salesThisMonth || 0).toLocaleString()}UGX</p>
              </div>
              <TrendingUp className="w-6 h-6 text-orange-500" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-blue-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Messages</p>
                <p className="text-3xl font-bold text-foreground mt-2">{stats?.messages || 0}</p>
              </div>
              <MessageSquare className="w-6 h-6 text-blue-500" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-purple-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Rating</p>
                <p className="text-3xl font-bold text-foreground mt-2">{stats?.rating}★</p>
              </div>
              <div className="w-6 h-6 text-purple-500">⭐</div>
            </div>
          </Card>
        </div>

        <div className="flex gap-2 mb-6 border-b border-input">
          {(['overview', 'listings', 'messages', 'settings'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'border-b-2 border-green-500 text-green-600'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'messages' && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6">Buyer Messages</h2>
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground mb-4">Respond to buyers interested in your produce</p>
              <Button 
                onClick={() => router.push('/chat')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Go to Messages
              </Button>
            </div>
          </Card>
        )}

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground text-center py-8">Recent activity will appear here</p>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Listing
                </Button>
                <Button variant="outline" className="w-full">
                  View Market Prices
                </Button>
                <Button variant="outline" className="w-full">
                  Messages
                </Button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'listings' && (
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Your Listings</h2>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Listing
              </Button>
            </div>
            <div className="space-y-3">
              {listings.length > 0 ? (
                listings.map((listing) => (
                  <div key={listing.id} className="flex items-center justify-between p-4 border border-input rounded-lg hover:bg-accent transition">
                    <div>
                      <p className="font-medium text-foreground">{listing.produceName}</p>
                      <p className="text-sm text-muted-foreground">{listing.availableQuantity} {listing.unit} @ {listing.pricePerKg}UGX/{listing.unit}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        listing.status === 'available' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {listing.status}
                      </span>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">No listings yet</p>
              )}
            </div>
          </Card>
        )}

        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Profile Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Farm Name</label>
                  <input type="text" defaultValue={userProfile?.name || ''} className="w-full mt-1 px-3 py-2 border border-input rounded-lg bg-background" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Location</label>
                  <input type="text" defaultValue={userProfile?.location || ''} className="w-full mt-1 px-3 py-2 border border-input rounded-lg bg-background" />
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Save Changes</Button>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Notifications</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-sm text-foreground">Email on new messages</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-sm text-foreground">Price alerts</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm text-foreground">Weekly market reports</span>
                </label>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
