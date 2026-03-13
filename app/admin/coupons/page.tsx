"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, ArrowUpDown, ChevronLeft, ChevronRight, Tag, Calendar, Copy, CheckCircle, Layers, Percent, X } from "lucide-react"

const inputCls = "w-full bg-[#0d0d0d] border border-[#262626] text-[#fafafa] px-3 py-2.5 text-sm outline-none focus:border-[#d4af37] transition-colors placeholder-[#666]"
const labelCls = "text-xs tracking-widest uppercase text-[#c0c0c0] block mb-1.5"
const goldBtn = "inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-widest uppercase bg-[#d4af37] text-[#0a0a0a] hover:bg-[#c9a227] transition-all disabled:opacity-60"
const outlineBtn = "inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-widest uppercase border border-[#262626] text-[#c0c0c0] hover:border-[#d4af37] hover:text-[#d4af37] transition-all"
const dangerBtn = "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold tracking-widest uppercase border border-red-900/50 text-red-400 hover:bg-red-900/10 transition-all"

const statusStyle = (status: string) => {
  if (status === "active") return "bg-green-900/30 text-green-400 border border-green-800/40"
  if (status === "scheduled") return "bg-blue-900/30 text-blue-400 border border-blue-800/40"
  if (status === "expired") return "bg-[#1a1a1a] text-[#888] border border-[#262626]"
  return "bg-[#1a1a1a] text-[#c0c0c0] border border-[#262626]"
}

const typeStyle = (type: string) => {
  const map: Record<string, string> = {
    percentage: "bg-yellow-900/30 text-yellow-400 border border-yellow-800/40",
    fixed: "bg-indigo-900/30 text-indigo-400 border border-indigo-800/40",
    free_shipping: "bg-teal-900/30 text-teal-400 border border-teal-800/40",
    buy_x_get_y: "bg-purple-900/30 text-purple-400 border border-purple-800/40",
  }
  return map[type] || "bg-[#1a1a1a] text-[#c0c0c0] border border-[#262626]"
}

const TYPE_LABELS: Record<string, string> = {
  percentage: "Percentage", fixed: "Fixed Amount",
  free_shipping: "Free Shipping", buy_x_get_y: "Buy X Get Y"
}

const EMPTY_FORM = {
  code: "", type: "percentage", value: "", minPurchase: "", maxUses: "",
  startDate: "", endDate: "", status: "active", description: "",
  onePerCustomer: false, firstTimeOnly: false, products: "all", categories: [] as string[]
}

const CATEGORIES = [
  { id: "oud", name: "Oud" }, { id: "floral", name: "Floral" }, { id: "woody", name: "Woody" },
  { id: "citrus", name: "Citrus" }, { id: "oriental", name: "Oriental" }, { id: "fresh", name: "Fresh" },
  { id: "gift-sets", name: "Gift Sets" }, { id: "seasonal", name: "Seasonal" },
]

export default function CouponsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortField, setSortField] = useState("createdAt")
  const [sortDirection, setSortDirection] = useState("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("active")
  const [modalTab, setModalTab] = useState("general")
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [notice, setNotice] = useState<{ type: string; text: string } | null>(null)
  const itemsPerPage = 10

  const allCoupons = [
    { id: 1, code: "LUXURY20", type: "percentage", value: 20, minPurchase: 2000, maxUses: 100, usedCount: 45, startDate: "2023-06-01", endDate: "2023-08-31", status: "active", description: "20% off luxury fragrances", onePerCustomer: true, firstTimeOnly: false, createdAt: "2023-05-15" },
    { id: 2, code: "WELCOME15", type: "percentage", value: 15, minPurchase: 0, maxUses: 1000, usedCount: 358, startDate: "2023-01-01", endDate: "2023-12-31", status: "active", description: "Welcome discount for new customers", onePerCustomer: true, firstTimeOnly: true, createdAt: "2023-01-01" },
    { id: 3, code: "FREESHIP", type: "free_shipping", value: 0, minPurchase: 1500, maxUses: 500, usedCount: 123, startDate: "2023-04-01", endDate: "2023-06-30", status: "active", description: "Free shipping on orders over Rs. 1500", onePerCustomer: false, firstTimeOnly: false, createdAt: "2023-03-15" },
    { id: 4, code: "FLASH30", type: "percentage", value: 30, minPurchase: 3000, maxUses: 200, usedCount: 200, startDate: "2023-04-15", endDate: "2023-04-16", status: "expired", description: "48-hour flash discount", onePerCustomer: false, firstTimeOnly: false, createdAt: "2023-04-10" },
    { id: 5, code: "OUD500", type: "fixed", value: 500, minPurchase: 5000, maxUses: 300, usedCount: 87, startDate: "2023-05-01", endDate: "2023-07-31", status: "active", description: "Rs. 500 off oud collection", onePerCustomer: false, firstTimeOnly: false, createdAt: "2023-04-25" },
    { id: 6, code: "BUY2GET1", type: "buy_x_get_y", value: 0, minPurchase: 0, maxUses: 100, usedCount: 32, startDate: "2023-05-10", endDate: "2023-05-20", status: "expired", description: "Buy 2 get 1 free on selected items", onePerCustomer: true, firstTimeOnly: false, createdAt: "2023-05-05" },
    { id: 7, code: "VIP25", type: "percentage", value: 25, minPurchase: 0, maxUses: 0, usedCount: 421, startDate: "2023-01-01", endDate: "2023-12-31", status: "active", description: "Exclusive VIP member discount", onePerCustomer: false, firstTimeOnly: false, createdAt: "2023-01-01" },
    { id: 8, code: "HOLIDAY35", type: "percentage", value: 35, minPurchase: 2500, maxUses: 500, usedCount: 0, startDate: "2023-12-01", endDate: "2023-12-25", status: "scheduled", description: "Holiday season special discount", onePerCustomer: true, firstTimeOnly: false, createdAt: "2023-05-15" },
  ]

  const activeCoupons = allCoupons.filter(c => c.status === "active").length
  const scheduledCoupons = allCoupons.filter(c => c.status === "scheduled").length
  const expiredCoupons = allCoupons.filter(c => c.status === "expired").length
  const totalUsed = allCoupons.reduce((s, c) => s + c.usedCount, 0)

  const filteredCoupons = allCoupons.filter(c => {
    if (searchQuery && !c.code.toLowerCase().includes(searchQuery.toLowerCase()) && !c.description.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (typeFilter !== "all" && c.type !== typeFilter) return false
    if (statusFilter !== "all" && c.status !== statusFilter) return false
    if (activeTab !== "all" && c.status !== activeTab) return false
    return true
  })

  const sortedCoupons = [...filteredCoupons].sort((a: any, b: any) => {
    let av = a[sortField], bv = b[sortField]
    if (typeof av === "string") { av = av.toLowerCase(); bv = bv.toLowerCase() }
    if (av < bv) return sortDirection === "asc" ? -1 : 1
    if (av > bv) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const totalPages = Math.ceil(sortedCoupons.length / itemsPerPage)
  const paginatedCoupons = sortedCoupons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const toggleSort = (field: string) => {
    if (sortField === field) setSortDirection(d => d === "asc" ? "desc" : "asc")
    else { setSortField(field); setSortDirection("desc") }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.code || !formData.startDate || !formData.endDate) {
      setNotice({ type: "error", text: "Please fill in all required fields" }); return
    }
    setNotice({ type: "success", text: `Coupon "${formData.code}" has been ${isEditing ? "updated" : "created"} successfully` })
    setModalOpen(false); setFormData(EMPTY_FORM); setIsEditing(false)
    setTimeout(() => setNotice(null), 3000)
  }

  const editCoupon = (c: any) => {
    setIsEditing(true)
    setFormData({ code: c.code, type: c.type, value: c.value.toString(), minPurchase: c.minPurchase.toString(), maxUses: c.maxUses.toString(), startDate: c.startDate, endDate: c.endDate, status: c.status, description: c.description, onePerCustomer: c.onePerCustomer, firstTimeOnly: c.firstTimeOnly, products: "all", categories: [] })
    setModalTab("general"); setModalOpen(true)
  }

  const duplicateCoupon = (c: any) => {
    setIsEditing(false)
    setFormData({ code: `${c.code}_COPY`, type: c.type, value: c.value.toString(), minPurchase: c.minPurchase.toString(), maxUses: c.maxUses.toString(), startDate: c.startDate, endDate: c.endDate, status: "scheduled", description: c.description, onePerCustomer: c.onePerCustomer, firstTimeOnly: c.firstTimeOnly, products: "all", categories: [] })
    setModalTab("general"); setModalOpen(true)
  }

  const deleteCoupon = (_id: number) => {
    setNotice({ type: "success", text: "The coupon has been deleted successfully" })
    setTimeout(() => setNotice(null), 3000)
  }

  const SortIcon = ({ field }: { field: string }) => <ArrowUpDown className={`h-3 w-3 ${sortField === field ? "text-[#d4af37]" : "text-[#888]"}`} />
  const TABS = [{ id: "active", label: `Active (${activeCoupons})` }, { id: "scheduled", label: `Scheduled (${scheduledCoupons})` }, { id: "expired", label: `Expired (${expiredCoupons})` }]
  const MODAL_TABS = [{ id: "general", label: "General" }, { id: "restrictions", label: "Restrictions" }]

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Coupon <span className="text-[#d4af37] italic">Codes</span>
          </h1>
          <p className="text-xs text-[#c0c0c0] mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>Create and manage discount coupon codes</p>
        </div>
        <button onClick={() => { setIsEditing(false); setFormData(EMPTY_FORM); setModalTab("general"); setModalOpen(true) }} className={goldBtn} style={{ borderRadius: "4px" }}>
          <Plus className="h-3.5 w-3.5" /> Add Coupon
        </button>
      </div>

      {notice && (
        <div className={`px-3 py-2 text-xs border ${notice.type === "error" ? "bg-red-900/20 border-red-700/40 text-red-400" : "bg-green-900/20 border-green-700/40 text-green-400"}`} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}>
          {notice.text}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Coupons", value: activeCoupons, icon: Tag, color: "text-green-400" },
          { label: "Scheduled", value: scheduledCoupons, icon: Calendar, color: "text-blue-400" },
          { label: "Expired", value: expiredCoupons, icon: CheckCircle, color: "text-[#888]" },
          { label: "Total Used", value: totalUsed.toLocaleString(), icon: Layers, color: "text-[#d4af37]" },
        ].map((card, i) => (
          <div key={i} className="bg-[#111111] border border-[#262626] p-5" style={{ borderRadius: "8px" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs tracking-widest uppercase text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{card.label}</span>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
            <div className="text-2xl font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* Status Tabs */}
      <div className="flex gap-1 border-b border-[#262626]">
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => { setActiveTab(tab.id); setCurrentPage(1) }}
            className={`px-4 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all ${activeTab === tab.id ? "text-[#d4af37] border-b-2 border-[#d4af37] -mb-px" : "text-[#888] hover:text-[#c0c0c0]"}`}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#888]" />
          <input type="search" placeholder="Search coupons..." className={`${inputCls} pl-9`} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} value={searchQuery} onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1) }} />
        </div>
        <select value={typeFilter} onChange={e => { setTypeFilter(e.target.value); setCurrentPage(1) }} className={`${inputCls} w-[160px]`} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}>
          <option value="all">All Types</option>
          {Object.entries(TYPE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1) }} className={`${inputCls} w-[150px]`} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}>
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="scheduled">Scheduled</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#111111] border border-[#262626] overflow-hidden" style={{ borderRadius: "8px" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0d0d0d] border-b border-[#262626]">
                {[{ label: "Code", field: "code" }, { label: "Type", field: "type" }, { label: "Value", field: "value" }, { label: "Status", field: "status" }, { label: "Used / Limit", field: "usedCount" }, { label: "Expires", field: "endDate" }].map(col => (
                  <th key={col.field} className="text-left px-4 py-3 cursor-pointer" onClick={() => toggleSort(col.field)}>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs tracking-widest uppercase text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{col.label}</span>
                      <SortIcon field={col.field} />
                    </div>
                  </th>
                ))}
                <th className="text-right px-4 py-3">
                  <span className="text-xs tracking-widest uppercase text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1a1a]">
              {paginatedCoupons.length > 0 ? paginatedCoupons.map((c: any) => (
                <tr key={c.id} className="hover:bg-[#0d0d0d]/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="text-sm font-semibold text-[#fafafa] font-mono">{c.code}</div>
                    <div className="text-xs text-[#888] line-clamp-1">{c.description}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 ${typeStyle(c.type)}`} style={{ borderRadius: "3px", fontFamily: "'Montserrat', sans-serif" }}>{TYPE_LABELS[c.type] || c.type}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#fafafa]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {c.type === "percentage" ? `${c.value}%` : c.type === "fixed" ? `Rs. ${c.value}` : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 capitalize ${statusStyle(c.status)}`} style={{ borderRadius: "3px", fontFamily: "'Montserrat', sans-serif" }}>{c.status}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {c.usedCount} / {c.maxUses > 0 ? c.maxUses : "∞"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      <Calendar className="h-3.5 w-3.5" />{c.endDate}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => editCoupon(c)} className={outlineBtn} style={{ borderRadius: "4px", padding: "6px 10px" }}><Edit className="h-3 w-3" /> Edit</button>
                      <button onClick={() => duplicateCoupon(c)} className={outlineBtn} style={{ borderRadius: "4px", padding: "6px 10px" }}><Copy className="h-3 w-3" /></button>
                      <button onClick={() => deleteCoupon(c.id)} className={dangerBtn} style={{ borderRadius: "4px" }}><Trash2 className="h-3 w-3" /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-xs text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>No coupons found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-xs text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filteredCoupons.length)} of {filteredCoupons.length} coupons
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1} className={outlineBtn} style={{ borderRadius: "4px", padding: "6px 10px" }}><ChevronLeft className="h-3.5 w-3.5" /></button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button key={page} onClick={() => setCurrentPage(page)} className={page === currentPage ? goldBtn : outlineBtn} style={{ borderRadius: "4px", padding: "6px 12px" }}>{page}</button>
            ))}
            <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages} className={outlineBtn} style={{ borderRadius: "4px", padding: "6px 10px" }}><ChevronRight className="h-3.5 w-3.5" /></button>
          </div>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
          <div className="bg-[#111111] border border-[#262626] w-full max-w-lg max-h-[90vh] overflow-y-auto" style={{ borderRadius: "8px" }}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#262626] bg-[#0d0d0d] sticky top-0" style={{ borderRadius: "8px 8px 0 0" }}>
              <h3 className="font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>{isEditing ? "Edit" : "Create New"} Coupon</h3>
              <button onClick={() => setModalOpen(false)} className="text-[#888] hover:text-[#fafafa] transition-colors"><X className="h-5 w-5" /></button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-[#262626] px-5">
              {MODAL_TABS.map(tab => (
                <button key={tab.id} onClick={() => setModalTab(tab.id)}
                  className={`px-3 py-3 text-xs font-semibold tracking-widest uppercase transition-all ${modalTab === tab.id ? "text-[#d4af37] border-b-2 border-[#d4af37] -mb-px" : "text-[#888] hover:text-[#c0c0c0]"}`}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="p-5">
              {/* General Tab */}
              {modalTab === "general" && (
                <div className="space-y-4">
                  <div>
                    <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Coupon Code *</label>
                    <input name="code" placeholder="LUXURY20" value={formData.code} onChange={handleChange} required className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
                  </div>
                  <div>
                    <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Description</label>
                    <textarea name="description" placeholder="Coupon description" value={formData.description} onChange={handleChange} rows={2} className={`${inputCls} resize-none`} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
                  </div>
                  <div>
                    <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Discount Type</label>
                    <select name="type" value={formData.type} onChange={handleChange} className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}>
                      {Object.entries(TYPE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                  </div>
                  {(formData.type === "percentage" || formData.type === "fixed") && (
                    <div>
                      <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {formData.type === "percentage" ? "Percentage (%) *" : "Fixed Amount (Rs.) *"}
                      </label>
                      <input name="value" type="number" min="0" step={formData.type === "percentage" ? "1" : "1"} max={formData.type === "percentage" ? "100" : undefined} placeholder={formData.type === "percentage" ? "20" : "500"} value={formData.value} onChange={handleChange} className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Min. Purchase (Rs.)</label>
                      <input name="minPurchase" type="number" min="0" placeholder="0" value={formData.minPurchase} onChange={handleChange} className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
                    </div>
                    <div>
                      <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Usage Limit (0 = ∞)</label>
                      <input name="maxUses" type="number" min="0" placeholder="No limit" value={formData.maxUses} onChange={handleChange} className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Start Date *</label>
                      <input name="startDate" type="date" value={formData.startDate} onChange={handleChange} required className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif", colorScheme: "dark" }} />
                    </div>
                    <div>
                      <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>End Date *</label>
                      <input name="endDate" type="date" value={formData.endDate} onChange={handleChange} required className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif", colorScheme: "dark" }} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Status</label>
                    <div className="flex gap-4">
                      {["active", "scheduled"].map(s => (
                        <label key={s} className="flex items-center gap-2 cursor-pointer">
                          <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${formData.status === s ? "border-[#d4af37]" : "border-[#555]"}`} onClick={() => setFormData(prev => ({ ...prev, status: s }))}>
                            {formData.status === s && <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />}
                          </div>
                          <span className="text-xs text-[#c0c0c0] capitalize" style={{ fontFamily: "'Montserrat', sans-serif" }}>{s}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Restrictions Tab */}
              {modalTab === "restrictions" && (
                <div className="space-y-4">
                  <div>
                    <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Applies To</label>
                    <div className="flex flex-col gap-2">
                      {[{ val: "all", label: "All Products" }, { val: "category", label: "Specific Categories" }, { val: "products", label: "Specific Products" }].map(opt => (
                        <label key={opt.val} className="flex items-center gap-2 cursor-pointer">
                          <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${formData.products === opt.val ? "border-[#d4af37]" : "border-[#555]"}`} onClick={() => setFormData(prev => ({ ...prev, products: opt.val }))}>
                            {formData.products === opt.val && <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />}
                          </div>
                          <span className="text-xs text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {formData.products === "category" && (
                    <div>
                      <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Categories</label>
                      <div className="grid grid-cols-2 gap-2">
                        {CATEGORIES.map(cat => {
                          const checked = formData.categories.includes(cat.id)
                          return (
                            <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                              <div
                                className={`w-3.5 h-3.5 border flex items-center justify-center transition-colors ${checked ? "bg-[#d4af37] border-[#d4af37]" : "bg-[#0d0d0d] border-[#262626]"}`}
                                style={{ borderRadius: "2px" }}
                                onClick={() => setFormData(prev => ({ ...prev, categories: checked ? prev.categories.filter(id => id !== cat.id) : [...prev.categories, cat.id] }))}
                              >
                                {checked && <svg className="w-2.5 h-2.5 text-[#0a0a0a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                              </div>
                              <span className="text-xs text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{cat.name}</span>
                            </label>
                          )
                        })}
                      </div>
                    </div>
                  )}
                  <div className="space-y-3 pt-1">
                    <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Usage Restrictions</label>
                    {[{ key: "onePerCustomer", label: "One use per customer" }, { key: "firstTimeOnly", label: "First-time customers only" }].map(opt => {
                      const checked = (formData as any)[opt.key]
                      return (
                        <label key={opt.key} className="flex items-center gap-3 cursor-pointer">
                          <div
                            className={`w-4 h-4 border flex items-center justify-center transition-colors ${checked ? "bg-[#d4af37] border-[#d4af37]" : "bg-[#0d0d0d] border-[#262626]"}`}
                            style={{ borderRadius: "2px" }}
                            onClick={() => setFormData(prev => ({ ...prev, [opt.key]: !(prev as any)[opt.key] }))}
                          >
                            {checked && <svg className="w-2.5 h-2.5 text-[#0a0a0a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                          </div>
                          <span className="text-xs text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{opt.label}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-[#1a1a1a]">
                <button type="button" onClick={() => setModalOpen(false)} className={outlineBtn} style={{ borderRadius: "4px" }}>Cancel</button>
                <button type="submit" className={goldBtn} style={{ borderRadius: "4px" }}>{isEditing ? "Update" : "Create"} Coupon</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
