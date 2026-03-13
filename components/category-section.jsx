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
      } catch (error) {
        setError('An error occurred while fetching categories');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const SectionHeader = () => (
    <div className="mb-12 flex flex-col items-center text-center">
      <span
        className="text-xs tracking-[0.3em] text-[#d4af37] uppercase mb-3"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        Shop By
      </span>
      <h2
        className="text-4xl md:text-5xl font-bold text-[#fafafa] mb-4"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Fragrance <span className="text-[#d4af37] italic">Categories</span>
      </h2>
      <p
        className="max-w-[600px] text-[#a1a1a1] text-sm leading-relaxed"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        Explore our curated collections — from floral and oriental to fresh and woody, find your perfect scent family.
      </p>
      <div className="mt-4 h-px w-16 bg-[#d4af37]" />
    </div>
  );

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-[#0d0d0d]">
        <div className="container">
          <SectionHeader />
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="w-10 h-10 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (error || categories.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-[#0d0d0d]">
        <div className="container">
          <SectionHeader />
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-[#a1a1a1]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {error || "No categories available at the moment."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-[#0d0d0d]">
      <div className="container">
        <SectionHeader />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link key={category._id} href={`/categories/${category._id}`}>
              <div
                className="group relative overflow-hidden bg-[#111111] border border-[#262626] transition-all duration-300 hover:border-[#d4af37]/40 hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)]"
                style={{ borderRadius: "8px" }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image || '/placeholder.svg'}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { e.target.src = '/placeholder.svg'; }}
                  />
                  {/* Gold overlay on hover */}
                  <div className="absolute inset-0 bg-[#d4af37]/0 group-hover:bg-[#d4af37]/10 transition-all duration-300" />
                </div>
                <div className="p-3 text-center bg-[#111111]">
                  <h3
                    className="text-xs font-semibold tracking-wide text-[#fafafa] group-hover:text-[#d4af37] transition-colors uppercase"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/categories">
            <button
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-105 border-2 border-[#d4af37] text-[#d4af37] bg-transparent hover:bg-[#d4af37] hover:text-[#0a0a0a]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              View All Categories
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
