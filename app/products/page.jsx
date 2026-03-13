// components/FeaturedProducts.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/products");
        console.log("API Response:", JSON.stringify(response.data, null, 2));
        if (response.data.success) {
          setProducts(response.data.data.products);
        } else {
          setError("Failed to load products");
        }
      } catch (error) {
        console.error("Error fetching products:", error.message, error.stack);
        setError(error.response?.data?.message || "An error occurred while fetching products");
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
          <span className="text-[#a1a1a1] text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Loading collection...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-[#a1a1a1]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {error}. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Page Header */}
      <section className="py-20 bg-[#0d0d0d] border-b border-[#262626]">
        <div className="container text-center">
          <span
            className="text-xs tracking-[0.3em] text-[#d4af37] uppercase mb-3 block"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Explore
          </span>
          <h1
            className="text-4xl md:text-6xl font-bold text-[#fafafa] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our <span className="text-[#d4af37] italic">Collection</span>
          </h1>
          <p
            className="max-w-[600px] mx-auto text-[#a1a1a1] text-sm leading-relaxed"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Discover our complete range of luxury fragrances — each one carefully curated to elevate your presence and leave a lasting impression.
          </p>
          <div className="mt-4 h-px w-16 bg-[#d4af37] mx-auto" />
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => {
                const categoryName = typeof product.category === "object" && product.category?.name
                  ? product.category.name
                  : typeof product.category === "string"
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

                    <Link href={`/products/${product._id}`}>
                      <div className="relative h-64 w-full overflow-hidden bg-[#0d0d0d]">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(product.name)}`;
                            }}
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <span className="text-[#a1a1a1]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                              {product.name}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-[#d4af37]/0 group-hover:bg-[#d4af37]/10 transition-all duration-300" />
                      </div>
                    </Link>

                    <div className="p-5">
                      <Link href={`/products/${product._id}`}>
                        <h3
                          className="font-bold text-lg text-[#fafafa] mb-1 hover:text-[#d4af37] transition-colors leading-tight"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {product.name}
                        </h3>
                      </Link>
                      <p
                        className="text-[#a1a1a1] text-xs mb-4 line-clamp-2 leading-relaxed"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {product.description}
                      </p>
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
          ) : (
            <div className="text-center py-20">
              <p className="text-[#a1a1a1]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                No fragrances available at the moment.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}