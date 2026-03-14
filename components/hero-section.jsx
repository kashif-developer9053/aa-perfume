"use client"
import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  const particleContainerRef = useRef(null)

  useEffect(() => {
    const container = particleContainerRef.current
    if (!container) return

    const particles = []
    const count = 30

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div")
      const size = Math.random() * 4 + 1.5
      const left = Math.random() * 100
      const delay = Math.random() * 10
      const duration = Math.random() * 8 + 6
      const opacity = Math.random() * 0.4 + 0.1

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

      {/* Ambient glow — left */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#d4af37]/4 blur-[120px] pointer-events-none z-0" />
      {/* Ambient glow — right */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#d4af37]/6 blur-[100px] pointer-events-none z-0" />

      {/* Subtle diagonal lines texture */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #d4af37 0px, #d4af37 1px, transparent 1px, transparent 60px)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 items-center min-h-[88vh]">

          {/* ── LEFT: Text ── */}
          <div className="flex flex-col justify-center lg:pr-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="h-px w-10 bg-[#d4af37]" />
              <span
                className="text-[10px] tracking-[0.4em] text-[#d4af37] uppercase font-semibold"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Luxury Fragrance House
              </span>
              <div className="h-px w-10 bg-[#d4af37]" />
            </div>

            {/* Headline */}
            <h1
              className="text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.05] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span className="text-[#fafafa]">Discover Your</span>
              <br />
              <span className="italic" style={{ color: "#d4af37" }}>Signature</span>
              <br />
              <span className="text-[#fafafa]">Scent</span>
            </h1>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 max-w-[60px] bg-[#d4af37]/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
              <div className="h-px flex-1 max-w-[60px] bg-[#d4af37]/40" />
            </div>

            {/* Subheadline */}
            <p
              className="text-base md:text-lg text-[#b0b0b0] max-w-md mb-10 leading-relaxed"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Experience the art of luxury fragrances. Our curated collection brings the finest perfumes that define elegance and timeless sophistication.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-14">
              <Link href="/products">
                <button
                  className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    backgroundColor: "#d4af37",
                    color: "#0a0a0a",
                  }}
                >
                  Explore Collection
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </Link>
              <Link href="/about">
                <button
                  className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-300 hover:scale-[1.03]"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    backgroundColor: "transparent",
                    color: "#d4af37",
                    border: "1.5px solid #d4af37",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#d4af37"; e.currentTarget.style.color = "#0a0a0a" }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#d4af37" }}
                >
                  Our Story
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-10">
              {[
                { value: "500+", label: "Fragrances" },
                { value: "50K+", label: "Happy Clients" },
                { value: "100%", label: "Authentic" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-4">
                  {i > 0 && <div className="h-8 w-px bg-[#262626]" />}
                  <div className="flex flex-col">
                    <span
                      className="text-3xl font-bold text-[#d4af37]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {stat.value}
                    </span>
                    <span
                      className="text-[10px] tracking-[0.2em] text-[#888] uppercase mt-0.5"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Bottle Visual ── */}
          <div className="relative flex items-center justify-center lg:justify-end h-[560px] lg:h-auto">

            {/* Outer decorative ring */}
            <div className="absolute w-[380px] h-[380px] md:w-[440px] md:h-[440px] rounded-full border border-[#d4af37]/10" />
            {/* Mid ring */}
            <div className="absolute w-[300px] h-[300px] md:w-[360px] md:h-[360px] rounded-full border border-[#d4af37]/20" />
            {/* Inner ring */}
            <div className="absolute w-[220px] h-[220px] md:w-[280px] md:h-[280px] rounded-full border border-[#d4af37]/30" />

            {/* Radial glow behind bottle */}
            <div className="absolute w-[260px] h-[260px] rounded-full bg-[#d4af37]/8 blur-3xl" />

            {/* Corner ornaments */}
            <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-[#d4af37]/50" />
            <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-[#d4af37]/50" />

            {/* Bottle image */}
            <div className="relative z-10 flex items-end justify-center"
              style={{ filter: "drop-shadow(0 0 40px rgba(212,175,55,0.18)) drop-shadow(0 20px 60px rgba(0,0,0,0.7))" }}
            >
              <Image
                src="/images/bottle.png"
                alt="Aslam Baig Fragrance Perfume Bottle"
                width={320}
                height={480}
                className="object-contain select-none"
                style={{ maxHeight: "480px", width: "auto" }}
                priority
              />
            </div>

            {/* Floating tag — top left of bottle */}
            <div
              className="absolute top-16 left-4 md:left-10 z-20 px-4 py-2.5 border border-[#d4af37]/30"
              style={{ backgroundColor: "rgba(13,13,13,0.85)", backdropFilter: "blur(12px)" }}
            >
              <p className="text-[9px] tracking-[0.3em] text-[#d4af37] uppercase mb-0.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Collection 2026
              </p>
              <p className="text-sm font-semibold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Signature Series
              </p>
            </div>

            {/* Floating tag — bottom right of bottle */}
            <div
              className="absolute bottom-16 right-4 md:right-6 z-20 px-4 py-2.5 border border-[#d4af37]/30 flex items-center gap-3"
              style={{ backgroundColor: "rgba(13,13,13,0.85)", backdropFilter: "blur(12px)" }}
            >
              <div className="w-8 h-8 rounded-full border border-[#d4af37]/60 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.5">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.2em] text-[#888] uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Premium Quality
                </p>
                <p className="text-xs font-medium text-[#d4af37]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  100% Authentic
                </p>
              </div>
            </div>

            {/* Rotating orbit dot */}
            <div
              className="absolute w-[340px] h-[340px] md:w-[400px] md:h-[400px]"
              style={{ animation: "spin 20s linear infinite" }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#d4af37]" />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />

      <style jsx>{`
        @keyframes float-up {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-100vh) scale(0.3); opacity: 0; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}
