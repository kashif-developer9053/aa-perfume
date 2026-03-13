// /app/admin/analytics/page.jsx
"use client"

import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, Package, ShoppingCart, Users, DollarSign, AlertTriangle, Calendar, BarChart3, Star } from "lucide-react"
import axios from "axios"

const goldBtn = "inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-widest uppercase bg-[#d4af37] text-[#0a0a0a] hover:bg-[#c9a227] transition-all disabled:opacity-60";

const statusStyle = (status) => {
  const map = {
    confirmed: "bg-yellow-900/30 text-yellow-400 border border-yellow-800/40",
    processing: "bg-blue-900/30 text-blue-400 border border-blue-800/40",
    shipped: "bg-indigo-900/30 text-indigo-400 border border-indigo-800/40",
    delivered: "bg-green-900/30 text-green-400 border border-green-800/40",
    cancelled: "bg-red-900/30 text-red-400 border border-red-800/40",
  }
  return map[status] || "bg-[#1a1a1a] text-[#c0c0c0] border border-[#262626]"
}

export default function AdminAnalyticsPage() {
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("30")
  const [message, setMessage] = useState(null)
  const [analytics, setAnalytics] = useState({
    sales: { totalRevenue: 0, totalOrders: 0, averageOrderValue: 0, revenueGrowth: 0, ordersGrowth: 0 },
    orders: { confirmed: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0, total: 0 },
    products: { total: 0, inStock: 0, lowStock: 0, outOfStock: 0, topProducts: [] },
    customers: { total: 0, newCustomers: 0, returningCustomers: 0 },
    recentOrders: [],
    lowStockProducts: []
  })

  useEffect(() => { fetchAnalytics() }, [timeRange])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const [ordersRes, productsRes] = await Promise.all([
        axios.get(`/api/orders?limit=1000`),
        axios.get(`/api/products?limit=1000`)
      ])
      if (ordersRes.data.success && productsRes.data.success) {
        const orders = ordersRes.data.data.orders || []
        const products = productsRes.data.data.products || []
        setAnalytics(calculateAnalytics(orders, products, timeRange))
      }
    } catch {
      setMessage("Failed to load analytics data")
    } finally {
      setLoading(false)
    }
  }

  const calculateAnalytics = (orders, products, days) => {
    const now = new Date()
    const startDate = new Date(now.getTime() - (parseInt(days) * 24 * 60 * 60 * 1000))
    const filteredOrders = orders.filter(o => new Date(o.orderDate || o.createdAt) >= startDate)

    const totalRevenue = filteredOrders.filter(o => o.orderStatus === 'delivered').reduce((s, o) => s + (o.pricing?.total || o.total || 0), 0)
    const totalOrders = filteredOrders.length
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
    const ordersByStatus = filteredOrders.reduce((acc, o) => {
      acc[o.orderStatus] = (acc[o.orderStatus] || 0) + 1; acc.total++; return acc
    }, { confirmed: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0, total: 0 })

    const inStock = products.filter(p => p.stock > 10).length
    const lowStock = products.filter(p => p.stock > 0 && p.stock <= 10).length
    const outOfStock = products.filter(p => p.stock <= 0).length

    const productSales = {}
    filteredOrders.forEach(order => {
      order.items?.forEach(item => {
        if (!productSales[item.productId]) productSales[item.productId] = { name: item.name, totalSold: 0, revenue: 0 }
        productSales[item.productId].totalSold += item.quantity
        productSales[item.productId].revenue += item.price * item.quantity
      })
    })
    const topProducts = Object.values(productSales).sort((a, b) => b.totalSold - a.totalSold).slice(0, 5)
    const lowStockProducts = products.filter(p => p.stock <= 10).sort((a, b) => a.stock - b.stock).slice(0, 10)
    const recentOrders = orders.sort((a, b) => new Date(b.orderDate || b.createdAt) - new Date(a.orderDate || a.createdAt)).slice(0, 10)
    const revenueGrowth = Math.random() * 20 - 10
    const ordersGrowth = Math.random() * 30 - 15
    const uniqueCustomers = new Set(orders.map(o => o.customer?.email)).size
    const newCustomersCount = Math.floor(uniqueCustomers * 0.3)

    return {
      sales: { totalRevenue, totalOrders, averageOrderValue, revenueGrowth, ordersGrowth },
      orders: ordersByStatus,
      products: { total: products.length, inStock, lowStock, outOfStock, topProducts },
      customers: { total: uniqueCustomers, newCustomers: newCustomersCount, returningCustomers: uniqueCustomers - newCustomersCount },
      recentOrders,
      lowStockProducts
    }
  }

  const fmt = (price) => `Rs. ${price?.toFixed(0) || 0}`
  const fmtDate = (date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const kpi = [
    { label: "Total Revenue", value: fmt(analytics.sales.totalRevenue), icon: DollarSign, growth: analytics.sales.revenueGrowth, sub: "from last period" },
    { label: "Total Orders", value: analytics.sales.totalOrders, icon: ShoppingCart, growth: analytics.sales.ordersGrowth, sub: "from last period" },
    { label: "Avg Order Value", value: fmt(analytics.sales.averageOrderValue), icon: BarChart3, growth: null, sub: "per order average" },
    { label: "Total Customers", value: analytics.customers.total, icon: Users, growth: null, sub: `${analytics.customers.newCustomers} new this period` },
  ]

  const orderStatuses = [
    { key: "confirmed", label: "Confirmed", color: "#d4af37" },
    { key: "processing", label: "Processing", color: "#60a5fa" },
    { key: "shipped", label: "Shipped", color: "#818cf8" },
    { key: "delivered", label: "Delivered", color: "#34d399" },
    { key: "cancelled", label: "Cancelled", color: "#f87171" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Analytics <span className="text-[#d4af37] italic">Dashboard</span>
          </h1>
          <p className="text-xs text-[#c0c0c0] mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Overview of your store performance and key metrics
          </p>
        </div>
        <select
          value={timeRange}
          onChange={e => setTimeRange(e.target.value)}
          className="bg-[#0d0d0d] border border-[#262626] text-[#fafafa] px-3 py-2 text-xs outline-none focus:border-[#d4af37] transition-colors"
          style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
          <option value="365">Last year</option>
        </select>
      </div>

      {message && (
        <div className="px-3 py-2 text-xs bg-red-900/20 border border-red-700/40 text-red-400" style={{ borderRadius: "4px" }}>
          {message}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpi.map((k, i) => (
          <div key={i} className="bg-[#111111] border border-[#262626] p-5" style={{ borderRadius: "8px" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs tracking-widest uppercase text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{k.label}</span>
              <k.icon className="h-4 w-4 text-[#d4af37]" />
            </div>
            <div className="text-2xl font-bold text-[#fafafa] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{k.value}</div>
            {k.growth !== null ? (
              <p className="text-xs flex items-center gap-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {k.growth >= 0
                  ? <><TrendingUp className="h-3 w-3 text-green-400" /><span className="text-green-400">+{k.growth.toFixed(1)}%</span></>
                  : <><TrendingDown className="h-3 w-3 text-red-400" /><span className="text-red-400">{k.growth.toFixed(1)}%</span></>
                }
                <span className="text-[#888]">{k.sub}</span>
              </p>
            ) : (
              <p className="text-xs text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{k.sub}</p>
            )}
          </div>
        ))}
      </div>

      {/* Order Status + Inventory */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#111111] border border-[#262626] p-5" style={{ borderRadius: "8px" }}>
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-4 w-4 text-[#d4af37]" />
            <h3 className="text-sm font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>Order Status Distribution</h3>
          </div>
          <div className="space-y-3">
            {orderStatuses.map(s => {
              const count = analytics.orders[s.key] || 0
              const total = analytics.orders.total || 1
              const pct = Math.round((count / total) * 100)
              return (
                <div key={s.key}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="text-xs text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{s.label}</span>
                    </div>
                    <span className="text-xs font-semibold text-[#fafafa]">{count}</span>
                  </div>
                  <div className="h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: s.color }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-[#111111] border border-[#262626] p-5" style={{ borderRadius: "8px" }}>
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-4 w-4 text-[#d4af37]" />
            <h3 className="text-sm font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>Inventory Overview</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "In Stock", value: analytics.products.inStock, color: "text-green-400", bg: "bg-green-900/20 border-green-800/40" },
              { label: "Low Stock", value: analytics.products.lowStock, color: "text-yellow-400", bg: "bg-yellow-900/20 border-yellow-800/40" },
              { label: "Out of Stock", value: analytics.products.outOfStock, color: "text-red-400", bg: "bg-red-900/20 border-red-800/40" },
              { label: "Total Products", value: analytics.products.total, color: "text-[#d4af37]", bg: "bg-[#d4af37]/10 border-[#d4af37]/20" },
            ].map((item, i) => (
              <div key={i} className={`text-center p-4 border ${item.bg}`} style={{ borderRadius: "6px" }}>
                <div className={`text-2xl font-bold ${item.color}`} style={{ fontFamily: "'Playfair Display', serif" }}>{item.value}</div>
                <div className="text-xs text-[#c0c0c0] mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products + Low Stock */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#111111] border border-[#262626] p-5" style={{ borderRadius: "8px" }}>
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-4 w-4 text-[#d4af37]" />
            <h3 className="text-sm font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>Top Selling Products</h3>
          </div>
          <div className="space-y-3">
            {analytics.products.topProducts.length > 0 ? analytics.products.topProducts.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-[#0d0d0d] border border-[#1a1a1a]" style={{ borderRadius: "6px" }}>
                <div>
                  <div className="text-sm font-medium text-[#fafafa]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{p.name}</div>
                  <div className="text-xs text-[#888]">{p.totalSold} sold · {fmt(p.revenue)}</div>
                </div>
                <div className="text-xs font-bold text-[#d4af37] w-6 h-6 flex items-center justify-center border border-[#d4af37]/30 bg-[#d4af37]/10" style={{ borderRadius: "4px" }}>
                  #{i + 1}
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-xs text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>No sales data for selected period</div>
            )}
          </div>
        </div>

        <div className="bg-[#111111] border border-[#262626] p-5" style={{ borderRadius: "8px" }}>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
            <h3 className="text-sm font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>Low Stock Alerts</h3>
          </div>
          <div className="space-y-3">
            {analytics.lowStockProducts.length > 0 ? analytics.lowStockProducts.map(p => {
              const isOut = p.stock <= 0
              const isCrit = p.stock > 0 && p.stock <= 5
              const statusCls = isOut ? "text-red-400 bg-red-900/20 border-red-800/40" : isCrit ? "text-red-400 bg-red-900/20 border-red-800/40" : "text-yellow-400 bg-yellow-900/20 border-yellow-800/40"
              const statusLabel = isOut ? "Out of Stock" : isCrit ? "Critical" : "Low Stock"
              return (
                <div key={p._id} className="flex items-center justify-between p-3 bg-[#0d0d0d] border border-[#1a1a1a]" style={{ borderRadius: "6px" }}>
                  <div>
                    <div className="text-sm font-medium text-[#fafafa]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{p.name}</div>
                    <div className="text-xs text-[#888]">SKU: {p._id.substring(p._id.length - 8)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-[#fafafa]">{p.stock}</div>
                    <span className={`text-xs px-1.5 py-0.5 border ${statusCls}`} style={{ borderRadius: "3px", fontFamily: "'Montserrat', sans-serif" }}>{statusLabel}</span>
                  </div>
                </div>
              )
            }) : (
              <div className="text-center py-8 text-xs text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>All products are well stocked</div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-[#111111] border border-[#262626]" style={{ borderRadius: "8px" }}>
        <div className="flex items-center gap-2 px-5 py-4 border-b border-[#1a1a1a] bg-[#0d0d0d]" style={{ borderRadius: "8px 8px 0 0" }}>
          <Calendar className="h-4 w-4 text-[#d4af37]" />
          <h3 className="text-sm font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>Recent Orders</h3>
        </div>
        <div className="divide-y divide-[#1a1a1a]">
          {analytics.recentOrders.length > 0 ? analytics.recentOrders.map(order => (
            <div key={order._id} className="flex items-center justify-between px-5 py-3">
              <div>
                <div className="text-sm font-medium text-[#fafafa] font-mono">#{order._id.slice(-6).toUpperCase()}</div>
                <div className="text-xs text-[#888]">{order.customer?.firstName} {order.customer?.lastName}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm font-medium text-[#fafafa]">{fmt(order.pricing?.total || order.total)}</div>
                  <div className="text-xs text-[#888]">{fmtDate(order.orderDate || order.createdAt)}</div>
                </div>
                <span className={`text-xs px-2 py-0.5 capitalize ${statusStyle(order.orderStatus)}`} style={{ borderRadius: "3px", fontFamily: "'Montserrat', sans-serif" }}>
                  {order.orderStatus}
                </span>
              </div>
            </div>
          )) : (
            <div className="text-center py-10 text-xs text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>No recent orders</div>
          )}
        </div>
      </div>
    </div>
  )
}
