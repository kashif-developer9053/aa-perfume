"use client"

import Link from "next/link"

export default function OurStory() {
  return (
    <section className="py-20 bg-[#0d0d0d] overflow-hidden relative">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#d4af37]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-[#d4af37]/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left: Image */}
          <div className="relative">
            <div className="relative h-[500px] overflow-hidden" style={{ borderRadius: "4px" }}>
              <img
                src="/images/opening.png"
                alt="AyeshaAslam Perfume Story"
                className="h-full w-full object-cover"
                style={{ filter: "brightness(0.8) saturate(1.1)" }}
              />
              {/* Gold border frame */}
              <div className="absolute inset-0 border border-[#d4af37]/30" style={{ borderRadius: "4px" }} />
              {/* Gold corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#d4af37]" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#d4af37]" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#d4af37]" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#d4af37]" />
            </div>

            {/* Floating stats card */}
            <div
              className="absolute -bottom-6 -right-6 bg-[#111111] border border-[#262626] p-6 shadow-2xl"
              style={{ borderRadius: "4px", minWidth: "180px" }}
            >
              <div className="flex flex-col gap-4">
                {[
                  { value: "5+", label: "Years Experience" },
                  { value: "100+", label: "Brand Partners" },
                  { value: "50K+", label: "Happy Customers" },
                ].map(stat => (
                  <div key={stat.label}>
                    <span
                      className="text-2xl font-bold text-[#d4af37] block"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {stat.value}
                    </span>
                    <span
                      className="text-[10px] tracking-widest text-[#a1a1a1] uppercase"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col">
            <span
              className="text-xs tracking-[0.3em] text-[#d4af37] uppercase mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Our Story
            </span>

            <h2
              className="text-4xl md:text-5xl font-bold text-[#fafafa] mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Crafting <span className="text-[#d4af37] italic">Elegance</span>
              <br />
              Since Day One
            </h2>

            <p
              className="text-[#a1a1a1] leading-relaxed mb-4 text-sm"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              AyeshaAslam was born from a passion for fine fragrances and a commitment to bringing luxury perfumes within everyone's reach. Our journey began with a simple belief — everyone deserves to experience the confidence that comes with wearing an exquisite scent.
            </p>

            <p
              className="text-[#a1a1a1] leading-relaxed mb-8 text-sm"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Today, we curate the finest collection of original and inspired perfumes, each selected for its exceptional quality, longevity, and unique character. From timeless classics to contemporary masterpieces, our collection caters to every taste and occasion.
            </p>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: "✦", title: "100% Authentic", desc: "Only genuine, original fragrances" },
                { icon: "✦", title: "Premium Quality", desc: "Handpicked from world's finest" },
                { icon: "✦", title: "Fast Delivery", desc: "Swift delivery to your door" },
                { icon: "✦", title: "Expert Curation", desc: "Curated by fragrance experts" },
              ].map(item => (
                <div key={item.title} className="flex gap-3">
                  <span className="text-[#d4af37] mt-0.5 text-xs">{item.icon}</span>
                  <div>
                    <p
                      className="text-[#fafafa] text-sm font-semibold mb-0.5"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="text-[#a1a1a1] text-xs"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/about">
              <button
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-105 self-start"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  backgroundColor: "#d4af37",
                  color: "#0a0a0a",
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.1em",
                }}
              >
                Learn More About Us
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
