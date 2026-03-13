"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Search, Edit, Trash2, ArrowUpDown, ChevronLeft, ChevronRight, Package } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import axios from "axios"

const inputCls = "bg-[#0d0d0d] border border-[#262626] text-[#fafafa] px-3 py-2 text-sm outline-none focus:border-[#d4af37] transition-colors placeholder-[#666]"
const goldBtn = "inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-widest uppercase bg-[#d4af37] text-[#0a0a0a] hover:bg-[#c9a227] transition-all"
const outlineBtn = "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold tracking-widest uppercase border border-[#262626] text-[#c0c0c0] hover:border-[#d4af37] hover:text-[#d4af37] transition-all"
const dangerBtn = "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold tracking-widest uppercase border border-red-900/50 text-red-400 hover:bg-red-900/10 transition-all"

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedIds, setSelectedIds] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalProducts, setTotalProducts] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const itemsPerPage = 10

  useEffect(() => { fetchCategories(); fetchProducts(); }, [currentPage, categoryFilter, searchQuery, statusFilter, sortField, sortDirection])

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/products/categories")
      if (res.data.success) setCategories(res.data.data)
    } catch { toast({ title: "Error", description: "Failed to load categories", variant: "destructive" }) }
  }

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({ page: currentPage, limit: itemsPerPage, sortBy: sortField, sortOrder: sortDirection })
      if (searchQuery) params.append("keyword", searchQuery)
      if (categoryFilter !== "all") params.append("category", categoryFilter)
      if (statusFilter === "Out of Stock") params.append("maxStock", 0)
      else if (statusFilter === "Low Stock") { params.append("maxStock", 10); params.append("minStock", 1) }
      else if (statusFilter === "In Stock") params.append("minStock", 11)
      const res = await axios.get(`/api/products?${params}`)
      if (res.data.success) { setProducts(res.data.data.products); setTotalPages(res.data.data.pages); setTotalProducts(res.data.data.total) }
    } catch { toast({ title: "Error", description: "Failed to load products", variant: "destructive" }) }
    finally { setIsLoading(false) }
  }

  const toggleSort = (field) => {
    if (sortField === field) setSortDirection(d => d === "asc" ? "desc" : "asc")
    else { setSortField(field); setSortDirection("asc") }
    setCurrentPage(1)
  }

  const toggleAll = () => setSelectedIds(selectedIds.length === products.length ? [] : products.map(p => p._id))
  const toggleOne = (id) => setSelectedIds(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])

  const deleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return
    try {
      const res = await axios.delete(`/api/products/${id}`)
      if (res.data.success) { toast({ title: "Product deleted" }); fetchProducts() }
    } catch { toast({ title: "Error", description: "Failed to delete", variant: "destructive" }) }
  }

  const bulkDelete = async () => {
    if (!selectedIds.length || !confirm(`Delete ${selectedIds.length} products?`)) return
    try {
      for (const id of selectedIds) await axios.delete(`/api/products/${id}`)
      toast({ title: `${selectedIds.length} products deleted` })
      setSelectedIds([]); fetchProducts()
    } catch { toast({ title: "Error", description: "Bulk delete failed", variant: "destructive" }) }
  }

  const stockLabel = (s) => {
    if (s <= 0) return { label: "Out of Stock", cls: "bg-red-900/20 border-red-700/40 text-red-400" }
    if (s <= 10) return { label: "Low Stock", cls: "bg-yellow-900/20 border-yellow-700/40 text-yellow-400" }
    return { label: "In Stock", cls: "bg-[#d4af37]/10 border-[#d4af37]/30 text-[#d4af37]" }
  }

  const SortBtn = ({ field }) => (
    <button onClick={() => toggleSort(field)} className="ml-1 text-[#888] hover:text-[#d4af37] transition-colors">
      <ArrowUpDown className={`h-3 w-3 ${sortField === field ? "text-[#d4af37]" : ""}`} />
    </button>
  )

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Product <span className="text-[#d4af37] italic">Catalog</span>
          </h1>
          <p className="text-xs text-[#c0c0c0] mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>Manage inventory, prices, and details</p>
        </div>
        <Link href="/admin/products/add">
          <button className={goldBtn} style={{ borderRadius: "4px" }}>
            <Plus className="h-3.5 w-3.5" /> Add Product
          </button>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-[#111111] border border-[#262626] p-4 flex flex-col md:flex-row gap-3 flex-wrap" style={{ borderRadius: "8px" }}>
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888]" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }}
            className={`${inputCls} pl-9 w-full`}
            style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}
          />
        </div>
        <select value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1) }} className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif", minWidth: "160px" }}>
          <option value="all">All Categories</option>
          {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1) }} className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif", minWidth: "140px" }}>
          <option value="all">All Stock</option>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
        {(searchQuery || categoryFilter !== "all" || statusFilter !== "all") && (
          <button onClick={() => { setSearchQuery(""); setCategoryFilter("all"); setStatusFilter("all"); setCurrentPage(1) }} className={outlineBtn} style={{ borderRadius: "4px" }}>
            Clear
          </button>
        )}
        {selectedIds.length > 0 && (
          <button onClick={bulkDelete} className={dangerBtn} style={{ borderRadius: "4px" }}>
            <Trash2 className="h-3.5 w-3.5" /> Delete {selectedIds.length}
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-[#111111] border border-[#262626] overflow-hidden" style={{ borderRadius: "8px" }}>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#0d0d0d] border-b border-[#262626]">
              <tr>
                <th className="px-4 py-3 w-10">
                  <div
                    className={`w-4 h-4 border flex items-center justify-center cursor-pointer transition-all ${products.length > 0 && selectedIds.length === products.length ? "bg-[#d4af37] border-[#d4af37]" : "bg-[#0d0d0d] border-[#262626]"}`}
                    style={{ borderRadius: "2px" }}
                    onClick={toggleAll}
                  >
                    {products.length > 0 && selectedIds.length === products.length && (
                      <svg className="w-2.5 h-2.5 text-[#0a0a0a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-[10px] font-medium tracking-widest uppercase text-[#888] flex items-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>Product <SortBtn field="name" /></span>
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-medium tracking-widest uppercase text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Category</th>
                <th className="px-4 py-3 text-right">
                  <span className="text-[10px] font-medium tracking-widest uppercase text-[#888] flex items-center justify-end" style={{ fontFamily: "'Montserrat', sans-serif" }}>Price <SortBtn field="price" /></span>
                </th>
                <th className="px-4 py-3 text-right">
                  <span className="text-[10px] font-medium tracking-widest uppercase text-[#888] flex items-center justify-end" style={{ fontFamily: "'Montserrat', sans-serif" }}>Stock <SortBtn field="stock" /></span>
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-medium tracking-widest uppercase text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Status</th>
                <th className="px-4 py-3 text-right text-[10px] font-medium tracking-widest uppercase text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1a1a]">
              {isLoading ? (
                <tr><td colSpan={7} className="h-20 text-center text-xs text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Loading products...</td></tr>
              ) : products.length > 0 ? products.map((product) => {
                const st = stockLabel(product.stock)
                return (
                  <tr key={product._id} className="hover:bg-[#1a1a1a] transition-colors">
                    <td className="px-4 py-3">
                      <div
                        className={`w-4 h-4 border flex items-center justify-center cursor-pointer transition-all ${selectedIds.includes(product._id) ? "bg-[#d4af37] border-[#d4af37]" : "bg-[#0d0d0d] border-[#262626]"}`}
                        style={{ borderRadius: "2px" }}
                        onClick={() => toggleOne(product._id)}
                      >
                        {selectedIds.includes(product._id) && (
                          <svg className="w-2.5 h-2.5 text-[#0a0a0a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt={product.name} className="h-10 w-10 object-cover flex-shrink-0 border border-[#262626]" style={{ borderRadius: "4px" }} />
                        ) : (
                          <div className="h-10 w-10 bg-[#1a1a1a] border border-[#262626] flex items-center justify-center flex-shrink-0" style={{ borderRadius: "4px" }}>
                            <Package className="h-4 w-4 text-[#777]" />
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-[#fafafa]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{product.name}</div>
                          <div className="text-xs text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>SKU: {product._id.slice(-8)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{product.category?.name || "—"}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="text-sm font-semibold text-[#d4af37]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Rs. {product.price.toFixed(0)}</div>
                      {product.discountedPrice && (
                        <div className="text-xs text-[#888] line-through" style={{ fontFamily: "'Montserrat', sans-serif" }}>Rs. {product.discountedPrice.toFixed(0)}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-[#fafafa]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{product.stock}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase border ${st.cls}`} style={{ borderRadius: "3px", fontFamily: "'Montserrat', sans-serif" }}>
                        {st.label}
                      </span>
                      {product.featured && (
                        <span className="ml-1.5 px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase border bg-[#d4af37]/10 border-[#d4af37]/30 text-[#d4af37]" style={{ borderRadius: "3px", fontFamily: "'Montserrat', sans-serif" }}>Featured</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/products/edit/${product._id}`}>
                          <button className={outlineBtn} style={{ borderRadius: "4px" }}><Edit className="h-3 w-3" /></button>
                        </Link>
                        <button onClick={() => deleteProduct(product._id)} className={dangerBtn} style={{ borderRadius: "4px" }}><Trash2 className="h-3 w-3" /></button>
                      </div>
                    </td>
                  </tr>
                )
              }) : (
                <tr><td colSpan={7} className="h-20 text-center text-xs text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>No products found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, totalProducts)} of {totalProducts} products
          </p>
          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1} className={outlineBtn} style={{ borderRadius: "4px" }}>
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let p = currentPage - 2 + i
              if (p < 1) p += 5
              if (p > totalPages) p -= 5
              return p > 0 && p <= totalPages ? (
                <button key={p} onClick={() => setCurrentPage(p)} className={p === currentPage ? goldBtn : outlineBtn} style={{ borderRadius: "4px", minWidth: "32px" }}>
                  {p}
                </button>
              ) : null
            })}
            <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages} className={outlineBtn} style={{ borderRadius: "4px" }}>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
