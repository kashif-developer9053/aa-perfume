import Link from "next/link"
import Image from "next/image"
import Footer from "@/components/footer"

export default function AboutPage() {
  const values = [
    {
      title: "Premium Quality",
      description: "We source only the finest, most authentic fragrances from renowned perfume houses and master perfumers worldwide.",
    },
    {
      title: "Authentic Products",
      description: "Every fragrance in our collection is carefully verified for authenticity, ensuring you receive only genuine luxury products.",
    },
    {
      title: "Curated with Passion",
      description: "Our collection is personally curated by fragrance enthusiasts who understand the art and science of scent creation.",
    },
    {
      title: "Customer First",
      description: "We take immense pride in serving our community with warmth, expertise, and an unwavering commitment to satisfaction.",
    },
    {
      title: "Sustainable Luxury",
      description: "We partner with brands that prioritize ethical sourcing and sustainable practices in their fragrance production.",
    },
    {
      title: "Innovation",
      description: "We constantly explore new fragrances and niche perfumers to bring you exclusive, hard-to-find scents.",
    },
  ]

  const journey = [
    {
      step: "01",
      title: "Founding Vision",
      text: "Aslam Baig Fragrance began as a passion project — bringing world-class luxury fragrances to perfume lovers in Pakistan. We started by curating an exclusive selection of authentic, premium scents.",
    },
    {
      step: "02",
      title: "Growing Online",
      text: "As demand grew, we expanded our digital presence and reached customers across Pakistan. Our reputation for authenticity and quality built a loyal community of fragrance enthusiasts.",
    },
    {
      step: "03",
      title: "Expanding Collection",
      text: "We partnered with over 100 international fragrance brands, bringing rare and exclusive scents to our customers. Our collection now spans over 500 unique fragrances.",
    },
    {
      step: "04",
      title: "Serving You Today",
      text: "With 50,000+ happy customers and growing, we continue our mission — making luxury fragrances accessible to everyone who appreciates fine perfumery.",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a]">
      <main className="flex-1">

        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden bg-[#0a0a0a]">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&w=2000&q=80"
              alt="Luxury Perfume"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            <div className="absolute inset-0 bg-[#0a0a0a]/80" />
          </div>

          <div className="container relative z-10">
            <div className="max-w-2xl">
              <span
                className="text-xs tracking-[0.3em] text-[#d4af37] uppercase mb-4 block"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Est. 2019
              </span>
              <h1
                className="text-5xl md:text-7xl font-bold text-[#fafafa] mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Our <span className="text-[#d4af37] italic">Story</span>
              </h1>
              <p
                className="text-lg text-[#a1a1a1] max-w-xl leading-relaxed mb-8"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Founded with a love for luxury fragrances, Aslam Baig Fragrance has been Pakistan's trusted destination for authentic premium perfumes since 2019.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <span
                    className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-widest uppercase cursor-pointer transition-all duration-300 hover:scale-105"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      backgroundColor: "#d4af37",
                      color: "#0a0a0a",
                    }}
                  >
                    Our Collection
                  </span>
                </Link>
                <Link href="/contact">
                  <span
                    className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-widest uppercase cursor-pointer transition-all duration-300 hover:bg-[#d4af37] hover:text-[#0a0a0a]"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      color: "#d4af37",
                      border: "2px solid #d4af37",
                    }}
                  >
                    Contact Us
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Our Journey */}
        <section className="py-20 bg-[#0d0d0d]">
          <div className="container">
            <div className="text-center mb-16">
              <span
                className="text-xs tracking-[0.3em] text-[#d4af37] uppercase mb-3 block"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Timeline
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold text-[#fafafa]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Our <span className="text-[#d4af37] italic">Journey</span>
              </h2>
              <div className="mt-4 h-px w-16 bg-[#d4af37] mx-auto" />
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="relative border-l border-[#d4af37]/20 pl-10 ml-6 space-y-12">
                {journey.map((item) => (
                  <div key={item.step} className="relative">
                    <div
                      className="absolute -left-14 top-0 w-8 h-8 flex items-center justify-center bg-[#d4af37] text-[#0a0a0a] text-xs font-bold"
                      style={{ borderRadius: "50%", fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {item.step}
                    </div>
                    <h3
                      className="text-xl font-bold text-[#d4af37] mb-2"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-[#a1a1a1] text-sm leading-relaxed"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-[#0a0a0a]">
          <div className="container">
            <div className="text-center mb-16">
              <span
                className="text-xs tracking-[0.3em] text-[#d4af37] uppercase mb-3 block"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                What We Stand For
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold text-[#fafafa]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Our <span className="text-[#d4af37] italic">Values</span>
              </h2>
              <div className="mt-4 h-px w-16 bg-[#d4af37] mx-auto" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="p-8 bg-[#111111] border border-[#262626] transition-all duration-300 hover:border-[#d4af37]/30 hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)]"
                  style={{ borderRadius: "8px" }}
                >
                  <div className="mb-4 w-12 h-12 flex items-center justify-center bg-[#d4af37]/5 border border-[#d4af37]/20" style={{ borderRadius: "50%" }}>
                    <span className="text-[#d4af37] text-lg">✦</span>
                  </div>
                  <h3
                    className="text-lg font-bold text-[#fafafa] mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {value.title}
                  </h3>
                  <p
                    className="text-[#a1a1a1] text-sm leading-relaxed"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Quote */}
        <section className="py-20 bg-[#0d0d0d]">
          <div className="container">
            <div className="max-w-3xl mx-auto bg-[#111111] border border-[#262626] p-10 text-center" style={{ borderRadius: "8px" }}>
              <div className="text-[#d4af37] text-6xl mb-4" style={{ fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>"</div>
              <blockquote
                className="text-xl md:text-2xl text-[#fafafa] mb-6 leading-relaxed italic"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Aslam Baig Fragrance is where luxury meets accessibility. Every fragrance tells a story, and we help you find the scent that tells yours.
              </blockquote>
              <div className="h-px w-16 bg-[#d4af37] mx-auto mb-4" />
              <p className="font-semibold text-[#d4af37] text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Aslam Baig Fragrance
              </p>
              <p className="text-xs text-[#a1a1a1]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Founder
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#111111] border-t border-[#262626]">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2
                className="text-3xl md:text-4xl font-bold text-[#fafafa] mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Ready to Discover Your <span className="text-[#d4af37] italic">Signature Scent?</span>
              </h2>
              <p
                className="text-[#a1a1a1] text-sm mb-8 leading-relaxed"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Explore our curated collection of luxury fragrances and find the scent that defines you.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/products">
                  <span
                    className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-widest uppercase cursor-pointer transition-all duration-300 hover:scale-105"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      backgroundColor: "#d4af37",
                      color: "#0a0a0a",
                    }}
                  >
                    Browse Collection
                  </span>
                </Link>
                <Link href="/contact">
                  <span
                    className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-widest uppercase cursor-pointer transition-all duration-300 hover:bg-[#d4af37] hover:text-[#0a0a0a]"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      color: "#d4af37",
                      border: "2px solid #d4af37",
                    }}
                  >
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
