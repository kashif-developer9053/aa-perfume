"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/footer";
import axios from "axios";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/products/categories");
        if (response.data.success) {
          setCategories(response.data.data);
        } else {
          setError("Failed to load categories");
        }
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred while fetching categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const count = categories.length;

  // Responsive grid class based on count
  const gridCls =
    count === 1 ? "flex justify-center" :
    count === 2 ? "grid grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto" :
    count === 3 ? "grid grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto" :
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="min-h-screen bg-[#0a0a0a]">

      {/* ── Hero Header ── */}
      <section className="relative py-28 md:py-36 bg-[#0a0a0a] border-b border-[#1a1a1a] overflow-hidden">
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "repeating-linear-gradient(90deg,#d4af37 0,#d4af37 1px,transparent 1px,transparent 70px),repeating-linear-gradient(0deg,#d4af37 0,#d4af37 1px,transparent 1px,transparent 70px)" }}
        />
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[200px] bg-[#d4af37]/5 blur-[120px] pointer-events-none" />
        {/* Corner ornaments */}
        <div className="absolute top-8 left-8 w-14 h-14 border-t-2 border-l-2 border-[#d4af37]/30" />
        <div className="absolute top-8 right-8 w-14 h-14 border-t-2 border-r-2 border-[#d4af37]/30" />
        <div className="absolute bottom-8 left-8 w-14 h-14 border-b-2 border-l-2 border-[#d4af37]/30" />
        <div className="absolute bottom-8 right-8 w-14 h-14 border-b-2 border-r-2 border-[#d4af37]/30" />

        <div className="container relative z-10 text-center">
          {/* Breadcrumb */}
          <nav className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase mb-8"
            style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <Link href="/" className="text-[#666] hover:text-[#d4af37] transition-colors">Home</Link>
            <span className="text-[#333]">/</span>
            <span className="text-[#d4af37]">Collections</span>
          </nav>

          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#d4af37]/60" />
            <span className="text-[10px] tracking-[0.4em] text-[#d4af37] uppercase font-semibold"
              style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Our Catalogue
            </span>
            <div className="h-px w-12 bg-[#d4af37]/60" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-[#fafafa] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Fragrance <span className="text-[#d4af37] italic">Collections</span>
          </h1>

          <p className="max-w-[480px] mx-auto text-[#888] text-sm leading-relaxed"
            style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Discover our curated families of scent — from floral and oriental to fresh and woody. Every collection tells a story.
          </p>

          {/* Ornament */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-16 bg-[#d4af37]/40" />
            <div className="w-1.5 h-1.5 rotate-45 border border-[#d4af37]" />
            <div className="h-px w-16 bg-[#d4af37]/40" />
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-20 md:py-28">
        <div className="container">

          {loading && (
            <div className={`${count === 0 ? "flex flex-wrap justify-center" : gridCls} gap-6`}>
              {[1, 2, 3].map(i => (
                <div key={i} className="w-full sm:w-auto">
                  <div className="aspect-[3/4] w-full min-w-[220px] bg-[#111111] border border-[#1a1a1a] animate-pulse" />
                  <div className="h-3 bg-[#111111] animate-pulse mt-4 mx-6" />
                </div>
              ))}
            </div>
          )}

          {!loading && (error || count === 0) && (
            <div className="flex flex-col items-center justify-center py-20 gap-6">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 border border-[#d4af37]/25 rotate-45" />
                <div className="absolute inset-2 border border-[#d4af37]/12 rotate-45" />
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <p className="text-[#555] text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {error ? "Unable to load collections" : "Collections Coming Soon"}
              </p>
              <Link href="/products">
                <button className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase border border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-all duration-300"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Browse All Products
                </button>
              </Link>
            </div>
          )}

          {!loading && count > 0 && (
            <>
              {/* Count label */}
              <p className="text-[10px] tracking-[0.3em] text-[#555] uppercase mb-10 text-center"
                style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {count} {count === 1 ? "Collection" : "Collections"} Available
              </p>

              <div className={`${gridCls} gap-6 md:gap-8`}>
                {categories.map((category) => (
                  <Link key={category._id} href={`/categories/${category._id}`}
                    className={count === 1 ? "w-[340px] md:w-[420px]" : "block"}>
                    <div className="group relative overflow-hidden cursor-pointer h-full">

                      {/* Portrait image */}
                      <div className="relative aspect-[3/4] overflow-hidden bg-[#0d0d0d]">
                        {category.image ? (
                          <img
                            src={category.image}
                            alt={category.name}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={e => { e.target.style.display = "none"; }}
                          />
                        ) : (
                          /* No-image elegant placeholder */
                          <div className="h-full w-full flex items-center justify-center bg-[#0d0d0d]">
                            <div className="relative flex flex-col items-center gap-4">
                              <div className="absolute w-28 h-28 border border-[#d4af37]/15 rotate-45" />
                              <span className="text-6xl font-bold text-[#d4af37]/20 select-none"
                                style={{ fontFamily: "'Playfair Display', serif" }}>
                                {category.name?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
                        {/* Gold shimmer on hover */}
                        <div className="absolute inset-0 bg-[#d4af37]/0 group-hover:bg-[#d4af37]/8 transition-all duration-500" />

                        {/* "Explore" button reveal */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-3 group-hover:translate-y-0 pointer-events-none">
                          <span className="inline-flex items-center gap-2 px-5 py-2.5 text-[10px] tracking-[0.3em] uppercase font-bold text-[#0a0a0a] bg-[#d4af37]"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}>
                            Explore
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>

                        {/* Bottom text overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <div className="w-6 h-px bg-[#d4af37] mb-2.5 transition-all duration-300 group-hover:w-12" />
                          <h3 className="text-base md:text-lg font-bold tracking-wide text-[#fafafa] group-hover:text-[#d4af37] transition-colors uppercase"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}>
                            {category.name}
                          </h3>
                          {category.description && (
                            <p className="text-[11px] text-[#888] mt-1.5 leading-relaxed line-clamp-2"
                              style={{ fontFamily: "'Montserrat', sans-serif" }}>
                              {category.description}
                            </p>
                          )}
                          {category.productCount != null && (
                            <p className="text-[10px] text-[#666] tracking-widest uppercase mt-1"
                              style={{ fontFamily: "'Montserrat', sans-serif" }}>
                              {category.productCount} {category.productCount === 1 ? "item" : "items"}
                            </p>
                          )}
                        </div>

                        {/* Border */}
                        <div className="absolute inset-0 border border-[#1e1e1e] group-hover:border-[#d4af37]/40 transition-colors duration-300 pointer-events-none" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
