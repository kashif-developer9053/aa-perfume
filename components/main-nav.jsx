"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { ShoppingCart, User, Search, Menu, X, LogOut, UserCircle, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "@/hooks/use-toast"
import { useCart } from "@/context/CartContext"

export default function MainNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { cartCount } = useCart()

  const routes = [
    { href: "/", label: "Home", active: pathname === "/" },
    { href: "/products", label: "Collection", active: pathname === "/products" },
    { href: "/categories", label: "Categories", active: pathname === "/categories" },
    { href: "/about", label: "About", active: pathname === "/about" },
    { href: "/contact", label: "Contact", active: pathname === "/contact" },
  ]

  useEffect(() => {
    checkAuthStatus()
  }, [])

  useEffect(() => {
    const handleAuthChange = () => { checkAuthStatus() }
    window.addEventListener('authChanged', handleAuthChange)
    return () => { window.removeEventListener('authChanged', handleAuthChange) }
  }, [])

  const checkAuthStatus = () => {
    try {
      const userData = localStorage.getItem('user')
      if (userData) {
        setUser(JSON.parse(userData))
      } else {
        setUser(null)
      }
    } catch (error) {
      setUser(null)
      localStorage.removeItem('user')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
      localStorage.removeItem('user')
      setUser(null)
      toast({ title: "Logged out successfully", description: "See you next time!" })
      window.dispatchEvent(new CustomEvent('authChanged'))
      router.push("/")
    } catch (error) {
      localStorage.removeItem('user')
      setUser(null)
      toast({ title: "Logged out", description: "You have been logged out" })
      window.dispatchEvent(new CustomEvent('authChanged'))
      router.push("/")
    } finally {
      setIsLoggingOut(false)
    }
  }

  const getUserInitials = (name) => {
    if (!name) return "U"
    return name.split(" ").map(w => w.charAt(0).toUpperCase()).slice(0, 2).join("")
  }

  const renderUserMenu = () => {
    if (loading) {
      return <div className="h-8 w-8 rounded-full bg-[#1a1a1a] animate-pulse" />
    }

    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 h-auto p-2 hover:bg-[#1a1a1a]">
              <Avatar className="h-8 w-8 border border-[#d4af37]">
                <AvatarFallback className="bg-[#d4af37] text-[#0a0a0a] text-sm font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {getUserInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:block text-sm font-medium text-[#fafafa]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {user.name}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-[#111111] border border-[#262626] shadow-xl">
            <div className="flex items-center gap-2 p-2 border-b border-[#262626]">
              <Avatar className="h-8 w-8 border border-[#d4af37]">
                <AvatarFallback className="bg-[#d4af37] text-[#0a0a0a] text-sm font-semibold">
                  {getUserInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[#fafafa]">{user.name}</span>
                <span className="text-xs text-[#a1a1a1]">{user.email}</span>
              </div>
            </div>
            <DropdownMenuItem asChild className="text-[#fafafa] hover:bg-[#1a1a1a] hover:text-[#d4af37] cursor-pointer">
              <Link href="/profile" className="flex items-center gap-2">
                <UserCircle className="h-4 w-4" />
                My Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="text-[#fafafa] hover:bg-[#1a1a1a] hover:text-[#d4af37] cursor-pointer">
              <Link href="/my-orders" className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                My Orders
              </Link>
            </DropdownMenuItem>
            {user.role === 'admin' && (
              <DropdownMenuItem asChild className="text-[#fafafa] hover:bg-[#1a1a1a] hover:text-[#d4af37] cursor-pointer">
                <Link href="/admin" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Admin Panel
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator className="bg-[#262626]" />
            <DropdownMenuItem
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-2 text-red-400 hover:bg-[#1a1a1a] hover:text-red-300 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              {isLoggingOut ? "Logging out..." : "Logout"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-[#1a1a1a] text-[#fafafa] hover:text-[#d4af37]">
            <User className="h-5 w-5" />
            <span className="sr-only">User menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-[#111111] border border-[#262626] shadow-xl">
          <DropdownMenuItem asChild className="text-[#fafafa] hover:bg-[#1a1a1a] hover:text-[#d4af37] cursor-pointer">
            <Link href="/login">Login</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="text-[#fafafa] hover:bg-[#1a1a1a] hover:text-[#d4af37] cursor-pointer">
            <Link href="/track-order">Track Order</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="text-[#fafafa] hover:bg-[#1a1a1a] hover:text-[#d4af37] cursor-pointer">
            <Link href="/register">Register</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  const renderMobileUserSection = () => {
    if (user) {
      return (
        <div className="flex flex-col space-y-3 pt-4 border-t border-[#262626]">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-[#d4af37]">
              <AvatarFallback className="bg-[#d4af37] text-[#0a0a0a] font-semibold">
                {getUserInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-[#fafafa]">{user.name}</p>
              <p className="text-xs text-[#a1a1a1]">{user.email}</p>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Link href="/profile" className="text-sm font-medium text-[#fafafa] hover:text-[#d4af37] flex items-center gap-2 transition-colors" onClick={() => setIsMenuOpen(false)}>
              <UserCircle className="h-4 w-4" /> My Profile
            </Link>
            <Link href="/orders" className="text-sm font-medium text-[#fafafa] hover:text-[#d4af37] flex items-center gap-2 transition-colors" onClick={() => setIsMenuOpen(false)}>
              <ShoppingCart className="h-4 w-4" /> My Orders
            </Link>
            {user.role === 'admin' && (
              <Link href="/admin" className="text-sm font-medium text-[#fafafa] hover:text-[#d4af37] flex items-center gap-2 transition-colors" onClick={() => setIsMenuOpen(false)}>
                <Settings className="h-4 w-4" /> Admin Panel
              </Link>
            )}
            <button
              onClick={() => { setIsMenuOpen(false); handleLogout() }}
              disabled={isLoggingOut}
              className="text-sm font-medium text-red-400 hover:text-red-300 flex items-center gap-2 text-left transition-colors"
            >
              <LogOut className="h-4 w-4" />
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className="flex items-center justify-between pt-4 border-t border-[#262626]">
        <Link href="/login" className="text-sm font-medium text-[#fafafa] hover:text-[#d4af37] transition-colors" onClick={() => setIsMenuOpen(false)}>
          Login
        </Link>
        <Link href="/register" className="text-sm font-medium text-[#fafafa] hover:text-[#d4af37] transition-colors" onClick={() => setIsMenuOpen(false)}>
          Register
        </Link>
      </div>
    )
  }

  return (
    <div className="flex w-full items-center justify-between">
      {/* Left: Mobile menu + Logo */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus:bg-transparent md:hidden text-[#fafafa] hover:text-[#d4af37]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle Menu</span>
        </Button>

        {/* Logo */}
        <Link href="/" className="mr-8 flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Aslam Baig Fragrance"
            width={84}
            height={84}
            className="rounded-full object-cover"
            priority
          />
         
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden gap-8 md:flex">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm font-medium transition-all duration-300 relative group tracking-wide ${
                route.active
                  ? "text-[#d4af37]"
                  : "text-[#a1a1a1] hover:text-[#d4af37]"
              }`}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {route.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#d4af37] transition-all duration-300 ${route.active ? "w-full" : "w-0 group-hover:w-full"}`} />
            </Link>
          ))}
        </nav>
      </div>

      {/* Right: Icons */}
      <div className="hidden items-center gap-2 md:flex">
        {renderUserMenu()}
        <Button variant="ghost" size="icon" asChild className="relative hover:bg-[#1a1a1a] text-[#fafafa] hover:text-[#d4af37] transition-colors">
          <Link href="/cart">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center bg-[#d4af37] text-[#0a0a0a] font-bold border-0">
                {cartCount}
              </Badge>
            )}
            <span className="sr-only">Shopping Cart</span>
          </Link>
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute inset-x-0 top-20 z-50 w-full bg-[#0a0a0a] border-b border-[#262626] p-6 shadow-2xl md:hidden">
          <nav className="flex flex-col space-y-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`text-sm font-medium transition-colors tracking-wide ${
                  route.active ? "text-[#d4af37]" : "text-[#a1a1a1] hover:text-[#d4af37]"
                }`}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.label}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-4 border-t border-[#262626]">
              <Link href="/cart" className="relative text-[#fafafa] hover:text-[#d4af37] transition-colors">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center bg-[#d4af37] text-[#0a0a0a] font-bold border-0">
                    {cartCount}
                  </Badge>
                )}
              </Link>
            </div>
            {renderMobileUserSection()}
          </nav>
        </div>
      )}
    </div>
  )
}
