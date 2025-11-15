'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LogOut, ShoppingCart, TrendingDown, Users, AlertCircle, Loader2, MessageSquare, Sprout, DollarSign, Twitch as SwitchCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { trpcClient } from '@/src/lib/trpc'
import type { User, Order } from '@/src/db/schemas'

interface BuyerStatsData {
  activeOrders: number
  totalSpend: number
  verifiedSuppliers: number
  supplyRate: number
}

interface RecentPurchase {
  order: Order
  listing: any
  farmer: User
}

export default function BuyerDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'suppliers' | 'messages' | 'settings'>('overview')
  const [userProfile, setUserProfile] = useState<User | null>(null)
  const [stats, setStats] = useState<BuyerStatsData | null>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [recentPurchases, setRecentPurchases] = useState<RecentPurchase[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const userId = localStorage.getItem('userId');
        
        const profile = userId ? await trpcClient.user.getById.query(userId) : null;
        setUserProfile(profile);

        const buyerStats = userId ? await trpcClient.user.getBuyerStats.query(userId) : null;
        setStats(buyerStats);

        const buyerOrders = userId ? await trpcClient.order.getBuyerOrders.query(userId) : [];
        setOrders(buyerOrders);

        const recent = userId ? await trpcClient.order.getRecentPurchases.query(userId) : [];
        setRecentPurchases(recent);
      } catch (error) {
        console.error('[v0] Error fetching buyer data:', error)
        // Set default values on error
        setStats({
          activeOrders: 0,
          totalSpend: 0,
          verifiedSuppliers: 0,
          supplyRate: 0,
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
        <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-background">
      <div className="bg-white border-b border-orange-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-orange-700 flex items-center gap-2">
                <DollarSign className="w-6 h-6" />
                MazimaMarket Buyer
              </h1>
              <p className="text-sm text-muted-foreground">Welcome back, {userProfile?.name || 'Buyer'}!</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => handleSwitchToDashboard('farmer')}
                className="flex items-center gap-2 border-green-300 hover:bg-green-50"
              >
                <Sprout className="w-4 h-4 text-green-600" />
                Switch to Farmer
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
          <Card className="p-6 border-l-4 border-l-orange-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Active Orders</p>
                <p className="text-3xl font-bold text-foreground mt-2">{stats?.activeOrders || 0}</p>
              </div>
              <ShoppingCart className="w-6 h-6 text-orange-500" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-green-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Verified Suppliers</p>
                <p className="text-3xl font-bold text-foreground mt-2">{stats?.verifiedSuppliers || 0}</p>
              </div>
              <Users className="w-6 h-6 text-green-500" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-blue-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Spend</p>
                <p className="text-3xl font-bold text-foreground mt-2">{(stats?.totalSpend || 0).toLocaleString()}UGX</p>
              </div>
              <TrendingDown className="w-6 h-6 text-blue-500" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-purple-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Supply Rate</p>
                <p className="text-3xl font-bold text-foreground mt-2">{stats?.supplyRate || 0}%</p>
              </div>
              <AlertCircle className="w-6 h-6 text-purple-500" />
            </div>
          </Card>
        </div>

        <div className="flex gap-2 mb-6 border-b border-input">
          {(['overview', 'orders', 'suppliers', 'messages', 'settings'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'border-b-2 border-orange-500 text-orange-600'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Purchases</h2>
              <div className="space-y-4">
                {recentPurchases.length > 0 ? (
                  recentPurchases.map((purchase) => (
                    <div key={purchase.order.id} className="flex items-start gap-4 pb-4 border-b border-input last:border-0">
                      <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <ShoppingCart className="w-6 h-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{purchase.listing.produceName} ({purchase.order.quantity} {purchase.listing.unit})</p>
                        <p className="text-sm text-muted-foreground">from {purchase.farmer.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{new Date(purchase.order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span className="text-orange-600 font-semibold">{purchase.order.totalPrice.toLocaleString()}UGX</span>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-8">No purchases yet</p>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Place New Order
                </Button>
                <Button variant="outline" className="w-full">
                  Browse Suppliers
                </Button>
                <Button variant="outline" className="w-full">
                  View Market Prices
                </Button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'messages' && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6">Your Messages</h2>
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground mb-4">View and manage your conversations with farmers</p>
              <Button 
                onClick={() => router.push('/chat')}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                Go to Messages
              </Button>
            </div>
          </Card>
        )}

        {activeTab === 'orders' && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6">Your Orders</h2>
            <div className="space-y-3">
              {orders.length > 0 ? (
                orders.map((orderData) => (
                  <div key={orderData.order.id} className="flex items-center justify-between p-4 border border-input rounded-lg hover:bg-accent transition">
                    <div>
                      <p className="font-medium text-foreground">#{orderData.order.id}</p>
                      <p className="text-sm text-muted-foreground">{orderData.listing.produceName} ({orderData.order.quantity} {orderData.listing.unit}) from {orderData.farmer.name}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div>
                        <p className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          orderData.order.status === 'delivered'
                            ? 'bg-green-100 text-green-700'
                            : orderData.order.status === 'shipped'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {orderData.order.status}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">No orders yet</p>
              )}
            </div>
          </Card>
        )}

        {activeTab === 'suppliers' && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6">Your Suppliers</h2>
            <div className="space-y-3">
              {[
                { name: 'Masaka Farmers Co-op', products: 'Maize, Beans, Cassava', rating: '4.8★', status: 'Active' },
                { name: 'Sunrise Farm', products: 'Tomatoes, Cabbage, Onions', rating: '4.6★', status: 'Active' },
                { name: 'Rwenzori Estate', products: 'Coffee, Tea', rating: '4.9★', status: 'Active' },
              ].map((supplier, i) => (
                <div key={i} className="flex items-start justify-between p-4 border border-input rounded-lg hover:bg-accent transition">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{supplier.name}</p>
                    <p className="text-sm text-muted-foreground">{supplier.products}</p>
                    <p className="text-sm text-yellow-600 mt-1">{supplier.rating}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      {supplier.status}
                    </span>
                    <Button variant="ghost" size="sm">Contact</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Company Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Company Name</label>
                  <input type="text" defaultValue={userProfile?.name || ''} className="w-full mt-1 px-3 py-2 border border-input rounded-lg bg-background" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Location</label>
                  <input type="text" defaultValue={userProfile?.location || ''} className="w-full mt-1 px-3 py-2 border border-input rounded-lg bg-background" />
                </div>
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">Save Changes</Button>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Preferences</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-sm text-foreground">Order confirmation emails</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-sm text-foreground">New supplier alerts</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm text-foreground">Weekly analytics reports</span>
                </label>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
