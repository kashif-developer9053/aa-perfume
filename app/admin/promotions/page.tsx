"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, ArrowUpDown, ChevronLeft, ChevronRight, Tag, Calendar, Copy, ShoppingBag, Percent, X } from "lucide-react"

const inputCls = "w-full bg-[#0d0d0d] border border-[#262626] text-[#fafafa] px-3 py-2.5 text-sm outline-none focus:border-[#d4af37] transition-colors placeholder-[#666]"
const labelCls = "text-xs tracking-widest uppercase text-[#c0c0c0] block mb-1.5"
const goldBtn = "inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-widest uppercase bg-[#d4af37] text-[#0a0a0a] hover:bg-[#c9a227] transition-all disabled:opacity-60"
const outlineBtn = "inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-widest uppercase border border-[#262626] text-[#c0c0c0] hover:border-[#d4af37] hover:text-[#d4af37] transition-all"
const dangerBtn = "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold tracking-widest uppercase border border-red-900/50 text-red-400 hover:bg-red-900/10 transition-all"

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className={`relative w-10 h-5 rounded-full transition-all duration-200 ${checked ? "bg-[#d4af37]" : "bg-[#262626]"}`}>
      <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-[#0a0a0a] rounded-full transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  )
}

const statusStyle = (status: string) => {
  if (status === "active") return "bg-green-900/30 text-green-400 border border-green-800/40"
  if (status === "scheduled") return "bg-blue-900/30 text-blue-400 border border-blue-800/40"
  return "bg-[#1a1a1a] text-[#888] border border-[#262626]"
}

const typeStyle = (type: string) => {
  const map: Record<string, string> = {
    percentage: "bg-yellow-900/30 text-yellow-400 border border-yellow-800/40",
    fixed: "bg-indigo-900/30 text-indigo-400 border border-indigo-800/40",
    bogo: "bg-purple-900/30 text-purple-400 border border-purple-800/40",
    bundle: "bg-amber-900/30 text-amber-400 border border-amber-800/40",
    subscription: "bg-teal-900/30 text-teal-400 border border-teal-800/40",
    flash: "bg-rose-900/30 text-rose-400 border border-rose-800/40",
  }
  return map[type] || "bg-[#1a1a1a] text-[#c0c0c0] border border-[#262626]"
}

const TYPE_LABELS: Record<string, string> = {
  percentage: "Percentage", fixed: "Fixed Amount", bogo: "BOGO",
  bundle: "Bundle", subscription: "Subscription", flash: "Flash Sale"
}

const EMPTY_FORM = { name: "", type: "percentage", discount: "", startDate: "", endDate: "", status: "active", products: "all", categories: [] as string[], minPurchase: "", description: "", customerGroups: "all", featured: false, showOnHomepage: false }

const CATEGORIES = [
  { id: "oud", name: "Oud" }, { id: "floral", name: "Floral" }, { id: "woody", name: "Woody" },
  { id: "citrus", name: "Citrus" }, { id: "oriental", name: "Oriental" }, { id: "fresh", name: "Fresh" },
  { id: "gift-sets", name: "Gift Sets" }, { id: "seasonal", name: "Seasonal" },
]

export default function PromotionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [sortField, setSortField] = useState("startDate")
  const [sortDirection, setSortDirection] = useState("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("active")
  const [modalTab, setModalTab] = useState("general")
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [notice, setNotice] = useState<{ type: string; text: string } | null>(null)
  const itemsPerPage = 10

  const allPromotions = [
    { id: 1, name: "Summer Fragrance Festival", status: "active", startDate: "2023-06-01", endDate: "2023-08-31", type: "percentage", discount: "20%", discountValue: 20, products: 24, revenue: 4250.75, orders: 87, description: "Summer festival with special discounts on seasonal fragrances", featured: true, showOnHomepage: true },
    { id: 2, name: "Buy 2 Get 1 Free Oud", status: "active", startDate: "2023-07-01", endDate: "2023-07-31", type: "bogo", discount: "Buy 2 Get 1", discountValue: 33, products: 12, revenue: 2180.5, orders: 45, description: "Buy two oud fragrances and get one free", featured: true, showOnHomepage: false },
    { id: 3, name: "Valentine's Day Special", status: "scheduled", startDate: "2024-02-01", endDate: "2024-02-14", type: "percentage", discount: "15%", discountValue: 15, products: 18, revenue: 0, orders: 0, description: "Special discounts on Valentine's Day collections", featured: false, showOnHomepage: false },
    { id: 4, name: "Fragrance Gift Box Bundle", status: "active", startDate: "2023-06-15", endDate: "2023-09-15", type: "bundle", discount: "25%", discountValue: 25, products: 5, revenue: 3750.25, orders: 62, description: "Bundle discount on gift boxes with assorted fragrances", featured: true, showOnHomepage: true },
    { id: 5, name: "Flash Sale: Oud Collection", status: "expired", startDate: "2023-05-01", endDate: "2023-05-03", type: "percentage", discount: "40%", discountValue: 40, products: 8, revenue: 1850.75, orders: 32, description: "48-hour flash sale on all oud products", featured: false, showOnHomepage: true },
    { id: 6, name: "Holiday Gift Sets", status: "scheduled", startDate: "2023-11-15", endDate: "2023-12-31", type: "percentage", discount: "15%", discountValue: 15, products: 15, revenue: 0, orders: 0, description: "Special holiday gift sets with premium fragrances", featured: false, showOnHomepage: false },
    { id: 7, name: "Fragrance of the Month Club", status: "active", startDate: "2023-01-01", endDate: "2023-12-31", type: "subscription", discount: "10%", discountValue: 10, products: 30, revenue: 8750.5, orders: 125, description: "Subscribe to our monthly fragrance box and save 10%", featured: true, showOnHomepage: true },
    { id: 8, name: "Back to School Scents", status: "scheduled", startDate: "2023-08-15", endDate: "2023-09-15", type: "percentage", discount: "15%", discountValue: 15, products: 12, revenue: 0, orders: 0, description: "Special scents for back to school season", featured: false, showOnHomepage: false },
  ]

  const activePromotions = allPromotions.filter(p => p.status === "active").length
  const scheduledPromotions = allPromotions.filter(p => p.status === "scheduled").length
  const expiredPromotions = allPromotions.filter(p => p.status === "expired").length
  const totalRevenue = allPromotions.reduce((s, p) => s + p.revenue, 0)
  const totalOrders = allPromotions.reduce((s, p) => s + p.orders, 0)

  const filteredPromotions = allPromotions.filter(p => {
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (typeFilter !== "all" && p.type !== typeFilter) return false
    if (activeTab !== "all" && p.status !== activeTab) return false
    return true
  })

  const sortedPromotions = [...filteredPromotions].sort((a: any, b: any) => {
    let av = a[sortField], bv = b[sortField]
    if (typeof av === "string") { av = av.toLowerCase(); bv = bv.toLowerCase() }
    if (av < bv) return sortDirection === "asc" ? -1 : 1
    if (av > bv) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const totalPages = Math.ceil(sortedPromotions.length / itemsPerPage)
  const paginatedPromotions = sortedPromotions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const toggleSort = (field: string) => {
    if (sortField === field) setSortDirection(d => d === "asc" ? "desc" : "asc")
    else { setSortField(field); setSortDirection("desc") }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.discount || !formData.startDate || !formData.endDate) {
      setNotice({ type: "error", text: "Please fill in all required fields" }); return
    }
    setNotice({ type: "success", text: `Promotion "${formData.name}" has been ${isEditing ? "updated" : "created"} successfully` })
    setModalOpen(false); setFormData(EMPTY_FORM); setIsEditing(false)
    setTimeout(() => setNotice(null), 3000)
  }

  const editPromotion = (p: any) => {
    setIsEditing(true)
    setFormData({ name: p.name, type: p.type, discount: p.discountValue.toString(), startDate: p.startDate, endDate: p.endDate, status: p.status, products: "all", categories: [], minPurchase: "", description: p.description, customerGroups: "all", featured: p.featured, showOnHomepage: p.showOnHomepage })
    setModalTab("general"); setModalOpen(true)
  }

  const duplicatePromotion = (p: any) => {
    setIsEditing(false)
    setFormData({ name: `Copy of ${p.name}`, type: p.type, discount: p.discountValue.toString(), startDate: p.startDate, endDate: p.endDate, status: "scheduled", products: "all", categories: [], minPurchase: "", description: p.description, customerGroups: "all", featured: p.featured, showOnHomepage: p.showOnHomepage })
    setModalTab("general"); setModalOpen(true)
  }

  const deletePromotion = (_id: number) => {
    setNotice({ type: "success", text: "The promotion has been deleted successfully" })
    setTimeout(() => setNotice(null), 3000)
  }

  const SortIcon = ({ field }: { field: string }) => <ArrowUpDown className={`h-3 w-3 ${sortField === field ? "text-[#d4af37]" : "text-[#888]"}`} />
  const TABS = [{ id: "active", label: `Active (${activePromotions})` }, { id: "scheduled", label: `Scheduled (${scheduledPromotions})` }, { id: "expired", label: `Expired (${expiredPromotions})` }]
  const MODAL_TABS = [{ id: "general", label: "General" }, { id: "restrictions", label: "Restrictions" }, { id: "display", label: "Display" }]

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Promotional <span className="text-[#d4af37] italic">Campaigns</span>
          </h1>
          <p className="text-xs text-[#c0c0c0] mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>Manage sales, discounts, and promotional campaigns</p>
        </div>
        <button onClick={() => { setIsEditing(false); setFormData(EMPTY_FORM); setModalTab("general"); setModalOpen(true) }} className={goldBtn} style={{ borderRadius: "4px" }}>
          <Plus className="h-3.5 w-3.5" /> Add Promotion
        </button>
      </div>

      {notice && (
        <div className={`px-3 py-2 text-xs border ${notice.type === "error" ? "bg-red-900/20 border-red-700/40 text-red-400" : "bg-green-900/20 border-green-700/40 text-green-400"}`} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}>
          {notice.text}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Promotions", value: activePromotions, icon: Tag, pct: (activePromotions / allPromotions.length * 100) },
          { label: "Scheduled", value: scheduledPromotions, icon: Calendar, pct: (scheduledPromotions / allPromotions.length * 100) },
          { label: "Promotion Revenue", value: `Rs. ${totalRevenue.toFixed(0)}`, icon: ShoppingBag, sub: `From ${totalOrders} orders` },
          { label: "Avg Order Value", value: `Rs. ${totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(0) : "0"}`, icon: Percent, sub: totalOrders > 0 ? `${totalOrders} promo orders` : "No orders" },
        ].map((card: any, i) => (
          <div key={i} className="bg-[#111111] border border-[#262626] p-5" style={{ borderRadius: "8px" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs tracking-widest uppercase text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{card.label}</span>
              <card.icon className="h-4 w-4 text-[#d4af37]" />
            </div>
            <div className="text-2xl font-bold text-[#fafafa] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{card.value}</div>
            {card.pct !== undefined ? (
              <>
                <p className="text-xs text-[#888] mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{card.pct.toFixed(0)}% of all promotions</p>
                <div className="h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div className="h-full bg-[#d4af37] rounded-full transition-all" style={{ width: `${card.pct}%` }} />
                </div>
              </>
            ) : (
              <p className="text-xs text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{card.sub}</p>
            )}
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
          <input type="search" placeholder="Search promotions..." className={`${inputCls} pl-9`} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} value={searchQuery} onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1) }} />
        </div>
        <select value={typeFilter} onChange={e => { setTypeFilter(e.target.value); setCurrentPage(1) }} className={`${inputCls} w-[150px]`} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}>
          <option value="all">All Types</option>
          {Object.entries(TYPE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#111111] border border-[#262626] overflow-hidden" style={{ borderRadius: "8px" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0d0d0d] border-b border-[#262626]">
                {[{ label: "Name", field: "name" }, { label: "Type", field: "type" }, { label: "Discount", field: "discountValue" }, { label: "Period", field: "startDate" }, { label: "Revenue", field: "revenue" }].map(col => (
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
              {paginatedPromotions.length > 0 ? paginatedPromotions.map((p: any) => (
                <tr key={p.id} className="hover:bg-[#0d0d0d]/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-[#fafafa]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{p.name}</div>
                    <div className="text-xs text-[#888] line-clamp-1">{p.description}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 ${typeStyle(p.type)}`} style={{ borderRadius: "3px", fontFamily: "'Montserrat', sans-serif" }}>{TYPE_LABELS[p.type] || p.type}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#fafafa]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{p.discount}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{p.startDate} – {p.endDate}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-[#d4af37]">Rs. {p.revenue.toFixed(0)}</div>
                    <div className="text-xs text-[#888]">{p.orders} orders</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => editPromotion(p)} className={outlineBtn} style={{ borderRadius: "4px", padding: "6px 10px" }}><Edit className="h-3 w-3" /> Edit</button>
                      <button onClick={() => duplicatePromotion(p)} className={outlineBtn} style={{ borderRadius: "4px", padding: "6px 10px" }}><Copy className="h-3 w-3" /></button>
                      <button onClick={() => deletePromotion(p.id)} className={dangerBtn} style={{ borderRadius: "4px" }}><Trash2 className="h-3 w-3" /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-xs text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>No promotions found.</td>
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
            Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filteredPromotions.length)} of {filteredPromotions.length} promotions
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
          <div className="bg-[#111111] border border-[#262626] w-full max-w-xl max-h-[90vh] overflow-y-auto" style={{ borderRadius: "8px" }}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#262626] bg-[#0d0d0d] sticky top-0" style={{ borderRadius: "8px 8px 0 0" }}>
              <h3 className="font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>{isEditing ? "Edit" : "Create New"} Promotion</h3>
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
                    <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Name *</label>
                    <input name="name" placeholder="Summer Sale" value={formData.name} onChange={handleChange} required className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
                  </div>
                  <div>
                    <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Description</label>
                    <textarea name="description" placeholder="Promotion description" value={formData.description} onChange={handleChange} rows={3} className={`${inputCls} resize-none`} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
                  </div>
                  <div>
                    <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Promotion Type</label>
                    <select name="type" value={formData.type} onChange={handleChange} className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}>
                      {Object.entries(TYPE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {formData.type === "percentage" ? "Percentage (%)" : formData.type === "fixed" ? "Amount (Rs.)" : "Discount Value"} *
                    </label>
                    <input name="discount" type="number" min="0" step={formData.type === "percentage" ? "1" : "0.01"} max={formData.type === "percentage" ? "100" : undefined} placeholder={formData.type === "percentage" ? "20" : "10.00"} value={formData.discount} onChange={handleChange} required className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
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
                  <div>
                    <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Customer Groups</label>
                    <select name="customerGroups" value={formData.customerGroups} onChange={handleChange} className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}>
                      <option value="all">All Customers</option>
                      <option value="new">New Customers</option>
                      <option value="returning">Returning Customers</option>
                      <option value="vip">VIP Customers</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Min. Purchase (Rs.)</label>
                    <input name="minPurchase" type="number" min="0" step="0.01" placeholder="0.00" value={formData.minPurchase} onChange={handleChange} className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
                  </div>
                </div>
              )}

              {/* Display Tab */}
              {modalTab === "display" && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-[#fafafa] font-medium mb-0.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>Featured Promotion</div>
                      <div className="text-xs text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Mark as featured promotion</div>
                    </div>
                    <Toggle checked={formData.featured} onChange={v => setFormData(prev => ({ ...prev, featured: v }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-[#fafafa] font-medium mb-0.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>Homepage Display</div>
                      <div className="text-xs text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Show on homepage banner</div>
                    </div>
                    <Toggle checked={formData.showOnHomepage} onChange={v => setFormData(prev => ({ ...prev, showOnHomepage: v }))} />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-[#1a1a1a]">
                <button type="button" onClick={() => setModalOpen(false)} className={outlineBtn} style={{ borderRadius: "4px" }}>Cancel</button>
                <button type="submit" className={goldBtn} style={{ borderRadius: "4px" }}>{isEditing ? "Update" : "Create"} Promotion</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
