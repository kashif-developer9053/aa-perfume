"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/footer";
import axios from "axios";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

export default function CategoryProductsPage() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDesc, setCategoryDesc] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  const formatPrice = (price) => `Rs. ${price.toFixed(0)}`;

  const handleAddToCart = (product) => {
    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get(`/api/products?category=${categoryId}`),
          axios.get("/api/products/categories"),
        ]);

        if (productsRes.data.success) {
          setProducts(productsRes.data.data.products);
        } else {
          setError("Failed to load products");
        }

        if (categoriesRes.data.success) {
          const cat = categoriesRes.data.data.find((c) => c._id === categoryId);
          if (cat) {
            setCategoryName(cat.name);
            setCategoryDesc(cat.description || "");
            setCategoryImage(cat.image || "");
          } else if (productsRes.data.data?.products?.length > 0) {
            setCategoryName(productsRes.data.data.products[0].category?.name || "Collection");
          }
        }
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred while fetching products");
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) fetchCategoryProducts();
    else { setError("Invalid category"); setLoading(false); }
  }, [categoryId]);

  // Split name for italic last word effect
  const nameParts = categoryName ? categoryName.split(" ") : [];
  const nameStart = nameParts.slice(0, -1).join(" ");
  const nameLast = nameParts.slice(-1)[0] || "";

  return (
    <div className="min-h-screen bg-[#0a0a0a]">

      {/* ── Hero Header ── */}
      <section className="relative overflow-hidden">
        {/* Background: category image if available, else pattern */}
        {categoryImage ? (
          <>
            <div className="absolute inset-0">
              <img src={categoryImage} alt={categoryName} className="w-full h-full object-cover opacity-15" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/80 to-[#0a0a0a]" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: "repeating-linear-gradient(90deg,#d4af37 0,#d4af37 1px,transparent 1px,transparent 70px),repeating-linear-gradient(0deg,#d4af37 0,#d4af37 1px,transparent 1px,transparent 70px)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] to-[#0a0a0a]" />
          </>
        )}

        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#d4af37]/5 blur-[100px] pointer-events-none" />

        {/* Corner ornaments */}
        <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[#d4af37]/30" />
        <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-[#d4af37]/30" />

        <div className="relative z-10 container py-24 md:py-32 text-center">
          {/* Breadcrumb */}
          <nav className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase mb-8"
            style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <Link href="/" className="text-[#555] hover:text-[#d4af37] transition-colors">Home</Link>
            <span className="text-[#333]">/</span>
            <Link href="/categories" className="text-[#555] hover:text-[#d4af37] transition-colors">Collections</Link>
            <span className="text-[#333]">/</span>
            <span className="text-[#d4af37]">{categoryName || "..."}</span>
          </nav>

          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-[#d4af37]/60" />
            <span className="text-[10px] tracking-[0.4em] text-[#d4af37] uppercase font-semibold"
              style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Collection
            </span>
            <div className="h-px w-10 bg-[#d4af37]/60" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-[#fafafa] mb-5 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            {loading ? (
              <span className="text-[#d4af37] italic">Loading...</span>
            ) : categoryName ? (
              <>
                {nameStart && <>{nameStart} </>}
                <span className="text-[#d4af37] italic">{nameLast}</span>
              </>
            ) : (
              <span className="text-[#d4af37] italic">Collection</span>
            )}
          </h1>

          {categoryDesc && (
            <p className="max-w-[500px] mx-auto text-[#888] text-sm leading-relaxed"
              style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {categoryDesc}
            </p>
          )}

          <div className="flex items-center justify-center gap-3 mt-7">
            <div className="h-px w-14 bg-[#d4af37]/40" />
            <div className="w-1.5 h-1.5 rotate-45 border border-[#d4af37]/60" />
            <div className="h-px w-14 bg-[#d4af37]/40" />
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section className="py-16 md:py-24">
        <div className="container">

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1,2,3,4].map(i => (
                <div key={i}>
                  <div className="aspect-[3/4] bg-[#111111] border border-[#1a1a1a] animate-pulse" />
                  <div className="mt-3 h-3 bg-[#111111] animate-pulse" />
                  <div className="mt-2 h-3 bg-[#111111] animate-pulse w-2/3" />
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-20 gap-5">
              <p className="text-[#555] text-xs tracking-widest uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Unable to load this collection
              </p>
              <Link href="/categories">
                <button className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase border border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-all"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Back to Collections
                </button>
              </Link>
            </div>
          )}

          {/* Products */}
          {!loading && !error && products.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-10">
                <p className="text-[10px] tracking-[0.3em] text-[#555] uppercase"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {products.length} {products.length === 1 ? "product" : "products"} found
                </p>
                <Link href="/products" className="text-[10px] tracking-[0.2em] text-[#d4af37] uppercase hover:text-[#c9a227] transition-colors"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  View All →
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                  <div key={product._id}
                    className="group relative overflow-hidden bg-[#0d0d0d] border border-[#1a1a1a] hover:border-[#d4af37]/35 transition-all duration-400 hover:shadow-[0_20px_50px_rgba(212,175,55,0.12)]">

                    {/* Sale badge */}
                    {product.discountedPrice && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2 py-0.5 text-[9px] font-bold tracking-[0.2em] uppercase bg-[#d4af37] text-[#0a0a0a]"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          Sale
                        </span>
                      </div>
                    )}

                    {/* Image */}
                    <Link href={`/products/${product._id}`}>
                      <div className="relative aspect-[3/4] overflow-hidden bg-[#111111]">
                        {product.images?.length > 0 ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                            style={{ transform: "scale(1)", transition: "transform 0.7s ease" }}
                            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
                            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                            onError={e => { e.target.onerror = null; e.target.style.display = "none"; }}
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <span className="text-4xl font-bold text-[#d4af37]/20 select-none"
                              style={{ fontFamily: "'Playfair Display', serif" }}>
                              {product.name?.charAt(0)}
                            </span>
                          </div>
                        )}
                        {/* Bottom gradient on image */}
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
                        {/* Gold shimmer */}
                        <div className="absolute inset-0 bg-[#d4af37]/0 group-hover:bg-[#d4af37]/6 transition-all duration-500" />
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-4 pt-3">
                      <Link href={`/products/${product._id}`}>
                        <h3 className="font-bold text-base text-[#fafafa] mb-0.5 group-hover:text-[#d4af37] transition-colors leading-snug line-clamp-1"
                          style={{ fontFamily: "'Playfair Display', serif" }}>
                          {product.name}
                        </h3>
                      </Link>
                      {product.brand && (
                        <p className="text-[10px] tracking-[0.15em] text-[#666] uppercase mb-3"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          {product.brand}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-[#1a1a1a]">
                        <div className="flex flex-col">
                          {product.discountedPrice ? (
                            <>
                              <span className="text-sm font-semibold text-[#d4af37]"
                                style={{ fontFamily: "'Montserrat', sans-serif" }}>
                                {formatPrice(product.discountedPrice)}
                              </span>
                              <span className="text-[10px] text-[#555] line-through"
                                style={{ fontFamily: "'Montserrat', sans-serif" }}>
                                {formatPrice(product.price)}
                              </span>
                            </>
                          ) : (
                            <span className="text-sm font-semibold text-[#d4af37]"
                              style={{ fontFamily: "'Montserrat', sans-serif" }}>
                              {formatPrice(product.price)}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => handleAddToCart(product)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 text-[10px] font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                          style={{
                            fontFamily: "'Montserrat', sans-serif",
                            backgroundColor: "#d4af37",
                            color: "#0a0a0a",
                          }}
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                          Add
                        </button>
                      </div>
                    </div>

                    {/* Gold sweep bottom border */}
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#d4af37] group-hover:w-full transition-all duration-500" />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Empty state */}
          {!loading && !error && products.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 gap-7">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 border border-[#d4af37]/20 rotate-45" />
                <div className="absolute inset-3 border border-[#d4af37]/10 rotate-45" />
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-[#fafafa] text-lg font-semibold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Collection Coming Soon
                </p>
                <p className="text-[#555] text-xs tracking-widest" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  No fragrances in this collection yet.
                </p>
              </div>
              <div className="flex gap-3">
                <Link href="/categories">
                  <button className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-[0.18em] uppercase border border-[#262626] text-[#888] hover:border-[#d4af37]/50 hover:text-[#d4af37] transition-all"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    All Collections
                  </button>
                </Link>
                <Link href="/products">
                  <button className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-[0.18em] uppercase bg-[#d4af37] text-[#0a0a0a] hover:bg-[#c9a227] transition-all"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    All Products
                  </button>
                </Link>
              </div>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
}
