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

  const PageHeader = () => (
    <section className="py-20 bg-[#0d0d0d] border-b border-[#262626]">
      <div className="container text-center">
        <span
          className="text-xs tracking-[0.3em] text-[#d4af37] uppercase mb-3 block"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Shop By
        </span>
        <h1
          className="text-4xl md:text-6xl font-bold text-[#fafafa] mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Fragrance <span className="text-[#d4af37] italic">Categories</span>
        </h1>
        <p
          className="max-w-[600px] mx-auto text-[#a1a1a1] text-sm leading-relaxed"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Explore our curated collections — from floral and oriental to fresh and woody, discover your perfect scent family.
        </p>
        <div className="mt-4 h-px w-16 bg-[#d4af37] mx-auto" />
      </div>
    </section>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <PageHeader />
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
            <span
              className="text-[#a1a1a1] text-sm"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Loading categories...
            </span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <PageHeader />
        <div className="flex justify-center items-center min-h-[300px]">
          <p
            className="text-[#a1a1a1]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {error}. Please try again later.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <PageHeader />
        <div className="flex justify-center items-center min-h-[300px]">
          <p
            className="text-[#a1a1a1]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            No categories available at the moment.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <PageHeader />

      {/* Categories Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link key={category._id} href={`/categories/${category._id}`}>
                <div
                  className="group relative overflow-hidden bg-[#111111] border border-[#262626] transition-all duration-300 hover:border-[#d4af37]/40 hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] hover:scale-[1.02]"
                  style={{ borderRadius: "8px" }}
                >
                  {/* Image */}
                  <div className="aspect-[16/9] overflow-hidden bg-[#0d0d0d]">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => { e.target.src = "/placeholder.svg"; }}
                    />
                    <div className="absolute inset-0 bg-[#d4af37]/0 group-hover:bg-[#d4af37]/10 transition-all duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3
                      className="text-xl font-bold text-[#fafafa] mb-2 group-hover:text-[#d4af37] transition-colors"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {category.name}
                    </h3>
                    <p
                      className="text-[#a1a1a1] text-sm leading-relaxed mb-5"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {category.description || "Explore this collection"}
                    </p>
                    <div className="flex items-center justify-between">
                      {category.productCount !== undefined && (
                        <span
                          className="text-xs tracking-widest uppercase text-[#a1a1a1]"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {category.productCount} Items
                        </span>
                      )}
                      <span
                        className="text-xs tracking-widest uppercase text-[#d4af37] flex items-center gap-2 ml-auto group-hover:gap-3 transition-all"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        Browse Collection
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* Gold bottom border accent */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#d4af37] transition-all duration-500 group-hover:w-full" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
