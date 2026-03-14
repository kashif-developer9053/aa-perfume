"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import Footer from "@/components/footer"

const inputCls = "w-full bg-[#0d0d0d] border border-[#262626] text-[#fafafa] px-4 py-3 text-sm outline-none focus:border-[#d4af37] transition-colors placeholder-[#444]"
const labelCls = "text-[10px] tracking-[0.2em] uppercase text-[#888] block mb-2"

const faqs = [
  { question: "Where do you source your luxury fragrances from?", answer: "We source our fragrances from renowned perfume houses and manufacturers around the world, including France, UAE, UK, and Saudi Arabia. We prioritize quality and authenticity to bring you the finest perfumes." },
  { question: "Are your fragrances authentic and original?", answer: "Absolutely. Every fragrance in our collection is 100% authentic and original. We have zero tolerance for counterfeit products and verify every item before adding it to our collection." },
  { question: "Do you offer fragrances for both men and women?", answer: "Yes, we curate a wide range including For Her, For Him, Unisex, and Oud collections to suit every preference and personality." },
  { question: "Can I find limited edition or exclusive fragrances?", answer: "Absolutely! We frequently feature limited edition and exclusive fragrances not available elsewhere, including niche perfumes and collector editions." },
  { question: "How do you ensure the quality of your fragrances?", answer: "All our fragrances are stored under strict conditions, and our inventory is regularly checked to ensure optimal quality and authenticity." },
  { question: "Do you offer gift packaging for special occasions?", answer: "Yes, we offer beautiful gift packaging and customized gift sets for birthdays, weddings, and corporate events." },
  { question: "What is your return policy?", answer: "We offer a 7-day return policy on unopened products. If you receive a damaged or incorrect item, please contact us immediately." },
  { question: "How long does delivery take?", answer: "We offer express delivery across Pakistan, typically within 2-3 business days. Same-day delivery is available in Islamabad and Rawalpindi." },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "general", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      toast({ title: "Message sent!", description: "We'll get back to you as soon as possible." })
      setFormData({ name: "", email: "", phone: "", subject: "general", message: "" })
    }, 1500)
  }

  const subjects = [
    { value: "general", label: "General" },
    { value: "order", label: "Order" },
    { value: "custom", label: "Custom Order" },
    { value: "other", label: "Other" },
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
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[400px] bg-[#d4af37]/5 blur-[120px] pointer-events-none" />
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
                  <span className="text-[#d4af37]">Contact</span>
                </nav>

                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="h-px w-10 bg-[#d4af37]" />
                  <span className="text-[10px] tracking-[0.4em] text-[#d4af37] uppercase font-semibold"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}>Get In Touch</span>
                </div>

                <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold text-[#fafafa] mb-6 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  Contact <span className="text-[#d4af37] italic">Us</span>
                </h1>

                <p className="text-base text-[#888] max-w-md leading-relaxed mb-10"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Have questions about our fragrances, want to place a special order, or just want to connect? We are here to help.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link href="/products">
                    <span className="inline-flex items-center gap-2 px-8 py-4 text-xs font-semibold tracking-[0.15em] uppercase cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.25)]"
                      style={{ fontFamily: "'Montserrat', sans-serif", backgroundColor: "#d4af37", color: "#0a0a0a" }}>
                      Explore Collection
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </span>
                  </Link>
                  <Link href="/contact#form">
                    <span className="inline-flex items-center gap-2 px-8 py-4 text-xs font-semibold tracking-[0.15em] uppercase cursor-pointer transition-all hover:bg-[#d4af37] hover:text-[#0a0a0a]"
                      style={{ fontFamily: "'Montserrat', sans-serif", color: "#d4af37", border: "1.5px solid #d4af37" }}>
                      Send Message
                    </span>
                  </Link>
                </div>
              </div>

              {/* Right: animated visual — contact themed */}
              <div className="hidden lg:flex items-center justify-center">
                <div style={{ position: 'relative', width: 460, height: 460 }}>

                  {/* Central glow */}
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 220, height: 220, background: 'radial-gradient(circle, rgba(212,175,55,0.11) 0%, transparent 70%)', borderRadius: '50%' }} />
                  </div>

                  {/* Ring 1 */}
                  <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(212,175,55,0.07)', animation: 'abf-spin 55s linear infinite' }}>
                    <div style={{ position: 'absolute', top: -4, left: 'calc(50% - 4px)', width: 8, height: 8, borderRadius: '50%', background: '#d4af37', opacity: .5 }} />
                    <div style={{ position: 'absolute', bottom: -4, left: 'calc(50% - 4px)', width: 8, height: 8, borderRadius: '50%', background: '#d4af37', opacity: .5 }} />
                    <div style={{ position: 'absolute', top: 'calc(50% - 4px)', left: -4, width: 8, height: 8, borderRadius: '50%', background: '#d4af37', opacity: .5 }} />
                    <div style={{ position: 'absolute', top: 'calc(50% - 4px)', right: -4, width: 8, height: 8, borderRadius: '50%', background: '#d4af37', opacity: .5 }} />
                  </div>

                  {/* Ring 2 — counter-spin dashed */}
                  <div style={{ position: 'absolute', inset: 55, borderRadius: '50%', border: '1px dashed rgba(212,175,55,0.16)', animation: 'abf-cspin 35s linear infinite' }}>
                    <div style={{ position: 'absolute', top: -3, left: 'calc(50% - 3px)', width: 6, height: 6, borderRadius: '50%', background: '#d4af37', opacity: .65 }} />
                    <div style={{ position: 'absolute', bottom: '13%', right: '3%', width: 5, height: 5, borderRadius: '50%', background: '#d4af37', opacity: .65 }} />
                    <div style={{ position: 'absolute', bottom: '13%', left: '3%', width: 5, height: 5, borderRadius: '50%', background: '#d4af37', opacity: .65 }} />
                  </div>

                  {/* Ring 3 — pulse */}
                  <div style={{ position: 'absolute', inset: 112, borderRadius: '50%', border: '1px solid rgba(212,175,55,0.28)', animation: 'abf-pulse 4s ease-in-out infinite' }} />

                  {/* Ring 4 */}
                  <div style={{ position: 'absolute', inset: 167, borderRadius: '50%', border: '1.5px solid rgba(212,175,55,0.2)', animation: 'abf-pulse 3s ease-in-out 1.2s infinite reverse' }} />

                  {/* Center SVG — envelope / message motif */}
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                    <svg width="112" height="112" viewBox="0 0 112 112" fill="none">
                      <circle cx="56" cy="56" r="53" stroke="#d4af37" strokeWidth="0.5" opacity="0.18" strokeDasharray="4 7" />
                      {/* Outer 8-star */}
                      <path d="M56 12 L61 48 L97 44 L69 59 L85 93 L56 73 L27 93 L43 59 L15 44 L51 48 Z"
                        stroke="#d4af37" strokeWidth="0.9" opacity="0.5"
                        strokeDasharray="900" strokeDashoffset="900"
                        style={{ animation: 'abf-draw 4s 0.5s ease-out forwards' }} />
                      {/* Diamond */}
                      <polygon points="56,29 82,56 56,83 30,56" stroke="#d4af37" strokeWidth="0.7" opacity="0.35" />
                      {/* Envelope shape center */}
                      <rect x="39" y="44" width="34" height="24" rx="1" stroke="#d4af37" strokeWidth="0.8" opacity="0.55" />
                      <path d="M39 44 L56 58 L73 44" stroke="#d4af37" strokeWidth="0.8" opacity="0.55" />
                      {/* Center dot */}
                      <circle cx="56" cy="56" r="5" fill="#d4af37" opacity="0.9" />
                    </svg>
                  </div>

                  {/* Floating word pills — contact themed */}
                  {[
                    { text: 'Connect', pos: { top: '3%', left: '50%', transform: 'translateX(-50%)' }, delay: '0s' },
                    { text: 'We Listen', pos: { top: '17%', right: '2%' }, delay: '2s' },
                    { text: 'Always Here', pos: { top: '50%', right: '-3%', transform: 'translateY(-50%)' }, delay: '4s' },
                    { text: 'Islamabad', pos: { bottom: '15%', right: '4%' }, delay: '5.5s' },
                    { text: 'Reach Us', pos: { bottom: '3%', left: '50%', transform: 'translateX(-50%)' }, delay: '2.8s' },
                    { text: 'Get In Touch', pos: { top: '50%', left: '-3%', transform: 'translateY(-50%)' }, delay: '1.2s' },
                  ].map(({ text, pos, delay }) => (
                    <div key={text} style={{ position: 'absolute', ...pos, padding: '5px 13px', border: '1px solid rgba(212,175,55,0.22)', background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(10px)', fontFamily: "'Montserrat', sans-serif", fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d4af37', opacity: 0, animation: `abf-word 7s ${delay} ease-in-out infinite`, whiteSpace: 'nowrap', zIndex: 20 }}>
                      {text}
                    </div>
                  ))}

                  {/* Twinkling dots */}
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

        {/* ── Contact Info + Form ── */}
        <section className="py-20 md:py-28 bg-[#0d0d0d]">
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-3">

              {/* Info column */}
              <div className="space-y-5">
                <div className="mb-8">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="h-px w-8 bg-[#d4af37]/60" />
                    <span className="text-[10px] tracking-[0.35em] text-[#d4af37] uppercase font-semibold"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}>Reach Us</span>
                  </div>
                  <h2 className="text-3xl font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Let's <span className="text-[#d4af37] italic">Connect</span>
                  </h2>
                </div>

                {[
                  {
                    Icon: Mail,
                    title: "Email Us",
                    sub: "We respond within 24 hours",
                    content: <a href="mailto:info@aslambaig.com" className="text-[#d4af37] text-sm hover:underline" style={{ fontFamily: "'Montserrat', sans-serif" }}>info@aslambaig.com</a>,
                  },
                  {
                    Icon: Phone,
                    title: "Call Us",
                    sub: "Mon–Sat, 8am to 10pm",
                    content: <a href="tel:+923045612169" className="text-[#d4af37] text-sm hover:underline" style={{ fontFamily: "'Montserrat', sans-serif" }}>+92 304 56 12 169</a>,
                  },
                  {
                    Icon: MapPin,
                    title: "Visit Us",
                    sub: "Our flagship location",
                    content: (
                      <address className="not-italic text-[#888] text-sm leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        Lane 17A, Sector D<br />PWD Society, Islamabad 44000
                      </address>
                    ),
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#d4af37]/30 transition-all duration-300 group">
                    <div className="w-10 h-10 flex items-center justify-center border border-[#d4af37]/25 bg-[#d4af37]/5 flex-shrink-0">
                      <item.Icon className="h-4 w-4 text-[#d4af37]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#fafafa] text-sm mb-0.5 group-hover:text-[#d4af37] transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {item.title}
                      </h3>
                      <p className="text-[10px] text-[#555] mb-1.5 tracking-wider uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.sub}</p>
                      {item.content}
                    </div>
                  </div>
                ))}

                {/* Social */}
                <div className="pt-2">
                  <p className="text-[10px] tracking-[0.25em] text-[#555] uppercase mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Follow Us</p>
                  <div className="flex gap-2">
                    {[
                      { label: "Facebook", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                      { label: "Instagram", rect: true },
                      { label: "Twitter", path: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" },
                    ].map((s) => (
                      <a key={s.label} href="#" aria-label={s.label}
                        className="w-9 h-9 flex items-center justify-center border border-[#262626] text-[#666] hover:border-[#d4af37] hover:text-[#d4af37] transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          {s.rect ? (
                            <>
                              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01" />
                            </>
                          ) : <path d={s.path} />}
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form column */}
              <div className="lg:col-span-2">
                <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-8 relative overflow-hidden">
                  {/* Top gold line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />

                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 flex items-center justify-center border border-[#d4af37]/25 bg-[#d4af37]/5">
                      <MessageSquare className="h-4 w-4 text-[#d4af37]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>Send Us a Message</h2>
                      <p className="text-[10px] text-[#555] tracking-wider uppercase mt-0.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>We reply within 24 hours</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Full Name</label>
                        <input name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required
                          className={inputCls} style={{ fontFamily: "'Montserrat', sans-serif" }} />
                      </div>
                      <div>
                        <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Email Address</label>
                        <input name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required
                          className={inputCls} style={{ fontFamily: "'Montserrat', sans-serif" }} />
                      </div>
                    </div>

                    <div>
                      <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Phone (Optional)</label>
                      <input name="phone" type="tel" placeholder="+92 123 456 7890" value={formData.phone} onChange={handleChange}
                        className={inputCls} style={{ fontFamily: "'Montserrat', sans-serif" }} />
                    </div>

                    {/* Subject tabs */}
                    <div>
                      <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Subject</label>
                      <div className="flex flex-wrap gap-2">
                        {subjects.map((s) => (
                          <button key={s.value} type="button" onClick={() => setFormData(p => ({ ...p, subject: s.value }))}
                            className="px-4 py-2 text-[10px] font-semibold tracking-[0.15em] uppercase transition-all duration-200"
                            style={{
                              fontFamily: "'Montserrat', sans-serif",
                              backgroundColor: formData.subject === s.value ? "#d4af37" : "transparent",
                              color: formData.subject === s.value ? "#0a0a0a" : "#666",
                              border: formData.subject === s.value ? "1px solid #d4af37" : "1px solid #262626",
                            }}>
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Your Message</label>
                      <textarea name="message" placeholder="How can we help you?" rows={5} value={formData.message} onChange={handleChange} required
                        className={`${inputCls} resize-none`} style={{ fontFamily: "'Montserrat', sans-serif" }} />
                    </div>

                    <button type="submit" disabled={isSubmitting}
                      className="w-full py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(212,175,55,0.25)]"
                      style={{ fontFamily: "'Montserrat', sans-serif", backgroundColor: "#d4af37", color: "#0a0a0a" }}>
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#0a0a0a] border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>Send Message <Send className="h-3.5 w-3.5" /></>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Map ── */}
        <section className="py-20 md:py-28 bg-[#0a0a0a] relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: "repeating-linear-gradient(90deg,#d4af37 0,#d4af37 1px,transparent 1px,transparent 80px),repeating-linear-gradient(0deg,#d4af37 0,#d4af37 1px,transparent 1px,transparent 80px)" }}
          />
          <div className="container relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-5">
                <div className="h-px w-10 bg-[#d4af37]/60" />
                <span className="text-[10px] tracking-[0.4em] text-[#d4af37] uppercase font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>Find Us</span>
                <div className="h-px w-10 bg-[#d4af37]/60" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Visit <span className="text-[#d4af37] italic">Aslam Baig Fragrance</span>
              </h2>
              <p className="text-[#666] text-xs mt-3 tracking-wider" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Lane 17A, Sector D, PWD Society, Islamabad 44000
              </p>
            </div>

            <div className="relative overflow-hidden border border-[#1a1a1a]">
              {/* Gold top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent z-10" />
              <iframe
                src="https://www.google.com/maps?q=Sector+D+PWD+Housing+Society+Islamabad+44000&output=embed"
                width="100%"
                height="420"
                style={{ border: 0, filter: "grayscale(1) brightness(0.7) contrast(1.1)" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Aslam Baig Fragrance Location"
              />
            </div>
          </div>
        </section>

        {/* ── FAQs ── */}
        <section className="py-20 md:py-28 bg-[#0d0d0d]">
          <div className="container">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-3 mb-5">
                <div className="h-px w-10 bg-[#d4af37]/60" />
                <span className="text-[10px] tracking-[0.4em] text-[#d4af37] uppercase font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>FAQ</span>
                <div className="h-px w-10 bg-[#d4af37]/60" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Frequently Asked <span className="text-[#d4af37] italic">Questions</span>
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-[#1a1a1a] overflow-hidden hover:border-[#d4af37]/25 transition-colors duration-300">
                  <button onClick={() => setActiveIndex(i === activeIndex ? null : i)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center gap-4 hover:bg-[#111111] transition-colors duration-200"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    <span className="text-sm font-medium text-[#c0c0c0]">{faq.question}</span>
                    <span className="text-[#d4af37] text-xl font-light flex-shrink-0 leading-none">
                      {activeIndex === i ? "−" : "+"}
                    </span>
                  </button>
                  {activeIndex === i && (
                    <div className="px-6 pb-5 text-[#777] text-sm leading-relaxed border-t border-[#1a1a1a] pt-4 bg-[#0a0a0a]"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Subscribe CTA ── */}
        <section className="py-20 bg-[#0a0a0a] border-t border-[#1a1a1a] relative overflow-hidden">
          <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[#d4af37]/20" />
          <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[#d4af37]/20" />
          <div className="container relative z-10">
            <div className="max-w-xl mx-auto text-center">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-[#d4af37]/60" />
                <span className="text-[10px] tracking-[0.4em] text-[#d4af37] uppercase font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>Stay Updated</span>
                <div className="h-px w-10 bg-[#d4af37]/60" />
              </div>
              <h2 className="text-3xl font-bold text-[#fafafa] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Stay in the <span className="text-[#d4af37] italic">Fragrance Loop</span>
              </h2>
              <p className="text-[#666] text-sm mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Subscribe for exclusive offers, new arrivals, and fragrance tips.
              </p>
              <div className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto border border-[#262626]">
                <input type="email" placeholder="Your email address"
                  className="flex-1 px-5 py-3.5 text-sm bg-[#0d0d0d] border-0 text-[#fafafa] placeholder-[#444] focus:outline-none"
                  style={{ fontFamily: "'Montserrat', sans-serif" }} />
                <button className="px-6 py-3.5 text-xs font-bold tracking-[0.2em] uppercase whitespace-nowrap transition-all hover:bg-[#c9a227]"
                  style={{ fontFamily: "'Montserrat', sans-serif", backgroundColor: "#d4af37", color: "#0a0a0a" }}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
