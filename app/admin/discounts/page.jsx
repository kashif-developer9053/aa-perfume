"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, ArrowUpDown, ChevronLeft, ChevronRight, Tag, Percent, Calendar, X } from "lucide-react"

const inputCls = "w-full bg-[#0d0d0d] border border-[#262626] text-[#fafafa] px-3 py-2.5 text-sm outline-none focus:border-[#d4af37] transition-colors placeholder-[#666]"
const labelCls = "text-xs tracking-widest uppercase text-[#c0c0c0] block mb-1.5"
const goldBtn = "inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-widest uppercase bg-[#d4af37] text-[#0a0a0a] hover:bg-[#c9a227] transition-all disabled:opacity-60"
const outlineBtn = "inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-widest uppercase border border-[#262626] text-[#c0c0c0] hover:border-[#d4af37] hover:text-[#d4af37] transition-all"
const dangerBtn = "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold tracking-widest uppercase border border-red-900/50 text-red-400 hover:bg-red-900/10 transition-all"

const statusStyle = (status) => {
  if (status === "active") return "bg-green-900/30 text-green-400 border border-green-800/40"
  if (status === "scheduled") return "bg-blue-900/30 text-blue-400 border border-blue-800/40"
  return "bg-[#1a1a1a] text-[#888] border border-[#262626]"
}

const EMPTY_FORM = { code: "", type: "percentage", value: "", minPurchase: "", maxUses: "", startDate: "", endDate: "", status: "active", products: "all" }

export default function DiscountsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortField, setSortField] = useState("createdAt")
  const [sortDirection, setSortDirection] = useState("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [notice, setNotice] = useState(null)
  const itemsPerPage = 10

  const allDiscounts = [
    { id: 1, code: "SUMMER20", type: "percentage", value: 20, minPurchase: 50, maxUses: 100, usedCount: 45, startDate: "2023-06-01", endDate: "2023-08-31", status: "active", products: "all", createdAt: "2023-05-15" },
    { id: 2, code: "WELCOME10", type: "percentage", value: 10, minPurchase: 0, maxUses: 1000, usedCount: 358, startDate: "2023-01-01", endDate: "2023-12-31", status: "active", products: "all", createdAt: "2023-01-01" },
    { id: 3, code: "FREESHIP", type: "fixed", value: 10, minPurchase: 75, maxUses: 500, usedCount: 123, startDate: "2023-04-01", endDate: "2023-06-30", status: "active", products: "all", createdAt: "2023-03-15" },
    { id: 4, code: "FLASH25", type: "percentage", value: 25, minPurchase: 100, maxUses: 200, usedCount: 200, startDate: "2023-04-15", endDate: "2023-04-16", status: "expired", products: "all", createdAt: "2023-04-10" },
    { id: 5, code: "TECH15", type: "percentage", value: 15, minPurchase: 0, maxUses: 300, usedCount: 87, startDate: "2023-05-01", endDate: "2023-07-31", status: "active", products: "category", createdAt: "2023-04-25" },
    { id: 6, code: "SAVE50", type: "fixed", value: 50, minPurchase: 200, maxUses: 100, usedCount: 32, startDate: "2023-05-10", endDate: "2023-05-20", status: "expired", products: "all", createdAt: "2023-05-05" },
    { id: 7, code: "NEWUSER", type: "percentage", value: 15, minPurchase: 0, maxUses: 0, usedCount: 421, startDate: "2023-01-01", endDate: "2023-12-31", status: "active", products: "all", createdAt: "2023-01-01" },
    { id: 8, code: "HOLIDAY30", type: "percentage", value: 30, minPurchase: 150, maxUses: 500, usedCount: 0, startDate: "2023-12-01", endDate: "2023-12-25", status: "scheduled", products: "all", createdAt: "2023-05-15" },
  ]

  const filteredDiscounts = allDiscounts.filter(d => {
    if (searchQuery && !d.code.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (typeFilter !== "all" && d.type !== typeFilter) return false
    if (statusFilter !== "all" && d.status !== statusFilter) return false
    return true
  })

  const sortedDiscounts = [...filteredDiscounts].sort((a, b) => {
    let av = a[sortField], bv = b[sortField]
    if (typeof av === "string") { av = av.toLowerCase(); bv = bv.toLowerCase() }
    if (av < bv) return sortDirection === "asc" ? -1 : 1
    if (av > bv) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const totalPages = Math.ceil(sortedDiscounts.length / itemsPerPage)
  const paginatedDiscounts = sortedDiscounts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const toggleSort = (field) => {
    if (sortField === field) setSortDirection(d => d === "asc" ? "desc" : "asc")
    else { setSortField(field); setSortDirection("desc") }
  }

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.code || !formData.value || !formData.startDate || !formData.endDate) {
      setNotice({ type: "error", text: "Please fill in all required fields" }); return
    }
    setNotice({ type: "success", text: `Discount code ${formData.code} has been ${isEditing ? "updated" : "created"} successfully` })
    setModalOpen(false)
    setFormData(EMPTY_FORM)
    setIsEditing(false)
    setTimeout(() => setNotice(null), 3000)
  }

  const editDiscount = (d) => {
    setIsEditing(true)
    setFormData({ code: d.code, type: d.type, value: d.value.toString(), minPurchase: d.minPurchase.toString(), maxUses: d.maxUses.toString(), startDate: d.startDate, endDate: d.endDate, status: d.status, products: d.products })
    setModalOpen(true)
  }

  const deleteDiscount = (id) => {
    setNotice({ type: "success", text: "The discount has been deleted successfully" })
    setTimeout(() => setNotice(null), 3000)
  }

  const openAdd = () => { setIsEditing(false); setFormData(EMPTY_FORM); setModalOpen(true) }

  const SortIcon = ({ field }) => <ArrowUpDown className={`h-3 w-3 ${sortField === field ? "text-[#d4af37]" : "text-[#888]"}`} />

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Discounts <span className="text-[#d4af37] italic">&amp; Promotions</span>
          </h1>
          <p className="text-xs text-[#c0c0c0] mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>Manage discount codes, coupons, and special offers</p>
        </div>
        <button onClick={openAdd} className={goldBtn} style={{ borderRadius: "4px" }}>
          <Plus className="h-3.5 w-3.5" /> Add Discount
        </button>
      </div>

      {notice && (
        <div className={`px-3 py-2 text-xs border ${notice.type === "error" ? "bg-red-900/20 border-red-700/40 text-red-400" : "bg-green-900/20 border-green-700/40 text-green-400"}`} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}>
          {notice.text}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#888]" />
          <input type="search" placeholder="Search discounts..." className={`${inputCls} pl-9`} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} value={searchQuery} onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1) }} />
        </div>
        <select value={typeFilter} onChange={e => { setTypeFilter(e.target.value); setCurrentPage(1) }} className={`${inputCls} w-[150px]`} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}>
          <option value="all">All Types</option>
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed Amount</option>
        </select>
        <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1) }} className={`${inputCls} w-[150px]`} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}>
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
          <option value="scheduled">Scheduled</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#111111] border border-[#262626] overflow-hidden" style={{ borderRadius: "8px" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0d0d0d] border-b border-[#262626]">
                {[
                  { label: "Code", field: "code" }, { label: "Type", field: "type" },
                  { label: "Value", field: "value" }, { label: "Status", field: "status" },
                  { label: "Used", field: "usedCount" }, { label: "Expires", field: "endDate" },
                ].map(col => (
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
              {paginatedDiscounts.length > 0 ? paginatedDiscounts.map(d => (
                <tr key={d.id} className="hover:bg-[#0d0d0d]/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="text-sm font-semibold text-[#fafafa] font-mono">{d.code}</div>
                    <div className="text-xs text-[#888]">Min: Rs. {d.minPurchase.toFixed(2)}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {d.type === "percentage" ? <Percent className="h-3.5 w-3.5 text-[#888]" /> : <Tag className="h-3.5 w-3.5 text-[#888]" />}
                      <span className="text-xs text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{d.type === "percentage" ? "Percentage" : "Fixed Amount"}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#fafafa]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {d.type === "percentage" ? `${d.value}%` : `Rs. ${d.value.toFixed(2)}`}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 capitalize ${statusStyle(d.status)}`} style={{ borderRadius: "3px", fontFamily: "'Montserrat', sans-serif" }}>{d.status}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {d.usedCount} / {d.maxUses > 0 ? d.maxUses : "∞"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      <Calendar className="h-3.5 w-3.5" />{d.endDate}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => editDiscount(d)} className={outlineBtn} style={{ borderRadius: "4px", padding: "6px 10px" }}>
                        <Edit className="h-3 w-3" /> Edit
                      </button>
                      <button onClick={() => deleteDiscount(d.id)} className={dangerBtn} style={{ borderRadius: "4px" }}>
                        <Trash2 className="h-3 w-3" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-xs text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>No discounts found.</td>
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
            Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filteredDiscounts.length)} of {filteredDiscounts.length} discounts
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1} className={outlineBtn} style={{ borderRadius: "4px", padding: "6px 10px" }}>
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button key={page} onClick={() => setCurrentPage(page)} className={page === currentPage ? goldBtn : outlineBtn} style={{ borderRadius: "4px", padding: "6px 12px" }}>{page}</button>
            ))}
            <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages} className={outlineBtn} style={{ borderRadius: "4px", padding: "6px 10px" }}>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
          <div className="bg-[#111111] border border-[#262626] w-full max-w-lg" style={{ borderRadius: "8px" }}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#262626] bg-[#0d0d0d]" style={{ borderRadius: "8px 8px 0 0" }}>
              <h3 className="font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>{isEditing ? "Edit" : "Create New"} Discount</h3>
              <button onClick={() => setModalOpen(false)} className="text-[#888] hover:text-[#fafafa] transition-colors"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Discount Code *</label>
                <input name="code" placeholder="SUMMER20" value={formData.code} onChange={handleChange} required className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
              </div>

              <div>
                <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Type</label>
                <div className="flex gap-4">
                  {["percentage", "fixed"].map(t => (
                    <label key={t} className="flex items-center gap-2 cursor-pointer">
                      <div
                        className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${formData.type === t ? "border-[#d4af37]" : "border-[#555]"}`}
                        onClick={() => setFormData(prev => ({ ...prev, type: t }))}
                      >
                        {formData.type === t && <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />}
                      </div>
                      <span className="text-xs text-[#c0c0c0] capitalize" style={{ fontFamily: "'Montserrat', sans-serif" }}>{t === "percentage" ? "Percentage" : "Fixed Amount"}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>{formData.type === "percentage" ? "Percentage (%)" : "Amount (Rs.)"} *</label>
                  <input name="value" type="number" min="0" step={formData.type === "percentage" ? "1" : "0.01"} max={formData.type === "percentage" ? "100" : undefined} placeholder={formData.type === "percentage" ? "20" : "10.00"} value={formData.value} onChange={handleChange} required className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
                </div>
                <div>
                  <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Min. Purchase (Rs.)</label>
                  <input name="minPurchase" type="number" min="0" step="0.01" placeholder="0.00" value={formData.minPurchase} onChange={handleChange} className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
                </div>
              </div>

              <div>
                <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Usage Limit (0 = unlimited)</label>
                <input name="maxUses" type="number" min="0" placeholder="No limit" value={formData.maxUses} onChange={handleChange} className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
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
                      <div
                        className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${formData.status === s ? "border-[#d4af37]" : "border-[#555]"}`}
                        onClick={() => setFormData(prev => ({ ...prev, status: s }))}
                      >
                        {formData.status === s && <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />}
                      </div>
                      <span className="text-xs text-[#c0c0c0] capitalize" style={{ fontFamily: "'Montserrat', sans-serif" }}>{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Applies To</label>
                <div className="flex flex-col gap-2">
                  {[{ val: "all", label: "All Products" }, { val: "category", label: "Specific Categories" }, { val: "products", label: "Specific Products" }].map(opt => (
                    <label key={opt.val} className="flex items-center gap-2 cursor-pointer">
                      <div
                        className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${formData.products === opt.val ? "border-[#d4af37]" : "border-[#555]"}`}
                        onClick={() => setFormData(prev => ({ ...prev, products: opt.val }))}
                      >
                        {formData.products === opt.val && <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />}
                      </div>
                      <span className="text-xs text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-[#1a1a1a]">
                <button type="button" onClick={() => setModalOpen(false)} className={outlineBtn} style={{ borderRadius: "4px" }}>Cancel</button>
                <button type="submit" className={goldBtn} style={{ borderRadius: "4px" }}>{isEditing ? "Update" : "Create"} Discount</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
