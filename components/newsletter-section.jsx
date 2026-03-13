"use client"

import { useState } from "react"
import { toast } from "@/hooks/use-toast"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setEmail("")
      toast({
        title: "Successfully Subscribed!",
        description: "Welcome to AyeshaAslam's exclusive fragrance world.",
      })
    }, 1000)
  }

  return (
    <section className="py-20 bg-[#0d0d0d] relative overflow-hidden">
      {/* Gold ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#d4af37]/5 blur-3xl pointer-events-none" />

      {/* Decorative border lines */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-[#d4af37]/20" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-[#d4af37]/20" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-[700px] text-center">
          <span
            className="text-xs tracking-[0.3em] text-[#d4af37] uppercase mb-4 block"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Stay Updated
          </span>

          <h2
            className="text-4xl md:text-5xl font-bold text-[#fafafa] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Join Our <span className="text-[#d4af37] italic">Exclusive</span> List
          </h2>

          <p
            className="text-[#a1a1a1] text-sm leading-relaxed mb-8 max-w-md mx-auto"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Subscribe to receive early access to new arrivals, exclusive discounts, and expert fragrance tips delivered straight to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-4 text-sm bg-[#111111] border border-[#262626] text-[#fafafa] placeholder-[#a1a1a1] focus:outline-none focus:border-[#d4af37] transition-colors"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                borderRadius: "4px",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                backgroundColor: "#d4af37",
                color: "#0a0a0a",
                border: "none",
                cursor: "pointer",
                borderRadius: "4px",
                letterSpacing: "0.1em",
                whiteSpace: "nowrap",
              }}
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          <p
            className="mt-4 text-xs text-[#a1a1a1]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  )
}
