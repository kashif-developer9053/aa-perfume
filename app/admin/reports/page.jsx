"use client"

import { useState } from "react"
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Download, TrendingUp, DollarSign, ShoppingBag, Users, ArrowUpRight, ArrowDownRight } from "lucide-react"

const goldBtn = "inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-widest uppercase bg-[#d4af37] text-[#0a0a0a] hover:bg-[#c9a227] transition-all"
const outlineBtn = "inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-widest uppercase border border-[#262626] text-[#c0c0c0] hover:border-[#d4af37] hover:text-[#d4af37] transition-all"

const CHART_COLORS = ["#d4af37", "#60a5fa", "#34d399", "#f87171", "#818cf8"]

const chartTheme = {
  background: "transparent",
  grid: "#1a1a1a",
  axis: "#555",
  tooltip: { bg: "#111111", border: "#262626", text: "#fafafa" }
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#111111] border border-[#262626] px-3 py-2" style={{ borderRadius: "6px" }}>
      <p className="text-xs text-[#d4af37] mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-xs text-[#fafafa]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {entry.name}: <span style={{ color: entry.color }}>{typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}</span>
        </p>
      ))}
    </div>
  )
}

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("month")
  const [reportType, setReportType] = useState("sales")
  const [notice, setNotice] = useState(null)

  const salesData = [
    { name: "Jan", total: 4500 }, { name: "Feb", total: 3800 }, { name: "Mar", total: 5200 },
    { name: "Apr", total: 4900 }, { name: "May", total: 6500 }, { name: "Jun", total: 5800 },
    { name: "Jul", total: 7200 }, { name: "Aug", total: 8100 }, { name: "Sep", total: 7400 },
    { name: "Oct", total: 8700 }, { name: "Nov", total: 9600 }, { name: "Dec", total: 11200 },
  ]

  const categoryData = [
    { name: "Eau de Parfum", value: 35 }, { name: "Eau de Toilette", value: 25 },
    { name: "Perfume Oil", value: 20 }, { name: "Gift Sets", value: 10 }, { name: "Accessories", value: 10 },
  ]

  const topProducts = [
    { name: "Oud Royale", sales: 124, revenue: 16119.76 },
    { name: "Rose Intense", sales: 98, revenue: 19599.02 },
    { name: "Amber Noir", sales: 87, revenue: 7829.13 },
    { name: "Jasmine Dreams", sales: 65, revenue: 5849.35 },
    { name: "Musk Elixir", sales: 42, revenue: 16799.58 },
  ]

  const customerData = [
    { name: "Jan", new: 120, returning: 80 }, { name: "Feb", new: 110, returning: 85 },
    { name: "Mar", new: 130, returning: 90 }, { name: "Apr", new: 140, returning: 95 },
    { name: "May", new: 150, returning: 100 }, { name: "Jun", new: 160, returning: 110 },
    { name: "Jul", new: 170, returning: 120 }, { name: "Aug", new: 180, returning: 130 },
    { name: "Sep", new: 190, returning: 140 }, { name: "Oct", new: 200, returning: 150 },
    { name: "Nov", new: 210, returning: 160 }, { name: "Dec", new: 220, returning: 170 },
  ]

  const downloadReport = () => {
    setNotice(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report download initiated`)
    setTimeout(() => setNotice(null), 3000)
  }

  const TABS = [
    { id: "week", label: "Week" }, { id: "month", label: "Month" },
    { id: "quarter", label: "Quarter" }, { id: "year", label: "Year" }
  ]

  const REPORT_TYPES = [
    { id: "sales", label: "Sales Report" }, { id: "products", label: "Product Report" }, { id: "customers", label: "Customer Report" }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Reports <span className="text-[#d4af37] italic">&amp; Analytics</span>
          </h1>
          <p className="text-xs text-[#c0c0c0] mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>View detailed reports and analytics for your store</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={reportType}
            onChange={e => setReportType(e.target.value)}
            className="bg-[#0d0d0d] border border-[#262626] text-[#fafafa] px-3 py-2.5 text-xs outline-none focus:border-[#d4af37] transition-colors"
            style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}
          >
            {REPORT_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
          <button onClick={downloadReport} className={outlineBtn} style={{ borderRadius: "4px" }}>
            <Download className="h-3.5 w-3.5" /> Export
          </button>
        </div>
      </div>

      {notice && (
        <div className="px-3 py-2 text-xs bg-green-900/20 border border-green-700/40 text-green-400" style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}>
          {notice}
        </div>
      )}

      {/* Time Range Tabs */}
      <div className="flex gap-1 border-b border-[#262626]">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setTimeRange(tab.id)}
            className={`px-4 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all ${timeRange === tab.id ? "text-[#d4af37] border-b-2 border-[#d4af37] -mb-px" : "text-[#888] hover:text-[#c0c0c0]"}`}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Sales Report */}
      {reportType === "sales" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Revenue", value: "Rs. 75,648", icon: DollarSign, growth: 12.5, up: true },
              { label: "Orders", value: "1,342", icon: ShoppingBag, growth: 8.2, up: true },
              { label: "Customers", value: "3,721", icon: Users, growth: 5.3, up: true },
              { label: "Conversion Rate", value: "3.2%", icon: TrendingUp, growth: 0.5, up: false },
            ].map((card, i) => (
              <div key={i} className="bg-[#111111] border border-[#262626] p-5" style={{ borderRadius: "8px" }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs tracking-widest uppercase text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{card.label}</span>
                  <card.icon className="h-4 w-4 text-[#d4af37]" />
                </div>
                <div className="text-2xl font-bold text-[#fafafa] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{card.value}</div>
                <div className="flex items-center gap-1 text-xs" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {card.up
                    ? <><ArrowUpRight className="h-3 w-3 text-green-400" /><span className="text-green-400">+{card.growth}%</span></>
                    : <><ArrowDownRight className="h-3 w-3 text-red-400" /><span className="text-red-400">-{card.growth}%</span></>
                  }
                  <span className="text-[#888]">from last {timeRange}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
            <div className="lg:col-span-4 bg-[#111111] border border-[#262626] p-5" style={{ borderRadius: "8px" }}>
              <h3 className="text-sm font-bold text-[#fafafa] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Revenue Over Time</h3>
              <p className="text-xs text-[#888] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Monthly revenue for the current year</p>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
                    <XAxis dataKey="name" tick={{ fill: chartTheme.axis, fontSize: 11 }} axisLine={{ stroke: chartTheme.grid }} />
                    <YAxis tick={{ fill: chartTheme.axis, fontSize: 11 }} axisLine={{ stroke: chartTheme.grid }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ color: "#a1a1a1", fontSize: 11 }} />
                    <Bar dataKey="total" name="Revenue" fill="#d4af37" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="lg:col-span-3 bg-[#111111] border border-[#262626] p-5" style={{ borderRadius: "8px" }}>
              <h3 className="text-sm font-bold text-[#fafafa] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Sales by Category</h3>
              <p className="text-xs text-[#888] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Distribution across product categories</p>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} outerRadius={80} dataKey="value">
                      {categoryData.map((_, i) => <Cell key={`cell-${i}`} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ color: "#a1a1a1", fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-[#111111] border border-[#262626]" style={{ borderRadius: "8px" }}>
            <div className="px-5 py-4 border-b border-[#1a1a1a] bg-[#0d0d0d]" style={{ borderRadius: "8px 8px 0 0" }}>
              <h3 className="text-sm font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>Top Selling Products</h3>
              <p className="text-xs text-[#888] mt-0.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>Products with highest sales volume and revenue</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1a1a1a]">
                    <th className="text-left px-5 py-3 text-xs tracking-widest uppercase text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Product</th>
                    <th className="text-right px-5 py-3 text-xs tracking-widest uppercase text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Units Sold</th>
                    <th className="text-right px-5 py-3 text-xs tracking-widest uppercase text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1a1a1a]">
                  {topProducts.map((p, i) => (
                    <tr key={i} className="hover:bg-[#0d0d0d]/50 transition-colors">
                      <td className="px-5 py-3 text-sm text-[#fafafa]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{p.name}</td>
                      <td className="px-5 py-3 text-sm text-[#fafafa] text-right">{p.sales}</td>
                      <td className="px-5 py-3 text-sm text-[#d4af37] text-right">Rs. {p.revenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Products Report */}
      {reportType === "products" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-3 bg-[#111111] border border-[#262626] p-5" style={{ borderRadius: "8px" }}>
            <h3 className="text-sm font-bold text-[#fafafa] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Product Performance</h3>
            <p className="text-xs text-[#888] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Sales performance of top products over time</p>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
                  <XAxis dataKey="name" tick={{ fill: chartTheme.axis, fontSize: 11 }} />
                  <YAxis tick={{ fill: chartTheme.axis, fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ color: "#a1a1a1", fontSize: 11 }} />
                  <Line type="monotone" dataKey="total" name="Sales" stroke="#d4af37" strokeWidth={2} dot={{ fill: "#d4af37", strokeWidth: 0, r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-2 bg-[#111111] border border-[#262626]" style={{ borderRadius: "8px" }}>
            <div className="px-5 py-4 border-b border-[#1a1a1a] bg-[#0d0d0d]" style={{ borderRadius: "8px 8px 0 0" }}>
              <h3 className="text-sm font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>Inventory Status</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1a1a1a]">
                    {["Product", "In Stock", "Threshold", "Status"].map(h => (
                      <th key={h} className="px-4 py-3 text-xs tracking-widest uppercase text-[#c0c0c0] text-left last:text-right" style={{ fontFamily: "'Montserrat', sans-serif" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1a1a1a]">
                  {[
                    { name: "Oud Royale", stock: 45, threshold: 20, status: "Good", cls: "text-green-400" },
                    { name: "Rose Intense", stock: 12, threshold: 15, status: "Low", cls: "text-yellow-400" },
                    { name: "Musk Elixir", stock: 5, threshold: 10, status: "Critical", cls: "text-red-400" },
                    { name: "Amber Noir", stock: 56, threshold: 25, status: "Good", cls: "text-green-400" },
                    { name: "Jasmine Dreams", stock: 8, threshold: 12, status: "Low", cls: "text-yellow-400" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-[#0d0d0d]/50 transition-colors">
                      <td className="px-4 py-3 text-sm text-[#fafafa]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{row.name}</td>
                      <td className="px-4 py-3 text-sm text-[#fafafa] text-right">{row.stock}</td>
                      <td className="px-4 py-3 text-sm text-[#c0c0c0] text-right">{row.threshold}</td>
                      <td className={`px-4 py-3 text-sm text-right font-semibold ${row.cls}`}>{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#111111] border border-[#262626] p-5" style={{ borderRadius: "8px" }}>
            <h3 className="text-sm font-bold text-[#fafafa] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Product Categories</h3>
            <p className="text-xs text-[#888] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Distribution by category</p>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} outerRadius={80} dataKey="value">
                    {categoryData.map((_, i) => <Cell key={`cell-${i}`} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ color: "#a1a1a1", fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Customers Report */}
      {reportType === "customers" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Customers", value: "3,721", growth: 5.3, up: true },
              { label: "New Customers", value: "1,245", growth: 8.2, up: true },
              { label: "Returning Customers", value: "2,476", growth: 3.1, up: true },
              { label: "Avg Order Value", value: "Rs. 56.37", growth: 2.3, up: true },
            ].map((card, i) => (
              <div key={i} className="bg-[#111111] border border-[#262626] p-5" style={{ borderRadius: "8px" }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs tracking-widest uppercase text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{card.label}</span>
                  <Users className="h-4 w-4 text-[#d4af37]" />
                </div>
                <div className="text-2xl font-bold text-[#fafafa] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{card.value}</div>
                <div className="flex items-center gap-1 text-xs" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  <ArrowUpRight className="h-3 w-3 text-green-400" />
                  <span className="text-green-400">+{card.growth}%</span>
                  <span className="text-[#888]">from last {timeRange}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#111111] border border-[#262626] p-5" style={{ borderRadius: "8px" }}>
            <h3 className="text-sm font-bold text-[#fafafa] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Customer Acquisition</h3>
            <p className="text-xs text-[#888] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>New vs. returning customers over time</p>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={customerData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
                  <XAxis dataKey="name" tick={{ fill: chartTheme.axis, fontSize: 11 }} />
                  <YAxis tick={{ fill: chartTheme.axis, fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ color: "#a1a1a1", fontSize: 11 }} />
                  <Bar dataKey="new" name="New Customers" fill="#d4af37" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="returning" name="Returning Customers" fill="#60a5fa" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#111111] border border-[#262626] p-5" style={{ borderRadius: "8px" }}>
              <h3 className="text-sm font-bold text-[#fafafa] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Customer Demographics</h3>
              <p className="text-xs text-[#888] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Age distribution of customers</p>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={[{ name: "18-24", value: 15 }, { name: "25-34", value: 35 }, { name: "35-44", value: 25 }, { name: "45-54", value: 15 }, { name: "55+", value: 10 }]} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} outerRadius={80} dataKey="value">
                      {[0,1,2,3,4].map(i => <Cell key={`cell-${i}`} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ color: "#a1a1a1", fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[#111111] border border-[#262626]" style={{ borderRadius: "8px" }}>
              <div className="px-5 py-4 border-b border-[#1a1a1a] bg-[#0d0d0d]" style={{ borderRadius: "8px 8px 0 0" }}>
                <h3 className="text-sm font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>Geographic Distribution</h3>
                <p className="text-xs text-[#888] mt-0.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>Top regions by customer count</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#1a1a1a]">
                      <th className="px-5 py-3 text-xs tracking-widest uppercase text-[#c0c0c0] text-left" style={{ fontFamily: "'Montserrat', sans-serif" }}>Region</th>
                      <th className="px-5 py-3 text-xs tracking-widest uppercase text-[#c0c0c0] text-right" style={{ fontFamily: "'Montserrat', sans-serif" }}>Customers</th>
                      <th className="px-5 py-3 text-xs tracking-widest uppercase text-[#c0c0c0] text-right" style={{ fontFamily: "'Montserrat', sans-serif" }}>%</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1a1a1a]">
                    {[
                      { region: "Karachi", customers: 845, pct: "22.7%" },
                      { region: "Lahore", customers: 645, pct: "17.3%" },
                      { region: "Islamabad", customers: 520, pct: "14.0%" },
                      { region: "Rawalpindi", customers: 410, pct: "11.0%" },
                      { region: "Faisalabad", customers: 325, pct: "8.7%" },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-[#0d0d0d]/50 transition-colors">
                        <td className="px-5 py-3 text-sm text-[#fafafa]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{row.region}</td>
                        <td className="px-5 py-3 text-sm text-[#fafafa] text-right">{row.customers}</td>
                        <td className="px-5 py-3 text-sm text-[#d4af37] text-right">{row.pct}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
