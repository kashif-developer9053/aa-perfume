"use client"

import { useState } from "react"
import { Search, UserCheck, UserX, Mail, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react"

const inputCls = "bg-[#0d0d0d] border border-[#262626] text-[#fafafa] px-3 py-2.5 text-sm outline-none focus:border-[#d4af37] transition-colors placeholder-[#666]"
const outlineBtn = "inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-widest uppercase border border-[#262626] text-[#c0c0c0] hover:border-[#d4af37] hover:text-[#d4af37] transition-all disabled:opacity-50"
const goldBtn = "inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-widest uppercase bg-[#d4af37] text-[#0a0a0a] hover:bg-[#c9a227] transition-all"

const statusStyle = (status) => {
  if (status === "Active") return "bg-green-900/30 text-green-400 border border-green-800/40"
  if (status === "Blocked") return "bg-red-900/30 text-red-400 border border-red-800/40"
  return "bg-[#1a1a1a] text-[#c0c0c0] border border-[#262626]"
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [notice, setNotice] = useState(null)
  const itemsPerPage = 10

  const allUsers = [
    { id: 1, name: "Sarah Johnson", email: "sarah.johnson@example.com", status: "Active", role: "Customer", orders: 12, lastActive: "2023-05-15 14:30", joined: "2022-03-10" },
    { id: 2, name: "Michael Chen", email: "michael.chen@example.com", status: "Active", role: "Customer", orders: 8, lastActive: "2023-05-14 09:45", joined: "2022-05-22" },
    { id: 3, name: "Emily Rodriguez", email: "emily.rodriguez@example.com", status: "Active", role: "Customer", orders: 5, lastActive: "2023-05-10 16:20", joined: "2022-07-15" },
    { id: 4, name: "David Kim", email: "david.kim@example.com", status: "Blocked", role: "Customer", orders: 0, lastActive: "2023-04-05 11:30", joined: "2022-08-03" },
    { id: 5, name: "Jessica Taylor", email: "jessica.taylor@example.com", status: "Active", role: "Customer", orders: 15, lastActive: "2023-05-15 10:15", joined: "2022-01-18" },
    { id: 6, name: "Robert Johnson", email: "robert.johnson@example.com", status: "Inactive", role: "Customer", orders: 3, lastActive: "2023-03-20 14:30", joined: "2022-04-12" },
    { id: 7, name: "Amanda Lee", email: "amanda.lee@example.com", status: "Active", role: "Customer", orders: 7, lastActive: "2023-05-12 09:45", joined: "2022-06-30" },
    { id: 8, name: "Thomas Wilson", email: "thomas.wilson@example.com", status: "Active", role: "Customer", orders: 9, lastActive: "2023-05-14 17:30", joined: "2022-02-15" },
    { id: 9, name: "Olivia Martinez", email: "olivia.martinez@example.com", status: "Active", role: "Customer", orders: 11, lastActive: "2023-05-13 13:20", joined: "2022-03-28" },
    { id: 10, name: "William Brown", email: "william.brown@example.com", status: "Inactive", role: "Customer", orders: 2, lastActive: "2023-04-10 10:45", joined: "2022-05-05" },
    { id: 11, name: "Sophia Garcia", email: "sophia.garcia@example.com", status: "Active", role: "Customer", orders: 6, lastActive: "2023-05-11 15:30", joined: "2022-07-22" },
    { id: 12, name: "James Miller", email: "james.miller@example.com", status: "Blocked", role: "Customer", orders: 0, lastActive: "2023-03-15 09:10", joined: "2022-09-10" },
  ]

  const filteredUsers = allUsers.filter(user => {
    if (searchQuery && !user.name.toLowerCase().includes(searchQuery.toLowerCase()) && !user.email.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (statusFilter !== "all" && user.status !== statusFilter) return false
    return true
  })

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let av = a[sortField], bv = b[sortField]
    if (typeof av === "string") { av = av.toLowerCase(); bv = bv.toLowerCase() }
    if (av < bv) return sortDirection === "asc" ? -1 : 1
    if (av > bv) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage)
  const paginatedUsers = sortedUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const toggleSort = (field) => {
    if (sortField === field) setSortDirection(d => d === "asc" ? "desc" : "asc")
    else { setSortField(field); setSortDirection("asc") }
  }

  const toggleUserStatus = (userId, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Blocked" : "Active"
    setNotice(`User has been ${newStatus.toLowerCase()} successfully`)
    setTimeout(() => setNotice(null), 3000)
  }

  const sendEmail = (email) => {
    setNotice(`Preparing to send email to ${email}`)
    setTimeout(() => setNotice(null), 3000)
  }

  const SortIcon = ({ field }) => sortField === field ? <ArrowUpDown className="h-3 w-3 text-[#d4af37]" /> : <ArrowUpDown className="h-3 w-3 text-[#888]" />

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>
            System <span className="text-[#d4af37] italic">Users</span>
          </h1>
          <p className="text-xs text-[#c0c0c0] mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>Manage user accounts and permissions</p>
        </div>
      </div>

      {notice && (
        <div className="px-3 py-2 text-xs bg-green-900/20 border border-green-700/40 text-green-400" style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}>
          {notice}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#888]" />
          <input
            type="search"
            placeholder="Search users..."
            className={`${inputCls} pl-9 w-full`}
            style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1) }}
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1) }}
          className={`${inputCls} w-[160px]`}
          style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}
        >
          <option value="all">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Blocked">Blocked</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#111111] border border-[#262626] overflow-hidden" style={{ borderRadius: "8px" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0d0d0d] border-b border-[#262626]">
                {[
                  { label: "User", field: "name" },
                  { label: "Status", field: "status" },
                  { label: "Orders", field: "orders" },
                  { label: "Last Active", field: "lastActive" },
                  { label: "Joined", field: "joined" },
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
              {paginatedUsers.length > 0 ? paginatedUsers.map(user => (
                <tr key={user.id} className="hover:bg-[#0d0d0d]/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/30 flex items-center justify-center text-xs font-bold text-[#d4af37]">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#fafafa]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{user.name}</div>
                        <div className="text-xs text-[#888]">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 ${statusStyle(user.status)}`} style={{ borderRadius: "3px", fontFamily: "'Montserrat', sans-serif" }}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#fafafa] text-right" style={{ fontFamily: "'Montserrat', sans-serif" }}>{user.orders}</td>
                  <td className="px-4 py-3 text-xs text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{user.lastActive}</td>
                  <td className="px-4 py-3 text-xs text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{user.joined}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => toggleUserStatus(user.id, user.status)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs border border-[#262626] text-[#c0c0c0] hover:border-[#d4af37] hover:text-[#d4af37] transition-all"
                        style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}
                        title={user.status === "Active" ? "Block User" : "Activate User"}
                      >
                        {user.status === "Active" ? <UserX className="h-3 w-3" /> : <UserCheck className="h-3 w-3" />}
                        {user.status === "Active" ? "Block" : "Activate"}
                      </button>
                      <button
                        onClick={() => sendEmail(user.email)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs border border-[#262626] text-[#c0c0c0] hover:border-[#d4af37] hover:text-[#d4af37] transition-all"
                        style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}
                      >
                        <Mail className="h-3 w-3" /> Email
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-xs text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    No users found.
                  </td>
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
            Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1} className={outlineBtn} style={{ borderRadius: "4px", padding: "6px 10px" }}>
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={page === currentPage ? goldBtn : outlineBtn}
                style={{ borderRadius: "4px", padding: "6px 12px" }}
              >
                {page}
              </button>
            ))}
            <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages} className={outlineBtn} style={{ borderRadius: "4px", padding: "6px 10px" }}>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
