"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, Crown } from "lucide-react"
import { toast } from "../../../hooks/use-toast"

export default function AdminLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email.trim(), password: formData.password, rememberMe: formData.rememberMe }),
        credentials: "include",
      })
      const data = await response.json()
      if (!response.ok || !data.success) throw new Error(data.message || "Login failed")
      if (data.data.role !== "admin") throw new Error("Access denied: Admin privileges required")
      localStorage.setItem("user", JSON.stringify(data.data))
      window.dispatchEvent(new CustomEvent("authChanged"))
      toast({ title: "Welcome back", description: `Signed in as ${data.data.name}` })
      setTimeout(() => router.push("/admin"), 100)
    } catch (error) {
      toast({ title: "Login Failed", description: error.message || "An error occurred during login", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#d4af37]/3 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 mb-4">
            <Crown className="h-8 w-8 text-[#d4af37]" />
          </div>
          <h1 className="text-3xl font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Admin <span className="text-[#d4af37] italic">Portal</span>
          </h1>
          <div className="mt-3 h-px w-12 bg-[#d4af37] mx-auto" />
          <p className="mt-3 text-sm text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Chocolate Factory — Management Console
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#111111] border border-[#262626] p-8" style={{ borderRadius: "8px" }}>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-xs tracking-widest uppercase text-[#c0c0c0] block mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888]" />
                <input
                  name="email"
                  type="email"
                  placeholder="admin@chocolatefactory.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="w-full bg-[#0d0d0d] border border-[#262626] text-[#fafafa] pl-10 pr-4 py-3 text-sm outline-none focus:border-[#d4af37] transition-colors placeholder-[#666]"
                  style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs tracking-widest uppercase text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888]" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="w-full bg-[#0d0d0d] border border-[#262626] text-[#fafafa] pl-10 pr-12 py-3 text-sm outline-none focus:border-[#d4af37] transition-colors placeholder-[#666]"
                  style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#c0c0c0] transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 border flex items-center justify-center cursor-pointer transition-all flex-shrink-0 ${formData.rememberMe ? "bg-[#d4af37] border-[#d4af37]" : "bg-[#0d0d0d] border-[#262626]"}`}
                style={{ borderRadius: "3px" }}
                onClick={() => setFormData((p) => ({ ...p, rememberMe: !p.rememberMe }))}
              >
                {formData.rememberMe && (
                  <svg className="w-3 h-3 text-[#0a0a0a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <label
                className="text-xs text-[#c0c0c0] cursor-pointer select-none"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                onClick={() => setFormData((p) => ({ ...p, rememberMe: !p.rememberMe }))}
              >
                Remember me for 30 days
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold tracking-widest uppercase bg-[#d4af37] text-[#0a0a0a] hover:bg-[#c9a227] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}
            >
              {isLoading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-[#0a0a0a] border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in as Admin"
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#262626] text-center">
            <p className="text-xs text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Not an admin?{" "}
              <a href="/login" className="text-[#d4af37] hover:underline transition-colors">
                Go to user login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
