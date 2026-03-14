"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import axios from "axios";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [reviewSummaries, setReviewSummaries] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/products?featured=true&limit=8");
        if (response.data.success) {
          const prods = response.data.data.products;
          setProducts(prods);
          if (prods.length > 0) {
            try {
              const reviewResponse = await axios.post("/api/reviews/summary", {
                productIds: prods.map((p) => p._id),
              });
              if (reviewResponse.data.success) setReviewSummaries(reviewResponse.data.data);
            } catch {
              /* reviews optional */
            }
          }
        } else {
          setError("Failed to load featured products");
        }
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  const formatPrice = (price) => `Rs. ${price.toFixed(0)}`;

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    addToCart(product);
    toast({ title: "Added to Cart", description: `${product.name} added to your cart.` });
  };

  const SectionHeader = () => (
    <div className="mb-14 flex flex-col items-center text-center">
      <div className="inline-flex items-center gap-3 mb-5">
        <div className="h-px w-10 bg-[#d4af37]" />
        <span className="text-[10px] tracking-[0.4em] text-[#d4af37] uppercase font-semibold"
          style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Our Collection
        </span>
        <div className="h-px w-10 bg-[#d4af37]" />
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-[#fafafa] mb-4"
        style={{ fontFamily: "'Playfair Display', serif" }}>
        Exquisite <span className="text-[#d4af37] italic">Fragrances</span>
      </h2>
      <p className="max-w-[480px] text-[#888] text-sm leading-relaxed"
        style={{ fontFamily: "'Montserrat', sans-serif" }}>
        Discover our curated selection of premium perfumes, each crafted to leave a lasting impression.
      </p>
    </div>
  );

  /* ── Loading skeletons ── */
  if (loading) {
    return (
      <section className="py-20 md:py-28 bg-[#0a0a0a]">
        <div className="container">
          <SectionHeader />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i}>
                <div className="aspect-[3/4] bg-[#111111] border border-[#1a1a1a] animate-pulse" />
                <div className="mt-3 h-3 bg-[#111111] animate-pulse" />
                <div className="mt-2 h-3 bg-[#111111] animate-pulse w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || products.length === 0) {
    return (
      <section className="py-20 md:py-28 bg-[#0a0a0a]">
        <div className="container">
          <SectionHeader />
          <div className="flex flex-col items-center gap-4 py-12">
            <p className="text-[#555] text-xs tracking-widest uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {error || "No featured fragrances yet"}
            </p>
            <Link href="/products">
              <button className="px-7 py-3 text-xs font-semibold tracking-[0.2em] uppercase border border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-all"
                style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Browse All
              </button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 bg-[#0a0a0a] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[200px] bg-[#d4af37]/3 blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        <SectionHeader />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {products.map((product) => {
            const summary = reviewSummaries[product._id] || { reviewCount: 0, averageRating: 0 };
            const categoryName =
              typeof product.category === "object" && product.category?.name
                ? product.category.name
                : typeof product.category === "string"
                ? product.category
                : null;

            return (
              <Link key={product._id} href={`/products/${product._id}`}>
                <div className="group relative overflow-hidden cursor-pointer">

                  {/* Portrait image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#111111]">
                    {product.images?.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={e => { e.target.style.display = "none"; }}
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-[#0d0d0d]">
                        <span className="text-5xl font-bold text-[#d4af37]/20 select-none"
                          style={{ fontFamily: "'Playfair Display', serif" }}>
                          {product.name?.charAt(0)}
                        </span>
                      </div>
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
                    {/* Gold shimmer on hover */}
                    <div className="absolute inset-0 bg-[#d4af37]/0 group-hover:bg-[#d4af37]/8 transition-all duration-500" />

                    {/* Category pill — top left */}
                    {categoryName && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2 py-0.5 text-[9px] font-bold tracking-[0.15em] uppercase text-[#0a0a0a] bg-[#d4af37]"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          {categoryName}
                        </span>
                      </div>
                    )}

                    {/* Sale badge */}
                    {product.discountedPrice && (
                      <div className="absolute top-3 right-3 z-10">
                        <span className="px-2 py-0.5 text-[9px] font-bold tracking-[0.15em] uppercase text-white bg-red-900/80"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          Sale
                        </span>
                      </div>
                    )}

                    {/* Hover: quick-add button */}
                    <div className="absolute inset-x-0 bottom-20 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-20">
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="inline-flex items-center gap-1.5 px-5 py-2 text-[10px] font-bold tracking-[0.2em] uppercase text-[#0a0a0a] bg-[#d4af37] hover:bg-[#c9a227] transition-colors"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                        Add to Cart
                      </button>
                    </div>

                    {/* Bottom overlay: name + price */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                      {/* Stars */}
                      {summary.reviewCount > 0 && (
                        <div className="flex items-center gap-0.5 mb-1.5">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star key={i} className={`h-2.5 w-2.5 ${i < Math.floor(summary.averageRating) ? "fill-[#d4af37] text-[#d4af37]" : "fill-[#333] text-[#333]"}`} />
                          ))}
                          <span className="text-[9px] text-[#888] ml-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                            ({summary.reviewCount})
                          </span>
                        </div>
                      )}

                      <div className="w-5 h-px bg-[#d4af37] mb-2 group-hover:w-10 transition-all duration-300" />

                      <h3 className="text-sm font-semibold text-[#fafafa] group-hover:text-[#d4af37] transition-colors leading-snug line-clamp-1 uppercase tracking-wide"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {product.name}
                      </h3>

                      <div className="flex items-center justify-between mt-1.5">
                        {product.discountedPrice ? (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[#d4af37]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                              {formatPrice(product.discountedPrice)}
                            </span>
                            <span className="text-[10px] text-[#555] line-through" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                              {formatPrice(product.price)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm font-bold text-[#d4af37]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Border */}
                    <div className="absolute inset-0 border border-[#1e1e1e] group-hover:border-[#d4af37]/40 transition-colors duration-300 pointer-events-none" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <Link href="/products">
            <button
              className="inline-flex items-center gap-2.5 px-10 py-4 text-xs font-semibold tracking-[0.2em] uppercase border border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0a0a] hover:border-[#d4af37] transition-all duration-300 hover:scale-[1.02]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              View Full Collection
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
