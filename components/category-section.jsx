'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function CategorySection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/products/categories');
        if (response.data.success) {
          setCategories(response.data.data);
        } else {
          setError('Failed to load categories');
        }
      } catch {
        setError('An error occurred while fetching categories');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const SectionHeader = () => (
    <div className="mb-16 flex flex-col items-center text-center">
      <div className="inline-flex items-center gap-3 mb-5">
        <div className="h-px w-10 bg-[#d4af37]" />
        <span
          className="text-[10px] tracking-[0.4em] text-[#d4af37] uppercase font-semibold"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Shop By
        </span>
        <div className="h-px w-10 bg-[#d4af37]" />
      </div>
      <h2
        className="text-4xl md:text-5xl font-bold text-[#fafafa] mb-4"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Fragrance <span className="text-[#d4af37] italic">Collections</span>
      </h2>
      <p
        className="max-w-[500px] text-[#999] text-sm leading-relaxed"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        Explore our curated collections — from floral and oriental to fresh and woody, find your perfect scent.
      </p>
    </div>
  );

  // Loading skeletons — centered like real cards
  if (loading) {
    return (
      <section className="py-20 md:py-28 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "repeating-linear-gradient(90deg, #d4af37 0px, #d4af37 1px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, #d4af37 0px, #d4af37 1px, transparent 1px, transparent 80px)" }}
        />
        <div className="container relative z-10">
          <SectionHeader />
          <div className="flex flex-wrap justify-center gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-[220px] md:w-[240px]">
                <div className="aspect-[3/4] bg-[#111111] border border-[#1a1a1a] animate-pulse" />
                <div className="mt-3 h-3 bg-[#111111] animate-pulse mx-4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Empty / error state — visually appealing, no awkward message
  if (error || categories.length === 0) {
    return (
      <section className="py-20 md:py-28 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "repeating-linear-gradient(90deg, #d4af37 0px, #d4af37 1px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, #d4af37 0px, #d4af37 1px, transparent 1px, transparent 80px)" }}
        />
        <div className="container relative z-10">
          <SectionHeader />
          <div className="flex flex-col items-center justify-center py-16 gap-6">
            {/* Decorative ornament */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 border border-[#d4af37]/20 rotate-45" />
              <div className="absolute inset-3 border border-[#d4af37]/10 rotate-45" />
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <p className="text-[#555] text-sm tracking-widest uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Collections Coming Soon
            </p>
            <Link href="/products">
              <button
                className="mt-2 inline-flex items-center gap-2 px-7 py-3.5 text-xs font-semibold tracking-[0.15em] uppercase border border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-all duration-300"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Browse All Products
              </button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const count = categories.length;

  // Card width — fewer cards = wider cards for visual balance
  const cardWidth =
    count === 1 ? 'w-[340px] md:w-[420px]' :
    count === 2 ? 'w-[280px] md:w-[340px]' :
    count === 3 ? 'w-[240px] md:w-[300px]' :
    count === 4 ? 'w-[220px] md:w-[260px]' :
    'w-[190px] md:w-[220px]';

  return (
    <section className="py-20 md:py-28 bg-[#0a0a0a] relative overflow-hidden">
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, #d4af37 0px, #d4af37 1px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, #d4af37 0px, #d4af37 1px, transparent 1px, transparent 80px)",
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#d4af37]/3 blur-[100px] pointer-events-none" />

      <div className="container relative z-10">
        <SectionHeader />

        {/* Cards — always centered regardless of count */}
        <div className="flex flex-wrap justify-center gap-5 md:gap-6">
          {categories.map((category, idx) => (
            <Link key={category._id} href={`/categories/${category._id}`} className={`${cardWidth} flex-shrink-0`}>
              <div className="group relative overflow-hidden cursor-pointer" style={{ borderRadius: '2px' }}>

                {/* Portrait image container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#111111]">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    /* No-image placeholder — gold initial on dark */
                    <div className="h-full w-full flex items-center justify-center bg-[#0d0d0d]">
                      <div className="relative flex items-center justify-center">
                        <div className="absolute w-24 h-24 border border-[#d4af37]/20 rotate-45" />
                        <span
                          className="text-5xl font-bold text-[#d4af37]/30 select-none"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {category.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Bottom gradient overlay — always visible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />

                  {/* Gold shimmer on hover */}
                  <div className="absolute inset-0 bg-[#d4af37]/0 group-hover:bg-[#d4af37]/8 transition-all duration-500" />

                  {/* Hover: "Explore" pill */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
                    <span
                      className="inline-flex items-center gap-2 px-5 py-2 text-[10px] tracking-[0.25em] uppercase font-semibold text-[#0a0a0a] bg-[#d4af37]"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Explore
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>

                  {/* Category name overlaid at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    {/* Gold accent line */}
                    <div className="w-6 h-px bg-[#d4af37] mb-2 transition-all duration-300 group-hover:w-10" />
                    <h3
                      className="text-sm md:text-base font-semibold tracking-wider text-[#fafafa] group-hover:text-[#d4af37] transition-colors uppercase"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {category.name}
                    </h3>
                    {category.productCount != null && (
                      <p
                        className="text-[10px] text-[#888] mt-0.5 tracking-widest"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {category.productCount} {category.productCount === 1 ? 'item' : 'items'}
                      </p>
                    )}
                  </div>

                  {/* Border — subtle, gold on hover */}
                  <div className="absolute inset-0 border border-[#262626] group-hover:border-[#d4af37]/40 transition-colors duration-300 pointer-events-none" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all — only if more than a few */}
        {count >= 3 && (
          <div className="mt-14 text-center">
            <Link href="/categories">
              <button
                className="inline-flex items-center gap-2.5 px-8 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase border border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0a0a] hover:border-[#d4af37] transition-all duration-300 hover:scale-[1.02]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                View All Collections
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
