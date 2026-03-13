"use client"

import { useState, useEffect } from "react"
import { Search, Download, Mail, Calendar, RefreshCw, Trash2, X, Users } from "lucide-react"
import { toast } from "@/hooks/use-toast"

const inputCls = "bg-[#0d0d0d] border border-[#262626] text-[#fafafa] px-3 py-2 text-sm outline-none focus:border-[#d4af37] transition-colors placeholder-[#666]"
const outlineBtn = "inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-widest uppercase border border-[#262626] text-[#c0c0c0] hover:border-[#d4af37] hover:text-[#d4af37] transition-all"
const dangerBtn = "inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-widest uppercase border border-red-900/50 text-red-400 hover:bg-red-900/10 transition-all"

export default function CustomersPage() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const fetchCustomers = async (page = 1, search = "") => {
    try {
      setLoading(true)
      const params = new URLSearchParams({ page: page.toString(), limit: "10", ...(search && { search }) })
      const res = await fetch(`/api/admin/users?${params}`)
      const data = await res.json()
      if (data.success) {
        setCustomers(data.data.users)
        setCurrentPage(data.data.page)
        setTotalPages(data.data.pages)
        setTotal(data.data.total)
      } else {
        toast({ title: "Error", description: data.message || "Failed to fetch customers", variant: "destructive" })
      }
    } catch { toast({ title: "Error", description: "Failed to fetch customers", variant: "destructive" }) }
    finally { setLoading(false) }
  }

  const deleteCustomer = async (id) => {
    try {
      setDeleteLoading(true)
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" })
      const data = await res.json()
      if (data.success) {
        toast({ title: "Customer deleted" })
        fetchCustomers(currentPage, searchTerm)
        if (selectedCustomer?._id === id) setSelectedCustomer(null)
      } else {
        toast({ title: "Error", description: data.message, variant: "destructive" })
      }
    } catch { toast({ title: "Error", description: "Failed to delete", variant: "destructive" }) }
    finally { setDeleteLoading(false); setConfirmDelete(null) }
  }

  useEffect(() => {
    const t = setTimeout(() => { fetchCustomers(1, searchTerm); setCurrentPage(1) }, 500)
    return () => clearTimeout(t)
  }, [searchTerm])

  useEffect(() => { fetchCustomers() }, [])

  const sorted = [...customers].sort((a, b) => {
    switch (sortBy) {
      case "recent": return new Date(b.createdAt) - new Date(a.createdAt)
      case "oldest": return new Date(a.createdAt) - new Date(b.createdAt)
      case "name-asc": return a.name.localeCompare(b.name)
      case "name-desc": return b.name.localeCompare(a.name)
      default: return 0
    }
  })

  const exportCSV = () => {
    const csv = ["Name,Email,Role,Created At"].concat(customers.map(c => [c.name, c.email, c.role, new Date(c.createdAt).toLocaleDateString()].join(","))).join("\n")
    const a = document.createElement("a")
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }))
    a.download = "customers.csv"
    a.click()
    URL.revokeObjectURL(a.href)
    toast({ title: "Exported", description: "Customer data exported to CSV" })
  }

  const initials = (name) => name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "?"

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Customer <span className="text-[#d4af37] italic">Management</span>
          </h1>
          <p className="text-xs text-[#c0c0c0] mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>View and manage customer accounts</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => fetchCustomers(currentPage, searchTerm)} className={outlineBtn} style={{ borderRadius: "4px" }}>
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
          <button onClick={exportCSV} className={outlineBtn} style={{ borderRadius: "4px" }}>
            <Download className="h-3.5 w-3.5" /> Export
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        {/* Customer List */}
        <div className="flex-1 min-w-0">
          <div className="bg-[#111111] border border-[#262626]" style={{ borderRadius: "8px" }}>
            {/* Search + Sort */}
            <div className="p-4 border-b border-[#262626] flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888]" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`${inputCls} pl-9 w-full`}
                  style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}
                />
              </div>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif", minWidth: "140px" }}>
                <option value="recent">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name-asc">Name (A–Z)</option>
                <option value="name-desc">Name (Z–A)</option>
              </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-[#0d0d0d] border-b border-[#262626]">
                  <tr>
                    {["Customer", "Role", "Joined", ""].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-[10px] font-medium tracking-widest uppercase text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1a1a1a]">
                  {loading ? (
                    <tr><td colSpan={4} className="py-10 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <RefreshCw className="h-4 w-4 text-[#d4af37] animate-spin" />
                        <span className="text-xs text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Loading...</span>
                      </div>
                    </td></tr>
                  ) : sorted.length === 0 ? (
                    <tr><td colSpan={4} className="py-10 text-center text-xs text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>No customers found</td></tr>
                  ) : sorted.map((c) => (
                    <tr
                      key={c._id}
                      className={`hover:bg-[#1a1a1a] cursor-pointer transition-colors ${selectedCustomer?._id === c._id ? "bg-[#1a1a1a]" : ""}`}
                      onClick={() => setSelectedCustomer(c)}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-[#d4af37] text-xs font-bold">{initials(c.name)}</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-[#fafafa]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{c.name}</div>
                            <div className="text-xs text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{c.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase border capitalize ${c.role === "admin" ? "bg-[#d4af37]/10 border-[#d4af37]/30 text-[#d4af37]" : "bg-[#262626] border-[#333] text-[#c0c0c0]"}`} style={{ borderRadius: "3px", fontFamily: "'Montserrat', sans-serif" }}>
                          {c.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {new Date(c.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setConfirmDelete(c)} className="text-[#777] hover:text-red-400 transition-colors p-1">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-4 py-3 border-t border-[#262626] flex items-center justify-between">
              <p className="text-xs text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {customers.length} of {total} customers{totalPages > 1 && ` (Page ${currentPage}/${totalPages})`}
              </p>
              <div className="flex gap-2">
                <button onClick={() => { const p = currentPage - 1; setCurrentPage(p); fetchCustomers(p, searchTerm) }} disabled={currentPage <= 1 || loading} className={outlineBtn} style={{ borderRadius: "4px" }}>Prev</button>
                <button onClick={() => { const p = currentPage + 1; setCurrentPage(p); fetchCustomers(p, searchTerm) }} disabled={currentPage >= totalPages || loading} className={outlineBtn} style={{ borderRadius: "4px" }}>Next</button>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Detail Panel */}
        <div className="w-full md:w-72 flex-shrink-0">
          {selectedCustomer ? (
            <div className="bg-[#111111] border border-[#262626] sticky top-4" style={{ borderRadius: "8px" }}>
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#262626] bg-[#0d0d0d]">
                <p className="text-xs font-semibold tracking-widest uppercase text-[#fafafa]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Customer Details</p>
                <button onClick={() => setSelectedCustomer(null)} className="text-[#888] hover:text-[#fafafa] transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center">
                    <span className="text-[#d4af37] text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{initials(selectedCustomer.name)}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>{selectedCustomer.name}</h3>
                    <span className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase border capitalize ${selectedCustomer.role === "admin" ? "bg-[#d4af37]/10 border-[#d4af37]/30 text-[#d4af37]" : "bg-[#262626] border-[#333] text-[#c0c0c0]"}`} style={{ borderRadius: "3px", fontFamily: "'Montserrat', sans-serif" }}>
                      {selectedCustomer.role}
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  <div className="flex items-center gap-2 text-[#c0c0c0]">
                    <Mail className="h-3.5 w-3.5 text-[#d4af37]/60 flex-shrink-0" />
                    <span className="truncate">{selectedCustomer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#c0c0c0]">
                    <Calendar className="h-3.5 w-3.5 text-[#d4af37]/60 flex-shrink-0" />
                    <span>Joined {new Date(selectedCustomer.createdAt).toLocaleDateString()}</span>
                  </div>
                  {selectedCustomer.updatedAt && (
                    <div className="flex items-center gap-2 text-[#c0c0c0]">
                      <Calendar className="h-3.5 w-3.5 text-[#d4af37]/60 flex-shrink-0" />
                      <span>Updated {new Date(selectedCustomer.updatedAt).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-[#262626] pt-4">
                  <p className="text-[10px] tracking-widest uppercase text-[#888] mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Customer ID</p>
                  <code className="text-[10px] text-[#c0c0c0] font-mono break-all">{selectedCustomer._id}</code>
                </div>

                <button
                  onClick={() => setConfirmDelete(selectedCustomer)}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold tracking-widest uppercase border border-red-900/50 text-red-400 hover:bg-red-900/10 transition-all"
                  style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete Customer
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[#111111] border border-[#262626] flex flex-col items-center justify-center h-48 text-center" style={{ borderRadius: "8px" }}>
              <Users className="h-8 w-8 text-[#777] mb-3" />
              <p className="text-sm text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Select a customer</p>
              <p className="text-xs text-[#777] mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111111] border border-[#262626] w-full max-w-sm" style={{ borderRadius: "8px" }}>
            <div className="p-5 border-b border-[#262626] bg-[#0d0d0d]">
              <h3 className="font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>Delete Customer</h3>
            </div>
            <div className="p-5">
              <p className="text-sm text-[#c0c0c0] mb-5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Are you sure you want to delete <span className="text-[#fafafa] font-semibold">{confirmDelete.name}</span>? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmDelete(null)} className={`${outlineBtn} flex-1 justify-center`} style={{ borderRadius: "4px" }}>Cancel</button>
                <button
                  onClick={() => deleteCustomer(confirmDelete._id)}
                  disabled={deleteLoading}
                  className={`${dangerBtn} flex-1 justify-center`}
                  style={{ borderRadius: "4px" }}
                >
                  {deleteLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
