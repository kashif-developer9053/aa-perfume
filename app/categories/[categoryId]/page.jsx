"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { CirclePlus, ChevronRight } from "lucide-react";
import Footer from "@/components/footer";
import axios from "axios";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

export default function CategoryProductsPage() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDesc, setCategoryDesc] = useState("");
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
          } else if (productsRes.data.data?.products?.length > 0) {
            setCategoryName(productsRes.data.data.products[0].category?.name || "Category");
          }
        }
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred while fetching products");
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchCategoryProducts();
    } else {
      setError("Invalid category ID");
      setLoading(false);
    }
  }, [categoryId]);

  const PageHeader = () => (
    <section className="py-20 bg-[#0d0d0d] border-b border-[#262626]">
      <div className="container text-center">
        {/* Breadcrumb */}
        <nav
          className="flex items-center justify-center gap-2 text-xs tracking-widest uppercase mb-6"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <Link href="/" className="text-[#a1a1a1] hover:text-[#d4af37] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-[#a1a1a1]" />
          <Link href="/categories" className="text-[#a1a1a1] hover:text-[#d4af37] transition-colors">Categories</Link>
          <ChevronRight className="w-3 h-3 text-[#a1a1a1]" />
          <span className="text-[#d4af37]">{categoryName || "..."}</span>
        </nav>

        <span
          className="text-xs tracking-[0.3em] text-[#d4af37] uppercase mb-3 block"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Collection
        </span>
        <h1
          className="text-4xl md:text-6xl font-bold text-[#fafafa] mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {categoryName ? (
            <>
              {categoryName.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-[#d4af37] italic">
                {categoryName.split(" ").slice(-1)[0]}
              </span>
            </>
          ) : (
            <span className="text-[#d4af37] italic">Loading...</span>
          )}
        </h1>
        {categoryDesc && (
          <p
            className="max-w-[600px] mx-auto text-[#a1a1a1] text-sm leading-relaxed"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {categoryDesc}
          </p>
        )}
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
              Loading collection...
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

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <PageHeader />

      {/* Products Grid */}
      <section className="py-16">
        <div className="container">
          {products.length > 0 ? (
            <>
              <p
                className="text-[#a1a1a1] text-xs tracking-widest uppercase mb-8"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {products.length} {products.length === 1 ? "product" : "products"} found
              </p>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="group relative bg-[#111111] border border-[#262626] overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] hover:border-[#d4af37]/30"
                    style={{ borderRadius: "8px" }}
                  >
                    {/* Discount badge */}
                    {product.discountedPrice && (
                      <div className="absolute top-3 left-3 z-10">
                        <span
                          className="px-2 py-1 text-[10px] font-bold tracking-widest uppercase bg-[#d4af37] text-[#0a0a0a]"
                          style={{ fontFamily: "'Montserrat', sans-serif", borderRadius: "3px" }}
                        >
                          Sale
                        </span>
                      </div>
                    )}

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
                            <span
                              className="text-[#a1a1a1]"
                              style={{ fontFamily: "'Montserrat', sans-serif" }}
                            >
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
                        className="text-[#a1a1a1] text-xs mb-1 leading-relaxed"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {product.brand}
                      </p>
                      <p
                        className="text-[#a1a1a1] text-xs mb-4 line-clamp-2 leading-relaxed"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          {product.discountedPrice ? (
                            <>
                              <span
                                className="text-lg font-semibold text-[#d4af37]"
                                style={{ fontFamily: "'Montserrat', sans-serif" }}
                              >
                                {formatPrice(product.discountedPrice)}
                              </span>
                              <span
                                className="text-xs text-[#a1a1a1] line-through"
                                style={{ fontFamily: "'Montserrat', sans-serif" }}
                              >
                                {formatPrice(product.price)}
                              </span>
                            </>
                          ) : (
                            <span
                              className="text-lg font-semibold text-[#d4af37]"
                              style={{ fontFamily: "'Montserrat', sans-serif" }}
                            >
                              {formatPrice(product.price)}
                            </span>
                          )}
                        </div>

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

                    {/* Gold bottom border accent on hover */}
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#d4af37] transition-all duration-500 group-hover:w-full" />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p
                className="text-[#a1a1a1] mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                No fragrances available in this category yet.
              </p>
              <Link href="/categories">
                <button
                  className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-105 border-2 border-[#d4af37] text-[#d4af37] bg-transparent hover:bg-[#d4af37] hover:text-[#0a0a0a]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Browse All Categories
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
