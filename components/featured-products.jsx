"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CirclePlus, Star } from "lucide-react";
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
          const products = response.data.data.products;
          setProducts(products);
          if (products.length > 0) {
            const productIds = products.map(p => p._id);
            try {
              const reviewResponse = await axios.post('/api/reviews/summary', { productIds });
              if (reviewResponse.data.success) {
                setReviewSummaries(reviewResponse.data.data);
              }
            } catch {
              setReviewSummaries(productIds.reduce((acc, id) => {
                acc[id] = { reviewCount: 0, averageRating: 0 };
                return acc;
              }, {}));
            }
          }
        } else {
          setError("Failed to load featured products");
        }
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred while fetching featured products");
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  const formatPrice = (price) => `Rs. ${price.toFixed(0)}`;

  const handleAddToCart = (product) => {
    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < Math.floor(rating) ? "fill-[#d4af37] text-[#d4af37]" : "fill-[#262626] text-[#262626]"}`}
      />
    ));
  };

  const SectionHeader = () => (
    <div className="mb-12 flex flex-col items-center text-center">
      <span
        className="text-xs tracking-[0.3em] text-[#d4af37] uppercase mb-3"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        Our Collection
      </span>
      <h2
        className="text-4xl md:text-5xl font-bold text-[#fafafa] mb-4"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Exquisite <span className="text-[#d4af37] italic">Fragrances</span>
      </h2>
      <p
        className="max-w-[600px] text-[#a1a1a1] text-sm leading-relaxed"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        Discover our curated selection of premium perfumes, each crafted to leave a lasting impression and elevate your presence.
      </p>
      <div className="mt-4 h-px w-16 bg-[#d4af37]" />
    </div>
  );

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="container">
          <SectionHeader />
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
              <span className="text-[#a1a1a1] text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Loading fragrances...
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || products.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="container">
          <SectionHeader />
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-[#a1a1a1]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {error || "No featured fragrances available at the moment."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-[#0a0a0a]">
      <div className="container">
        <SectionHeader />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => {
            const summary = reviewSummaries[product._id] || { reviewCount: 0, averageRating: 0 };
            const categoryName = typeof product.category === 'object' && product.category?.name
              ? product.category.name
              : typeof product.category === 'string'
              ? product.category
              : "Fragrance";

            return (
              <div
                key={product._id}
                className="group relative bg-[#111111] border border-[#262626] overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] hover:border-[#d4af37]/30"
                style={{ borderRadius: "8px" }}
              >
                {/* Category badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span
                    className="px-2 py-1 text-[10px] font-bold tracking-widest uppercase"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      backgroundColor: "#d4af37",
                      color: "#0a0a0a",
                      borderRadius: "3px",
                    }}
                  >
                    {categoryName}
                  </span>
                </div>

                {/* Product image */}
                <Link href={`/products/${product._id}`}>
                  <div className="relative h-64 w-full overflow-hidden bg-[#0d0d0d]">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <span className="text-[#a1a1a1]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          {product.name}
                        </span>
                      </div>
                    )}
                    {/* Gold overlay on hover */}
                    <div className="absolute inset-0 bg-[#d4af37]/0 group-hover:bg-[#d4af37]/10 transition-all duration-300" />
                  </div>
                </Link>

                {/* Product info */}
                <div className="p-5">
                  {/* Stars */}
                  {summary.reviewCount > 0 && (
                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(summary.averageRating)}
                      <span
                        className="text-xs text-[#a1a1a1] ml-1"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        ({summary.reviewCount})
                      </span>
                    </div>
                  )}

                  {/* Name */}
                  <Link href={`/products/${product._id}`}>
                    <h3
                      className="font-bold text-lg text-[#fafafa] mb-1 hover:text-[#d4af37] transition-colors leading-tight"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {product.name}
                    </h3>
                  </Link>

                  {/* Description */}
                  <p
                    className="text-[#a1a1a1] text-xs mb-4 line-clamp-2 leading-relaxed"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {product.description}
                  </p>

                  {/* Price + Cart */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-lg font-semibold text-[#d4af37]"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {formatPrice(product.price)}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold tracking-wide uppercase transition-all duration-300 hover:scale-105"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        backgroundColor: "#d4af37",
                        color: "#0a0a0a",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "4px",
                      }}
                    >
                      <CirclePlus className="h-3 w-3" /> Add
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All button */}
        <div className="mt-12 flex justify-center">
          <Link href="/products">
            <button
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-105 border-2 border-[#d4af37] text-[#d4af37] bg-transparent hover:bg-[#d4af37] hover:text-[#0a0a0a]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              View Full Collection
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
