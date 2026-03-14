"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import Footer from "@/components/footer";
import axios from "axios";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  const formatPrice = (price) => `Rs. ${price.toFixed(0)}`;

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    addToCart(product);
    toast({ title: "Added to Cart", description: `${product.name} added to your cart.` });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsRes, catsRes] = await Promise.all([
          axios.get("/api/products"),
          axios.get("/api/products/categories"),
        ]);
        if (productsRes.data.success) setProducts(productsRes.data.data.products);
        else setError("Failed to load products");
        if (catsRes.data.success) setCategories(catsRes.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred while fetching products");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => {
          const catId = typeof p.category === "object" ? p.category?._id : p.category;
          return catId === activeCategory;
        });

  const getCategoryName = (product) =>
    typeof product.category === "object" && product.category?.name
      ? product.category.name
      : typeof product.category === "string"
      ? product.category
      : null;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">

      {/* ── Hero Header ── */}
      <section className="relative py-28 md:py-36 overflow-hidden bg-[#0a0a0a] border-b border-[#1a1a1a]">
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
            <Link href="/" className="text-[#555] hover:text-[#d4af37] transition-colors">Home</Link>
            <span className="text-[#333]">/</span>
            <span className="text-[#d4af37]">Products</span>
          </nav>

          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#d4af37]/60" />
            <span className="text-[10px] tracking-[0.4em] text-[#d4af37] uppercase font-semibold"
              style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Explore
            </span>
            <div className="h-px w-12 bg-[#d4af37]/60" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-[#fafafa] leading-tight mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Our <span className="text-[#d4af37] italic">Collection</span>
          </h1>

          <p className="max-w-[480px] mx-auto text-[#888] text-sm leading-relaxed"
            style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Every fragrance is a story — carefully sourced, authentically delivered, and crafted to leave a lasting impression.
          </p>

          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-16 bg-[#d4af37]/40" />
            <div className="w-1.5 h-1.5 rotate-45 border border-[#d4af37]" />
            <div className="h-px w-16 bg-[#d4af37]/40" />
          </div>
        </div>
      </section>

      {/* ── Category Filter Bar ── */}
      {!loading && categories.length > 0 && (
        <div className="sticky top-0 z-30 bg-[#0a0a0a]/95 border-b border-[#1a1a1a]" style={{ backdropFilter: "blur(12px)" }}>
          <div className="container">
            <div className="flex items-center gap-1 overflow-x-auto py-4 scrollbar-none">
              <button
                onClick={() => setActiveCategory("all")}
                className="flex-shrink-0 px-5 py-2 text-[10px] font-semibold tracking-[0.2em] uppercase transition-all duration-200"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  color: activeCategory === "all" ? "#0a0a0a" : "#888",
                  backgroundColor: activeCategory === "all" ? "#d4af37" : "transparent",
                  border: activeCategory === "all" ? "1px solid #d4af37" : "1px solid #262626",
                }}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setActiveCategory(cat._id)}
                  className="flex-shrink-0 px-5 py-2 text-[10px] font-semibold tracking-[0.2em] uppercase transition-all duration-200"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    color: activeCategory === cat._id ? "#0a0a0a" : "#888",
                    backgroundColor: activeCategory === cat._id ? "#d4af37" : "transparent",
                    border: activeCategory === cat._id ? "1px solid #d4af37" : "1px solid #262626",
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Products Grid ── */}
      <section className="py-16 md:py-24">
        <div className="container">

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i}>
                  <div className="aspect-[3/4] bg-[#111111] border border-[#1a1a1a] animate-pulse" />
                  <div className="mt-3 h-3 bg-[#111111] animate-pulse" />
                  <div className="mt-2 h-3 bg-[#111111] animate-pulse w-1/2" />
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-20 gap-5">
              <p className="text-[#555] text-xs tracking-widest uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Unable to load products
              </p>
              <button onClick={() => window.location.reload()}
                className="px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase border border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-all"
                style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Try Again
              </button>
            </div>
          )}

          {/* Products */}
          {!loading && !error && (
            <>
              {filtered.length > 0 ? (
                <>
                  {/* Count */}
                  <p className="text-[10px] tracking-[0.3em] text-[#555] uppercase mb-10"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {filtered.length} {filtered.length === 1 ? "product" : "products"} found
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
                    {filtered.map((product) => {
                      const catName = getCategoryName(product);
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
                              {/* Gold shimmer */}
                              <div className="absolute inset-0 bg-[#d4af37]/0 group-hover:bg-[#d4af37]/7 transition-all duration-500" />

                              {/* Category pill */}
                              {catName && (
                                <div className="absolute top-3 left-3 z-10">
                                  <span className="px-2 py-0.5 text-[9px] font-bold tracking-[0.15em] uppercase text-[#0a0a0a] bg-[#d4af37]"
                                    style={{ fontFamily: "'Montserrat', sans-serif" }}>
                                    {catName}
                                  </span>
                                </div>
                              )}

                              {/* Sale badge */}
                              {product.discountedPrice && (
                                <div className="absolute top-3 right-3 z-10">
                                  <span className="px-2 py-0.5 text-[9px] font-bold tracking-[0.1em] uppercase text-white bg-red-900/80"
                                    style={{ fontFamily: "'Montserrat', sans-serif" }}>
                                    Sale
                                  </span>
                                </div>
                              )}

                              {/* Quick-add on hover */}
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

                              {/* Bottom overlay */}
                              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                                <div className="w-5 h-px bg-[#d4af37] mb-2 group-hover:w-10 transition-all duration-300" />
                                <h3 className="text-sm font-semibold text-[#fafafa] group-hover:text-[#d4af37] transition-colors leading-snug line-clamp-1 uppercase tracking-wide"
                                  style={{ fontFamily: "'Montserrat', sans-serif" }}>
                                  {product.name}
                                </h3>
                                {product.brand && (
                                  <p className="text-[9px] text-[#666] tracking-widest uppercase mt-0.5"
                                    style={{ fontFamily: "'Montserrat', sans-serif" }}>
                                    {product.brand}
                                  </p>
                                )}
                                <div className="flex items-center justify-between mt-2">
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
                </>
              ) : (
                /* Empty state */
                <div className="flex flex-col items-center justify-center py-24 gap-6">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <div className="absolute inset-0 border border-[#d4af37]/20 rotate-45" />
                    <div className="absolute inset-2.5 border border-[#d4af37]/10 rotate-45" />
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    </svg>
                  </div>
                  <p className="text-[#555] text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    No products in this collection
                  </p>
                  <button
                    onClick={() => setActiveCategory("all")}
                    className="px-7 py-3 text-xs font-semibold tracking-[0.2em] uppercase border border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-all"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    View All Products
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
