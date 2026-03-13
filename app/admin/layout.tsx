"use client"

import { useState, useEffect, ReactNode } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  Settings,
  LogOut,
  Menu,
  X,
  Tag,
  Crown,
  Home,
  BarChart3,
  Percent,
  Ticket,
  Megaphone,
  FileText,
  UserCog,
} from "lucide-react"

interface AdminUser {
  name?: string
  email?: string
  role?: string
}

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)

  // Default open on desktop
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsSidebarOpen(true)
    }
  }, [])

  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem("user")
        if (!userData) {
          setIsAuthenticated(false)
          setIsLoading(false)
          if (pathname !== "/admin/admin-login") router.push("/admin/admin-login")
          return
        }
        const parsedUser: AdminUser = JSON.parse(userData)
        if (parsedUser.role !== "admin") {
          setIsAuthenticated(false)
          setIsLoading(false)
          if (pathname !== "/admin/admin-login") router.push("/admin/admin-login")
          return
        }
        setAdminUser(parsedUser)
        setIsAuthenticated(true)
        setIsLoading(false)
      } catch {
        setIsAuthenticated(false)
        setIsLoading(false)
        localStorage.removeItem("user")
        if (pathname !== "/admin/admin-login") router.push("/admin/admin-login")
      }
    }

    if (pathname !== "/admin/admin-login") {
      checkAuth()
    } else {
      setIsLoading(false)
    }
  }, [router, pathname])

  useEffect(() => {
    const handleAuthChange = () => {
      if (pathname !== "/admin/admin-login") {
        const userData = localStorage.getItem("user")
        if (!userData) {
          setIsAuthenticated(false)
          setAdminUser(null)
          router.push("/admin/admin-login")
        } else {
          try {
            const parsedUser: AdminUser = JSON.parse(userData)
            if (parsedUser.role === "admin") {
              setAdminUser(parsedUser)
              setIsAuthenticated(true)
            } else {
              setIsAuthenticated(false)
              setAdminUser(null)
              router.push("/admin/admin-login")
            }
          } catch {
            setIsAuthenticated(false)
            setAdminUser(null)
            localStorage.removeItem("user")
            router.push("/admin/admin-login")
          }
        }
      }
    }
    window.addEventListener("authChanged", handleAuthChange)
    return () => window.removeEventListener("authChanged", handleAuthChange)
  }, [router, pathname])

  const handleLogout = async () => {
    if (isLoggingOut) return
    setIsLoggingOut(true)
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" })
    } catch {}
    localStorage.removeItem("user")
    setIsAuthenticated(false)
    setAdminUser(null)
    window.dispatchEvent(new CustomEvent("authChanged"))
    router.push("/admin/admin-login")
    setIsLoggingOut(false)
  }

  const routes = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
    { href: "/admin/customers", label: "Customers", icon: Users },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/products/categories", label: "Categories", icon: Tag },
    { href: "/admin/discounts", label: "Discounts", icon: Percent },
    { href: "/admin/promotions", label: "Promotions", icon: Megaphone },
    { href: "/admin/coupons", label: "Coupons", icon: Ticket },
    { href: "/admin/users", label: "Users", icon: UserCog },
    { href: "/admin/reports", label: "Reports", icon: FileText },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ]

  const currentRoute = routes.find(r => r.href === pathname)
    || routes.find(r => r.href !== "/admin" && pathname.startsWith(r.href + "/"))

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0a0a0a]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
          <span className="text-[#c0c0c0] text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Loading admin panel...
          </span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated && pathname !== "/admin/admin-login") return null
  if (pathname === "/admin/admin-login") {
    return <div className="min-h-screen bg-[#0a0a0a]">{children}</div>
  }

  // Sidebar nav — rendered in both desktop (in-flow) and mobile (fixed overlay)
  const navLinks = (onClickLink?: () => void) => (
    <div className="flex flex-col h-full" style={{ width: 256 }}>
      {/* Brand */}
      <div className="px-5 py-4 border-b border-[#262626] flex-shrink-0">
        <Link href="/admin" className="flex items-center gap-3" onClick={onClickLink}>
          <div className="w-8 h-8 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center flex-shrink-0">
            <Crown className="h-4 w-4 text-[#d4af37]" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>Admin Panel</p>
            <p className="text-[10px] text-[#888] tracking-widest uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>Aslam Baig Fragrance</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {routes.map((route) => {
          const isActive = pathname === route.href
            || (route.href !== "/admin" && pathname.startsWith(route.href + "/"))
          return (
            <Link
              key={route.href}
              href={route.href}
              onClick={onClickLink}
              className={`flex items-center gap-3 px-3 py-2.5 text-xs font-medium tracking-wide uppercase transition-colors border-l-2 pl-[10px] ${
                isActive
                  ? "bg-[#d4af37]/10 border-[#d4af37] text-[#d4af37]"
                  : "border-transparent text-[#c0c0c0] hover:bg-[#1a1a1a] hover:text-[#fafafa]"
              }`}
              style={{ borderRadius: "0 4px 4px 0", fontFamily: "'Montserrat', sans-serif" }}
            >
              <route.icon className="h-4 w-4 flex-shrink-0" />
              <span className="whitespace-nowrap">{route.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-[#262626] space-y-1 flex-shrink-0">
        {adminUser && (
          <div className="flex items-center gap-3 px-3 py-2 mb-1">
            <div className="w-7 h-7 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
              <span className="text-[#d4af37] text-[10px] font-bold">{adminUser.name?.charAt(0)?.toUpperCase()}</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#fafafa] truncate" style={{ fontFamily: "'Montserrat', sans-serif" }}>{adminUser.name}</p>
              <p className="text-[10px] text-[#888] truncate" style={{ fontFamily: "'Montserrat', sans-serif" }}>{adminUser.email}</p>
            </div>
          </div>
        )}
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 text-xs text-[#c0c0c0] hover:text-[#fafafa] hover:bg-[#1a1a1a] transition-colors tracking-wide uppercase whitespace-nowrap rounded"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <Home className="h-4 w-4 flex-shrink-0" /> Back to Store
        </Link>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center gap-3 px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-900/10 transition-colors tracking-wide uppercase disabled:opacity-60 whitespace-nowrap rounded"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  )

  return (
    /*
      h-screen + flex col: fills viewport height exactly.
      overflow-hidden: prevents document-level scroll — only <main> scrolls.
    */
    <div className="h-screen overflow-hidden flex flex-col bg-[#0a0a0a]">

      {/* ── Header (in normal flow, not fixed) ── */}
      <header
        className="flex-shrink-0 flex items-center gap-3 border-b border-[#262626] bg-[#0d0d0d] px-4"
        style={{ height: 56, zIndex: 50 }}
      >
        {/* Toggle — simple onClick, no CSS tricks */}
        <button
          type="button"
          onClick={() => setIsSidebarOpen(v => !v)}
          className="w-8 h-8 flex items-center justify-center text-[#c0c0c0] hover:text-[#fafafa] hover:bg-[#1a1a1a] rounded transition-colors flex-shrink-0"
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? <X size={16} /> : <Menu size={16} />}
        </button>

        <Link href="/admin" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-6 h-6 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center">
            <Crown size={12} className="text-[#d4af37]" />
          </div>
          <span className="text-sm font-bold text-[#fafafa] hidden sm:block" style={{ fontFamily: "'Playfair Display', serif" }}>
            Admin Panel
          </span>
        </Link>

        {currentRoute && (
          <>
            <span className="text-[#777] hidden sm:block select-none">|</span>
            <span className="text-xs text-[#c0c0c0] tracking-widest uppercase hidden sm:block" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {currentRoute.label}
            </span>
          </>
        )}

        <div className="flex-1" />

        {adminUser && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center flex-shrink-0">
              <span className="text-[#d4af37] text-[10px] font-bold">
                {adminUser.name?.charAt(0)?.toUpperCase()}
              </span>
            </div>
            <span className="text-xs text-[#c0c0c0] hidden md:block truncate max-w-[120px]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {adminUser.name}
            </span>
          </div>
        )}
      </header>

      {/* ── Body row ── */}
      <div className="flex flex-1 overflow-hidden">

        {/*
          DESKTOP sidebar — in the flex flow.
          Conditionally rendered: when isSidebarOpen is false, this element
          is removed from the DOM entirely so <main> naturally expands to fill width.
          The `hidden lg:block` ensures it only occupies space on lg+ screens.
        */}
        {isSidebarOpen && (
          <aside className="hidden lg:flex flex-col flex-shrink-0 bg-[#0d0d0d] border-r border-[#262626] overflow-y-auto overflow-x-hidden" style={{ width: 256 }}>
            {navLinks()}
          </aside>
        )}

        {/*
          MOBILE sidebar — fixed overlay, always in DOM for smooth translate animation.
          lg:hidden ensures it's invisible and non-interactive on desktop.
        */}
        <aside
          className={`lg:hidden flex flex-col bg-[#0d0d0d] border-r border-[#262626] overflow-y-auto overflow-x-hidden transition-transform duration-200 ease-in-out`}
          style={{
            position: "fixed",
            top: 56,
            left: 0,
            bottom: 0,
            width: 256,
            zIndex: 40,
            transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
          }}
        >
          {navLinks(() => setIsSidebarOpen(false))}
        </aside>

        {/* Mobile backdrop */}
        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/60 z-30"
            style={{ top: 56 }}
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main — flex-1 fills remaining width, overflow-auto provides scroll */}
        <main className="flex-1 overflow-auto p-6 bg-[#0a0a0a]">
          {children}
        </main>

      </div>
    </div>
  )
}
