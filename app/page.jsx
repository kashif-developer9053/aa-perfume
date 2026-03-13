import Footer from "@/components/footer"
import FeaturedProducts from "@/components/featured-products"
import CategorySection from "@/components/category-section"
import HeroSection from "@/components/hero-section"
import NewsletterSection from "@/components/newsletter-section"
import OurStory from "@/components/our-story"
import CustomerReviews from "@/components/customer-reviews"

export default function HomePage() {
  const features = [
    {
      title: "Fast Delivery",
      description: "Express shipping across Pakistan. Get your fragrances within 2-3 business days.",
      iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
    },
    {
      title: "100% Authentic",
      description: "All fragrances are genuine, original products sourced directly from brands.",
      iconPath: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    },
    {
      title: "Easy Returns",
      description: "Not satisfied? Return within 7 days for a full refund. No questions asked.",
      iconPath: "M21 10H3M21 6H3M21 14H3M21 18H3",
    },
    {
      title: "Premium Quality",
      description: "Handpicked luxury fragrances with exceptional longevity and premium packaging.",
      iconPath: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a]">
      <main className="flex-1">
        <HeroSection />
        <FeaturedProducts />
        <OurStory />
        <CustomerReviews />

        {/* The Aslam Baig Fragrance Promise */}
        <section className="py-20 bg-[#111111] border-y border-[#262626]">
          <div className="container">
            <div className="mb-12 flex flex-col items-center text-center">
              <span
                className="text-xs tracking-[0.3em] text-[#d4af37] uppercase mb-3"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Why Choose Us
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold text-[#fafafa]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                The <span className="italic text-[#d4af37]">Aslam Baig Fragrance</span> Promise
              </h2>
              <div className="mt-4 h-px w-16 bg-[#d4af37]" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex flex-col items-center text-center p-6 bg-[#0a0a0a] border border-[#262626] transition-all duration-300 hover:border-[#d4af37]/30 hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)]"
                  style={{ borderRadius: "8px" }}
                >
                  <div
                    className="mb-4 w-14 h-14 flex items-center justify-center bg-[#d4af37]/5 border border-[#d4af37]/20"
                    style={{ borderRadius: "50%" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#d4af37"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={feature.iconPath} />
                    </svg>
                  </div>
                  <h3
                    className="text-lg font-bold text-[#d4af37] mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-[#a1a1a1] text-sm leading-relaxed"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CategorySection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
