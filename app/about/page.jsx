import Link from "next/link"
import Footer from "@/components/footer"

export default function AboutPage() {
  const values = [
    { title: "Premium Quality", icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", description: "We source only the finest, most authentic fragrances from renowned perfume houses and master perfumers worldwide." },
    { title: "Authentic Products", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", description: "Every fragrance is carefully verified for authenticity, ensuring you receive only genuine luxury products." },
    { title: "Curated with Passion", icon: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z", description: "Our collection is personally curated by fragrance enthusiasts who understand the art and science of scent creation." },
    { title: "Customer First", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75", description: "We serve our community with warmth, expertise, and an unwavering commitment to your satisfaction." },
    { title: "Sustainable Luxury", icon: "M2 12l10-9 10 9M5 9.5V20h5v-6h4v6h5V9.5", description: "We partner with brands that prioritize ethical sourcing and sustainable practices in fragrance production." },
    { title: "Innovation", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", description: "We constantly explore new fragrances and niche perfumers to bring you exclusive, hard-to-find scents." },
  ]

  const journey = [
    { step: "01", title: "Founding Vision", text: "Aslam Baig Fragrance began as a passion project — bringing world-class luxury fragrances to perfume lovers in Pakistan. We started by curating an exclusive selection of authentic, premium scents." },
    { step: "02", title: "Growing Online", text: "As demand grew, we expanded our digital presence and reached customers across Pakistan. Our reputation for authenticity and quality built a loyal community of fragrance enthusiasts." },
    { step: "03", title: "Expanding Collection", text: "We partnered with over 100 international fragrance brands, bringing rare and exclusive scents to our customers. Our collection now spans over 500 unique fragrances." },
    { step: "04", title: "Serving You Today", text: "With 50,000+ happy customers and growing, we continue our mission — making luxury fragrances accessible to everyone who appreciates fine perfumery." },
  ]

  const stats = [
    { value: "500+", label: "Fragrances" },
    { value: "100+", label: "Brands" },
    { value: "50K+", label: "Happy Clients" },
    { value: "100%", label: "Authentic" },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a]">
      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="relative min-h-screen overflow-hidden bg-[#0a0a0a] border-b border-[#1a1a1a] flex items-center">
          <style>{`
            @keyframes abf-spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
            @keyframes abf-cspin { from { transform: rotate(0deg) } to { transform: rotate(-360deg) } }
            @keyframes abf-pulse { 0%,100% { transform: scale(1); opacity: .22 } 50% { transform: scale(1.07); opacity: .5 } }
            @keyframes abf-word { 0% { transform: translateY(8px); opacity: 0 } 20%,72% { opacity: 1 } 100% { transform: translateY(-22px); opacity: 0 } }
            @keyframes abf-twinkle { 0%,100% { opacity: .08; transform: scale(.5) } 50% { opacity: .9; transform: scale(1.5) } }
            @keyframes abf-draw { from { stroke-dashoffset: 900 } to { stroke-dashoffset: 0 } }
          `}</style>

          {/* Grid texture */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "repeating-linear-gradient(90deg,#d4af37 0,#d4af37 1px,transparent 1px,transparent 70px),repeating-linear-gradient(0deg,#d4af37 0,#d4af37 1px,transparent 1px,transparent 70px)" }}
          />
          {/* Ambient glow */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[400px] bg-[#d4af37]/5 blur-[120px] pointer-events-none" />
          {/* Corner ornaments */}
          <div className="absolute top-8 left-8 w-14 h-14 border-t-2 border-l-2 border-[#d4af37]/30" />
          <div className="absolute top-8 right-8 w-14 h-14 border-t-2 border-r-2 border-[#d4af37]/30" />
          <div className="absolute bottom-8 left-8 w-14 h-14 border-b-2 border-l-2 border-[#d4af37]/30" />
          <div className="absolute bottom-8 right-8 w-14 h-14 border-b-2 border-r-2 border-[#d4af37]/30" />

          <div className="container relative z-10 py-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Left: text */}
              <div>
                <nav className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase mb-8"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  <Link href="/" className="text-[#555] hover:text-[#d4af37] transition-colors">Home</Link>
                  <span className="text-[#333]">/</span>
                  <span className="text-[#d4af37]">About</span>
                </nav>

                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="h-px w-10 bg-[#d4af37]" />
                  <span className="text-[10px] tracking-[0.4em] text-[#d4af37] uppercase font-semibold"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}>Est. 2019</span>
                </div>

                <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold text-[#fafafa] mb-6 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  Our <span className="text-[#d4af37] italic">Story</span>
                </h1>

                <p className="text-base text-[#888] max-w-md leading-relaxed mb-10"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Founded with a love for luxury fragrances, Aslam Baig Fragrance has been Pakistan's trusted destination for authentic premium perfumes since 2019.
                </p>

                <div className="flex flex-wrap gap-4 mb-14">
                  <Link href="/products">
                    <span className="inline-flex items-center gap-2 px-8 py-4 text-xs font-semibold tracking-[0.15em] uppercase cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.25)]"
                      style={{ fontFamily: "'Montserrat', sans-serif", backgroundColor: "#d4af37", color: "#0a0a0a" }}>
                      Our Collection
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </span>
                  </Link>
                  <Link href="/contact">
                    <span className="inline-flex items-center gap-2 px-8 py-4 text-xs font-semibold tracking-[0.15em] uppercase cursor-pointer transition-all hover:bg-[#d4af37] hover:text-[#0a0a0a]"
                      style={{ fontFamily: "'Montserrat', sans-serif", color: "#d4af37", border: "1.5px solid #d4af37" }}>
                      Contact Us
                    </span>
                  </Link>
                </div>

                <div className="flex flex-wrap gap-0 border-t border-[#1a1a1a] pt-8">
                  {stats.map((stat, i) => (
                    <div key={stat.label} className="flex items-center">
                      {i > 0 && <div className="h-10 w-px bg-[#262626] mx-6" />}
                      <div>
                        <div className="text-2xl font-bold text-[#d4af37]" style={{ fontFamily: "'Playfair Display', serif" }}>{stat.value}</div>
                        <div className="text-[9px] tracking-[0.25em] text-[#555] uppercase mt-0.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: animated luxury visual */}
              <div className="hidden lg:flex items-center justify-center">
                <div style={{ position: 'relative', width: 460, height: 460 }}>

                  {/* Central glow */}
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 220, height: 220, background: 'radial-gradient(circle, rgba(212,175,55,0.11) 0%, transparent 70%)', borderRadius: '50%' }} />
                  </div>

                  {/* Ring 1 — outermost, very slow spin */}
                  <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(212,175,55,0.07)', animation: 'abf-spin 55s linear infinite' }}>
                    <div style={{ position: 'absolute', top: -4, left: 'calc(50% - 4px)', width: 8, height: 8, borderRadius: '50%', background: '#d4af37', opacity: .5 }} />
                    <div style={{ position: 'absolute', bottom: -4, left: 'calc(50% - 4px)', width: 8, height: 8, borderRadius: '50%', background: '#d4af37', opacity: .5 }} />
                    <div style={{ position: 'absolute', top: 'calc(50% - 4px)', left: -4, width: 8, height: 8, borderRadius: '50%', background: '#d4af37', opacity: .5 }} />
                    <div style={{ position: 'absolute', top: 'calc(50% - 4px)', right: -4, width: 8, height: 8, borderRadius: '50%', background: '#d4af37', opacity: .5 }} />
                  </div>

                  {/* Ring 2 — dashed, counter-spin */}
                  <div style={{ position: 'absolute', inset: 55, borderRadius: '50%', border: '1px dashed rgba(212,175,55,0.16)', animation: 'abf-cspin 35s linear infinite' }}>
                    <div style={{ position: 'absolute', top: -3, left: 'calc(50% - 3px)', width: 6, height: 6, borderRadius: '50%', background: '#d4af37', opacity: .65 }} />
                    <div style={{ position: 'absolute', bottom: '13%', right: '3%', width: 5, height: 5, borderRadius: '50%', background: '#d4af37', opacity: .65 }} />
                    <div style={{ position: 'absolute', bottom: '13%', left: '3%', width: 5, height: 5, borderRadius: '50%', background: '#d4af37', opacity: .65 }} />
                  </div>

                  {/* Ring 3 — pulsing */}
                  <div style={{ position: 'absolute', inset: 112, borderRadius: '50%', border: '1px solid rgba(212,175,55,0.28)', animation: 'abf-pulse 4s ease-in-out infinite' }} />

                  {/* Ring 4 — inner */}
                  <div style={{ position: 'absolute', inset: 167, borderRadius: '50%', border: '1.5px solid rgba(212,175,55,0.2)', animation: 'abf-pulse 3s ease-in-out 1.2s infinite reverse' }} />

                  {/* Center SVG ornament */}
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                    <svg width="112" height="112" viewBox="0 0 112 112" fill="none">
                      <circle cx="56" cy="56" r="53" stroke="#d4af37" strokeWidth="0.5" opacity="0.18" strokeDasharray="4 7" />
                      <path d="M56 12 L61 48 L97 44 L69 59 L85 93 L56 73 L27 93 L43 59 L15 44 L51 48 Z"
                        stroke="#d4af37" strokeWidth="0.9" opacity="0.55"
                        strokeDasharray="900" strokeDashoffset="900"
                        style={{ animation: 'abf-draw 4s 0.5s ease-out forwards' }} />
                      <polygon points="56,29 82,56 56,83 30,56" stroke="#d4af37" strokeWidth="0.7" opacity="0.36" />
                      <line x1="56" y1="37" x2="56" y2="75" stroke="#d4af37" strokeWidth="0.4" opacity="0.2" />
                      <line x1="37" y1="56" x2="75" y2="56" stroke="#d4af37" strokeWidth="0.4" opacity="0.2" />
                      <circle cx="56" cy="56" r="15" stroke="#d4af37" strokeWidth="0.7" opacity="0.36" />
                      <circle cx="56" cy="56" r="5" fill="#d4af37" opacity="0.9" />
                      <circle cx="56" cy="56" r="10" stroke="#d4af37" strokeWidth="0.5" opacity="0.38" />
                    </svg>
                  </div>

                  {/* Floating word pills */}
                  {[
                    { text: 'Authentic', pos: { top: '3%', left: '50%', transform: 'translateX(-50%)' }, delay: '0s' },
                    { text: 'Luxury', pos: { top: '17%', right: '2%' }, delay: '2s' },
                    { text: 'Premium', pos: { top: '50%', right: '-3%', transform: 'translateY(-50%)' }, delay: '4s' },
                    { text: 'Crafted', pos: { bottom: '15%', right: '4%' }, delay: '5.5s' },
                    { text: 'Since 2019', pos: { bottom: '3%', left: '50%', transform: 'translateX(-50%)' }, delay: '2.8s' },
                    { text: 'Curated', pos: { top: '50%', left: '-3%', transform: 'translateY(-50%)' }, delay: '1.2s' },
                  ].map(({ text, pos, delay }) => (
                    <div key={text} style={{ position: 'absolute', ...pos, padding: '5px 13px', border: '1px solid rgba(212,175,55,0.22)', background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(10px)', fontFamily: "'Montserrat', sans-serif", fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d4af37', opacity: 0, animation: `abf-word 7s ${delay} ease-in-out infinite`, whiteSpace: 'nowrap', zIndex: 20 }}>
                      {text}
                    </div>
                  ))}

                  {/* Twinkling gold dust */}
                  {[
                    { top: '21%', left: '21%', delay: '0s', size: 3 },
                    { top: '25%', right: '23%', delay: '1.4s', size: 2 },
                    { bottom: '27%', left: '19%', delay: '2.3s', size: 3 },
                    { bottom: '23%', right: '21%', delay: '0.9s', size: 2 },
                    { top: '63%', left: '11%', delay: '2s', size: 2 },
                    { top: '13%', right: '31%', delay: '3.2s', size: 2 },
                  ].map((dot, i) => {
                    const { delay, size, ...pos } = dot;
                    return <div key={i} style={{ position: 'absolute', ...pos, width: size, height: size, borderRadius: '50%', background: '#d4af37', animation: `abf-twinkle ${2.6 + i * 0.4}s ${delay} ease-in-out infinite` }} />;
                  })}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Journey / Timeline ── */}
        <section className="py-24 bg-[#0d0d0d] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-[0.02]"
            style={{ backgroundImage: "repeating-linear-gradient(-45deg,#d4af37 0,#d4af37 1px,transparent 1px,transparent 40px)" }}
          />
          <div className="container relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-5">
                <div className="h-px w-10 bg-[#d4af37]/60" />
                <span className="text-[10px] tracking-[0.4em] text-[#d4af37] uppercase font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>Timeline</span>
                <div className="h-px w-10 bg-[#d4af37]/60" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Our <span className="text-[#d4af37] italic">Journey</span>
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-px bg-[#d4af37]/15" />

                <div className="space-y-0">
                  {journey.map((item, i) => (
                    <div key={item.step} className="relative flex gap-10 pb-12 last:pb-0">
                      {/* Step circle */}
                      <div className="relative z-10 flex-shrink-0 w-16 flex justify-center">
                        <div className="w-10 h-10 flex items-center justify-center bg-[#d4af37] text-[#0a0a0a] text-xs font-bold"
                          style={{ fontFamily: "'Montserrat', sans-serif", clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}>
                          {item.step}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-0 pt-1">
                        <div className="inline-flex items-center gap-3 mb-2">
                          <div className="h-px w-6 bg-[#d4af37]/50" />
                          <h3 className="text-xl font-bold text-[#d4af37]" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-[#888] text-sm leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Founders ── */}
        <section className="py-24 bg-[#0d0d0d] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
          <div className="container relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-5">
                <div className="h-px w-10 bg-[#d4af37]/60" />
                <span className="text-[10px] tracking-[0.4em] text-[#d4af37] uppercase font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>The People Behind It</span>
                <div className="h-px w-10 bg-[#d4af37]/60" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Meet the <span className="text-[#d4af37] italic">Founders</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  initial: "A",
                  name: "Aslam Baig",
                  role: "Founder & CEO",
                  bio: "With over 15 years in the fragrance industry, Aslam built this brand from a single vision — to bring the world's finest scents to Pakistan with full authenticity.",
                },
                {
                  initial: "S",
                  name: "Sara Malik",
                  role: "Co-Founder & Creative Director",
                  bio: "Sara leads the curation of every collection, travelling internationally to source fragrances that align with our ethos of quality and exclusivity.",
                },
                {
                  initial: "R",
                  name: "Raza Ahmed",
                  role: "Co-Founder & Head of Operations",
                  bio: "Raza ensures that every order, partnership, and process runs seamlessly — from warehouse to doorstep — with precision and care.",
                },
              ].map((founder, i) => (
                <div key={i} className="group flex flex-col items-center text-center p-8 bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#d4af37]/30 transition-all duration-500 relative overflow-hidden">
                  {/* Gold sweep bottom */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#d4af37] group-hover:w-full transition-all duration-500" />

                  {/* Avatar */}
                  <div className="relative mb-6">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      {/* Outer ring */}
                      <div className="absolute inset-0 rounded-full border border-[#d4af37]/20 group-hover:border-[#d4af37]/50 transition-colors duration-500" />
                      {/* Inner ring */}
                      <div className="absolute inset-2.5 rounded-full border border-[#d4af37]/10 group-hover:border-[#d4af37]/30 transition-colors duration-500" />
                      {/* Initial */}
                      <div className="w-16 h-16 rounded-full bg-[#111111] border border-[#d4af37]/30 flex items-center justify-center group-hover:border-[#d4af37]/60 transition-colors duration-500">
                        <span className="text-2xl font-bold text-[#d4af37]" style={{ fontFamily: "'Playfair Display', serif" }}>{founder.initial}</span>
                      </div>
                    </div>
                    {/* Corner ornaments */}
                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-[#d4af37]/40" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-[#d4af37]/40" />
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-[#d4af37]/40" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-[#d4af37]/40" />
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-[#fafafa] group-hover:text-[#d4af37] transition-colors duration-300 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {founder.name}
                  </h3>

                  {/* Role */}
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#d4af37]/70 font-semibold mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {founder.role}
                  </span>

                  {/* Divider */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-px w-8 bg-[#262626]" />
                    <div className="w-1 h-1 rotate-45 bg-[#d4af37]/40" />
                    <div className="h-px w-8 bg-[#262626]" />
                  </div>

                  {/* Bio */}
                  <p className="text-[#888] text-sm leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {founder.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#d4af37]/3 blur-[120px] pointer-events-none" />
          <div className="container relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-5">
                <div className="h-px w-10 bg-[#d4af37]/60" />
                <span className="text-[10px] tracking-[0.4em] text-[#d4af37] uppercase font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>What We Stand For</span>
                <div className="h-px w-10 bg-[#d4af37]/60" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Our <span className="text-[#d4af37] italic">Values</span>
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((value) => (
                <div key={value.title}
                  className="group relative p-7 bg-[#0d0d0d] border border-[#1a1a1a] transition-all duration-300 hover:border-[#d4af37]/30 hover:shadow-[0_10px_40px_rgba(212,175,55,0.08)] overflow-hidden">
                  {/* Top gold accent line */}
                  <div className="absolute top-0 left-0 h-[2px] w-0 bg-[#d4af37] group-hover:w-full transition-all duration-500" />

                  <div className="mb-5 w-11 h-11 flex items-center justify-center border border-[#d4af37]/25 bg-[#d4af37]/5">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={value.icon} />
                    </svg>
                  </div>

                  <h3 className="text-lg font-bold text-[#fafafa] mb-3 group-hover:text-[#d4af37] transition-colors"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    {value.title}
                  </h3>
                  <p className="text-[#777] text-sm leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured Quote ── */}
        <section className="py-24 bg-[#0d0d0d] border-y border-[#1a1a1a] relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "repeating-linear-gradient(90deg,#d4af37 0,#d4af37 1px,transparent 1px,transparent 80px),repeating-linear-gradient(0deg,#d4af37 0,#d4af37 1px,transparent 1px,transparent 80px)" }}
          />
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              {/* Decorative top ornament */}
              <div className="flex items-center justify-center gap-3 mb-10">
                <div className="h-px w-16 bg-[#d4af37]/40" />
                <div className="w-2 h-2 rotate-45 border border-[#d4af37]/60" />
                <div className="h-px w-16 bg-[#d4af37]/40" />
              </div>

              <div className="text-[#d4af37] text-8xl leading-none mb-6 select-none"
                style={{ fontFamily: "'Playfair Display', serif", opacity: 0.3 }}>
                "
              </div>

              <blockquote className="text-xl md:text-3xl text-[#fafafa] mb-8 leading-relaxed italic"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Aslam Baig Fragrance is where luxury meets accessibility. Every fragrance tells a story, and we help you find the scent that tells yours.
              </blockquote>

              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="h-px w-10 bg-[#d4af37]/50" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                <div className="h-px w-10 bg-[#d4af37]/50" />
              </div>

              <p className="font-bold text-[#d4af37] text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Aslam Baig
              </p>
              <p className="text-[10px] text-[#555] tracking-[0.2em] uppercase mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Founder, Aslam Baig Fragrance
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
          <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[#d4af37]/20" />
          <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[#d4af37]/20" />
          <div className="container relative z-10">
            <div className="mx-auto max-w-2xl text-center">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-[#d4af37]/60" />
                <span className="text-[10px] tracking-[0.4em] text-[#d4af37] uppercase font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>Begin Here</span>
                <div className="h-px w-10 bg-[#d4af37]/60" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#fafafa] mb-4 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Ready to Discover Your <span className="text-[#d4af37] italic">Signature Scent?</span>
              </h2>
              <p className="text-[#777] text-sm mb-10 leading-relaxed max-w-md mx-auto"
                style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Explore our curated collection of luxury fragrances and find the scent that defines you.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/products">
                  <span className="inline-flex items-center gap-2 px-9 py-4 text-xs font-semibold tracking-[0.15em] uppercase cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.25)]"
                    style={{ fontFamily: "'Montserrat', sans-serif", backgroundColor: "#d4af37", color: "#0a0a0a" }}>
                    Browse Collection
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </span>
                </Link>
                <Link href="/contact">
                  <span className="inline-flex items-center gap-2 px-9 py-4 text-xs font-semibold tracking-[0.15em] uppercase cursor-pointer transition-all duration-300 hover:bg-[#d4af37] hover:text-[#0a0a0a]"
                    style={{ fontFamily: "'Montserrat', sans-serif", color: "#d4af37", border: "1.5px solid #d4af37" }}>
                    Get In Touch
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
