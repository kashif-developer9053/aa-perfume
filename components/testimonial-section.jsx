import { Star } from "lucide-react"

export default function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Ahmed",
      role: "Verified Buyer",
      content:
        "I've been shopping here for years and the quality never disappoints. Every fragrance is exactly as described — authentic, long-lasting, and simply divine.",
      stars: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Verified Buyer",
      content:
        "Found my signature scent at AyeshaAslam. The website is easy to navigate, checkout was seamless, and the perfume arrived beautifully packaged. Will definitely order again!",
      stars: 5,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Verified Buyer",
      content:
        "The fragrances exceeded my expectations. Everything arrived well-packaged and on time. The scent selection is incredible — I've already recommended this store to all my friends.",
      stars: 5,
    },
  ]

  return (
    <section className="py-20 bg-[#0d0d0d]">
      <div className="container">
        <div className="mb-12 flex flex-col items-center text-center">
          <span
            className="text-xs tracking-[0.3em] text-[#d4af37] uppercase mb-3"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Reviews
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#fafafa] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Client <span className="text-[#d4af37] italic">Stories</span>
          </h2>
          <div className="mt-2 h-px w-16 bg-[#d4af37]" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#111111] border border-[#262626] p-8 transition-all duration-300 hover:border-[#d4af37]/30 hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)]"
              style={{ borderRadius: "8px" }}
            >
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={14} className="fill-[#d4af37] text-[#d4af37]" />
                ))}
              </div>

              <p
                className="text-[#a1a1a1] text-sm leading-relaxed mb-6 italic"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                "{t.content}"
              </p>

              <div className="h-px bg-[#262626] mb-4" />

              <div>
                <h4
                  className="font-semibold text-[#fafafa] text-sm"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {t.name}
                </h4>
                <p
                  className="text-xs text-[#a1a1a1]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
