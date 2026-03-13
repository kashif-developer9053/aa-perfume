"use client"
import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const particleContainerRef = useRef(null)

  useEffect(() => {
    const container = particleContainerRef.current
    if (!container) return

    const particles = []
    const count = 25

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div")
      const size = Math.random() * 5 + 2
      const left = Math.random() * 100
      const delay = Math.random() * 8
      const duration = Math.random() * 6 + 4
      const opacity = Math.random() * 0.5 + 0.1

      particle.style.cssText = `
        position: absolute;
        left: ${left}%;
        bottom: -10px;
        width: ${size}px;
        height: ${size}px;
        background-color: #d4af37;
        border-radius: 50%;
        opacity: ${opacity};
        animation: float-up ${duration}s ${delay}s linear infinite;
        pointer-events: none;
      `
      container.appendChild(particle)
      particles.push(particle)
    }

    return () => {
      particles.forEach(p => { if (p.parentNode) p.parentNode.removeChild(p) })
    }
  }, [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] flex items-center">
      {/* Particle container */}
      <div ref={particleContainerRef} className="absolute inset-0 z-0 overflow-hidden" />

      {/* Ambient gold glow effects */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#d4af37]/5 blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-[#d4af37]/5 blur-3xl pointer-events-none z-0" />

      {/* Background perfume image (right side) */}
      <div
        className="absolute right-0 top-0 h-full w-1/2 bg-cover bg-center opacity-30 md:opacity-40"
        style={{
          backgroundImage: 'url("/images/bg.png")',
          maskImage: 'linear-gradient(to left, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">

          {/* Left: Text content */}
          <div className="flex flex-col justify-center">
            {/* Premium badge */}
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-8 bg-[#d4af37]" />
              <span
                className="text-xs tracking-[0.3em] text-[#d4af37] uppercase font-medium"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Premium Collection
              </span>
              <div className="h-px w-8 bg-[#d4af37]" />
            </div>

            {/* Hero headline */}
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span className="text-[#fafafa]">Discover Your</span>
              <br />
              <span className="text-[#d4af37] italic">Signature</span>
              <br />
              <span className="text-[#fafafa]">Scent</span>
            </h1>

            {/* Subheadline */}
            <p
              className="text-base md:text-lg text-[#a1a1a1] max-w-lg mb-8 leading-relaxed"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Experience the art of luxury fragrances. Our curated collection brings you the finest perfumes that define elegance and sophistication.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/products">
                <button
                  className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-105"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    backgroundColor: "#d4af37",
                    color: "#0a0a0a",
                    border: "none",
                    cursor: "pointer",
                    letterSpacing: "0.1em",
                  }}
                >
                  Explore Collection
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </Link>
              <Link href="/about">
                <button
                  className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-105"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    backgroundColor: "transparent",
                    color: "#d4af37",
                    border: "2px solid #d4af37",
                    cursor: "pointer",
                    letterSpacing: "0.1em",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#d4af37"; e.currentTarget.style.color = "#0a0a0a" }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#d4af37" }}
                >
                  Our Story
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              {[
                { value: "500+", label: "Fragrances" },
                { value: "50K+", label: "Happy Clients" },
                { value: "100%", label: "Original" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span
                    className="text-3xl font-bold text-[#d4af37]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-xs tracking-widest text-[#a1a1a1] uppercase mt-1"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

         
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
    </section>
  )
}
