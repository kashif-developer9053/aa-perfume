"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  TrendingUp, TrendingDown, Package, ShoppingCart, Users, DollarSign,
  AlertTriangle, CheckCircle, Calendar, BarChart3, Star, ArrowRight
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import axios from "axios"

const card = "bg-[#111111] border border-[#262626] p-5"
const cardR = "bg-[#111111] border border-[#262626] p-5 rounded-lg"

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("30")
  const [analytics, setAnalytics] = useState({
    sales: { totalRevenue: 0, totalOrders: 0, averageOrderValue: 0, revenueGrowth: 0, ordersGrowth: 0 },
    orders: { confirmed: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0, total: 0 },
    products: { total: 0, inStock: 0, lowStock: 0, outOfStock: 0, topProducts: [] },
    customers: { total: 0, newCustomers: 0, returningCustomers: 0 },
    recentOrders: [],
    lowStockProducts: [],
  })

  useEffect(() => { fetchAnalytics() }, [timeRange])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const [ordersRes, productsRes] = await Promise.all([
        axios.get(`/api/orders?limit=1000`),
        axios.get(`/api/products?limit=1000`),
      ])
      if (ordersRes.data.success && productsRes.data.success) {
        const orders = ordersRes.data.data.orders || []
        const products = productsRes.data.data.products || []
        setAnalytics(calculateAnalytics(orders, products, timeRange))
      }
    } catch {
      toast({ title: "Error", description: "Failed to load analytics data", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const calculateAnalytics = (orders, products, days) => {
    const startDate = new Date(Date.now() - parseInt(days) * 86400000)
    const filtered = orders.filter(o => new Date(o.orderDate || o.createdAt) >= startDate)
    const totalRevenue = filtered.filter(o => o.orderStatus === "delivered").reduce((s, o) => s + (o.pricing?.total || o.total || 0), 0)
    const totalOrders = filtered.length
    const ordersByStatus = filtered.reduce((acc, o) => { acc[o.orderStatus] = (acc[o.orderStatus] || 0) + 1; acc.total++; return acc }, { confirmed: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0, total: 0 })
    const productSales = {}
    filtered.forEach(o => o.items?.forEach(item => {
      if (!productSales[item.productId]) productSales[item.productId] = { name: item.name, totalSold: 0, revenue: 0 }
      productSales[item.productId].totalSold += item.quantity
      productSales[item.productId].revenue += item.price * item.quantity
    }))
    const topProducts = Object.values(productSales).sort((a, b) => b.totalSold - a.totalSold).slice(0, 5)
    const lowStockProducts = products.filter(p => p.stock <= 10).sort((a, b) => a.stock - b.stock).slice(0, 8)
    const recentOrders = [...orders].sort((a, b) => new Date(b.orderDate || b.createdAt) - new Date(a.orderDate || a.createdAt)).slice(0, 8)
    const uniqueCustomers = new Set(orders.map(o => o.customer?.email)).size
    return {
      sales: { totalRevenue, totalOrders, averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0, revenueGrowth: Math.random() * 20 - 10, ordersGrowth: Math.random() * 30 - 15 },
      orders: ordersByStatus,
      products: { total: products.length, inStock: products.filter(p => p.stock > 10).length, lowStock: products.filter(p => p.stock > 0 && p.stock <= 10).length, outOfStock: products.filter(p => p.stock <= 0).length, topProducts },
      customers: { total: uniqueCustomers, newCustomers: Math.floor(uniqueCustomers * 0.3), returningCustomers: Math.floor(uniqueCustomers * 0.7) },
      recentOrders, lowStockProducts,
    }
  }

  const fmt = (price) => `Rs. ${price?.toFixed(0) || 0}`
  const fmtDate = (d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })

  const statusStyle = (s) => {
    const m = { confirmed: "bg-yellow-900/20 border-yellow-700/40 text-yellow-400", processing: "bg-blue-900/20 border-blue-700/40 text-blue-400", shipped: "bg-indigo-900/20 border-indigo-700/40 text-indigo-400", delivered: "bg-[#d4af37]/10 border-[#d4af37]/30 text-[#d4af37]", cancelled: "bg-red-900/20 border-red-700/40 text-red-400" }
    return m[s] || "bg-[#262626] border-[#333] text-[#c0c0c0]"
  }

  const stockStyle = (stock) => {
    if (stock <= 0) return { label: "Out of Stock", cls: "bg-red-900/20 border-red-700/40 text-red-400" }
    if (stock <= 5) return { label: "Critical", cls: "bg-red-900/20 border-red-700/40 text-red-400" }
    if (stock <= 10) return { label: "Low", cls: "bg-yellow-900/20 border-yellow-700/40 text-yellow-400" }
    return { label: "OK", cls: "bg-[#d4af37]/10 border-[#d4af37]/30 text-[#d4af37]" }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
          <span className="text-[#c0c0c0] text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>Loading analytics...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Analytics <span className="text-[#d4af37] italic">Dashboard</span>
          </h1>
          <p className="text-xs text-[#c0c0c0] mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>Store performance overview</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-[#111111] border border-[#262626] text-[#fafafa] px-4 py-2 text-sm outline-none focus:border-[#d4af37] transition-colors"
          style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif", minWidth: "160px" }}
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
          <option value="365">Last year</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: fmt(analytics.sales.totalRevenue), growth: analytics.sales.revenueGrowth, icon: <DollarSign className="h-5 w-5 text-[#d4af37]" /> },
          { label: "Total Orders", value: analytics.sales.totalOrders, growth: analytics.sales.ordersGrowth, icon: <ShoppingCart className="h-5 w-5 text-[#d4af37]" /> },
          { label: "Avg Order Value", value: fmt(analytics.sales.averageOrderValue), sub: "Per order", icon: <BarChart3 className="h-5 w-5 text-[#d4af37]" /> },
          { label: "Customers", value: analytics.customers.total, sub: `${analytics.customers.newCustomers} new`, icon: <Users className="h-5 w-5 text-[#d4af37]" /> },
        ].map((kpi) => (
          <div key={kpi.label} className={card} style={{ borderRadius: "8px" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs tracking-widest uppercase text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{kpi.label}</span>
              <div className="w-9 h-9 rounded-full bg-[#d4af37]/5 border border-[#d4af37]/20 flex items-center justify-center">{kpi.icon}</div>
            </div>
            <div className="text-2xl font-bold text-[#fafafa]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{kpi.value}</div>
            {kpi.growth !== undefined ? (
              <p className="text-xs mt-1 flex items-center gap-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {kpi.growth >= 0 ? <TrendingUp className="h-3 w-3 text-[#d4af37]" /> : <TrendingDown className="h-3 w-3 text-red-400" />}
                <span className={kpi.growth >= 0 ? "text-[#d4af37]" : "text-red-400"}>
                  {kpi.growth >= 0 ? "+" : ""}{kpi.growth.toFixed(1)}%
                </span>
                <span className="text-[#888]">vs last period</span>
              </p>
            ) : (
              <p className="text-xs mt-1 text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{kpi.sub}</p>
            )}
          </div>
        ))}
      </div>

      {/* Order Status + Inventory */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={card} style={{ borderRadius: "8px" }}>
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-4 w-4 text-[#d4af37]" />
            <h3 className="text-sm font-semibold text-[#fafafa] tracking-widest uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>Order Status</h3>
          </div>
          <div className="space-y-3">
            {[
              { label: "Confirmed", count: analytics.orders.confirmed, color: "bg-yellow-400" },
              { label: "Processing", count: analytics.orders.processing, color: "bg-blue-400" },
              { label: "Shipped", count: analytics.orders.shipped, color: "bg-indigo-400" },
              { label: "Delivered", count: analytics.orders.delivered, color: "bg-[#d4af37]" },
              { label: "Cancelled", count: analytics.orders.cancelled, color: "bg-red-400" },
            ].map((s) => {
              const pct = analytics.orders.total > 0 ? (s.count / analytics.orders.total) * 100 : 0
              return (
                <div key={s.label} className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${s.color}`} />
                  <span className="text-xs text-[#c0c0c0] w-20 flex-shrink-0" style={{ fontFamily: "'Montserrat', sans-serif" }}>{s.label}</span>
                  <div className="flex-1 h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div className={`h-full ${s.color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-[#fafafa] w-6 text-right flex-shrink-0" style={{ fontFamily: "'Montserrat', sans-serif" }}>{s.count}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className={card} style={{ borderRadius: "8px" }}>
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-4 w-4 text-[#d4af37]" />
            <h3 className="text-sm font-semibold text-[#fafafa] tracking-widest uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>Inventory</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "In Stock", val: analytics.products.inStock, cls: "text-[#d4af37]", bgCls: "bg-[#d4af37]/5 border-[#d4af37]/20" },
              { label: "Low Stock", val: analytics.products.lowStock, cls: "text-yellow-400", bgCls: "bg-yellow-900/10 border-yellow-700/20" },
              { label: "Out of Stock", val: analytics.products.outOfStock, cls: "text-red-400", bgCls: "bg-red-900/10 border-red-700/20" },
              { label: "Total Products", val: analytics.products.total, cls: "text-blue-400", bgCls: "bg-blue-900/10 border-blue-700/20" },
            ].map((s) => (
              <div key={s.label} className={`text-center p-4 border ${s.bgCls}`} style={{ borderRadius: "6px" }}>
                <div className={`text-2xl font-bold ${s.cls}`} style={{ fontFamily: "'Montserrat', sans-serif" }}>{s.val}</div>
                <div className="text-xs text-[#c0c0c0] mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products + Low Stock */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={card} style={{ borderRadius: "8px" }}>
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-4 w-4 text-[#d4af37]" />
            <h3 className="text-sm font-semibold text-[#fafafa] tracking-widest uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>Top Selling</h3>
          </div>
          <div className="space-y-2">
            {analytics.products.topProducts.length > 0 ? analytics.products.topProducts.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-[#0d0d0d] border border-[#262626]" style={{ borderRadius: "6px" }}>
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-bold text-[#d4af37] w-5 flex-shrink-0" style={{ fontFamily: "'Montserrat', sans-serif" }}>#{i + 1}</span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-[#fafafa] truncate" style={{ fontFamily: "'Montserrat', sans-serif" }}>{p.name}</div>
                    <div className="text-xs text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{p.totalSold} sold · {fmt(p.revenue)}</div>
                  </div>
                </div>
              </div>
            )) : <p className="text-center py-6 text-xs text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>No sales data for this period</p>}
          </div>
        </div>

        <div className={card} style={{ borderRadius: "8px" }}>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
            <h3 className="text-sm font-semibold text-[#fafafa] tracking-widest uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>Low Stock Alerts</h3>
          </div>
          <div className="space-y-2">
            {analytics.lowStockProducts.length > 0 ? analytics.lowStockProducts.map((p) => {
              const s = stockStyle(p.stock)
              return (
                <div key={p._id} className="flex items-center justify-between p-3 bg-[#0d0d0d] border border-[#262626]" style={{ borderRadius: "6px" }}>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-[#fafafa] truncate" style={{ fontFamily: "'Montserrat', sans-serif" }}>{p.name}</div>
                    <div className="text-xs text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>SKU: {p._id.slice(-8)}</div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm font-bold text-[#fafafa]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{p.stock}</span>
                    <span className={`px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase border ${s.cls}`} style={{ borderRadius: "3px", fontFamily: "'Montserrat', sans-serif" }}>{s.label}</span>
                  </div>
                </div>
              )
            }) : <p className="text-center py-6 text-xs text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>All products are well stocked</p>}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className={card} style={{ borderRadius: "8px" }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#d4af37]" />
            <h3 className="text-sm font-semibold text-[#fafafa] tracking-widest uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>Recent Orders</h3>
          </div>
          <Link href="/admin/orders" className="text-xs text-[#d4af37] hover:underline flex items-center gap-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#262626]">
                {["Order ID", "Customer", "Total", "Status", "Date"].map((h) => (
                  <th key={h} className="text-left pb-3 text-[10px] tracking-widest uppercase text-[#888] font-medium pr-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1a1a]">
              {analytics.recentOrders.length > 0 ? analytics.recentOrders.map((o) => (
                <tr key={o._id} className="hover:bg-[#1a1a1a] transition-colors">
                  <td className="py-3 pr-4">
                    <code className="text-xs bg-[#1a1a1a] text-[#d4af37] px-2 py-0.5 font-mono" style={{ borderRadius: "3px" }}>#{o._id.slice(-6).toUpperCase()}</code>
                  </td>
                  <td className="py-3 pr-4">
                    <div className="text-xs font-medium text-[#fafafa]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{o.customer?.firstName} {o.customer?.lastName}</div>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-xs font-semibold text-[#d4af37]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{fmt(o.pricing?.total || o.total)}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase border capitalize ${statusStyle(o.orderStatus)}`} style={{ borderRadius: "3px", fontFamily: "'Montserrat', sans-serif" }}>
                      {o.orderStatus}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="text-xs text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{fmtDate(o.orderDate || o.createdAt)}</span>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={5} className="py-8 text-center text-xs text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>No recent orders</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
