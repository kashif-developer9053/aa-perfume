"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  CirclePlus,
  Minus,
  Plus,
  Star,
  ShoppingCart,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";


export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart();


   const handleAddToCart = (product) => {
    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id);
      fetchReviews(params.id);
    }
  }, [params.id]);

  const fetchProduct = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/products/${id}`);

      if (response.data.success) {
        setProduct(response.data.data);
        // Fetch related products from the same category
        if (response.data.data.category) {
          fetchRelatedProducts(response.data.data.category._id, id);
        }
      } else {
        setError("Failed to load product details");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("An error occurred while fetching product details");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async (productId) => {
    try {
      const response = await axios.get(`/api/reviews/product/${productId}`);
      if (response.data.success) {
        setReviews(response.data.data);
      } else {
        console.error("Failed to load reviews:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const fetchRelatedProducts = async (categoryId, currentProductId) => {
    try {
      const response = await axios.get(`/api/products?category=${categoryId}&limit=4`);

      if (response.data.success) {
        // Filter out the current product
        const filteredProducts = response.data.data.products.filter(
          (prod) => prod._id !== currentProductId
        );
        setRelatedProducts(filteredProducts.slice(0, 4));
      }
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  // Function to format price
  const formatPrice = (price) => {
    return `Rs. ${price.toFixed(0)}`;
  };

  // Function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Handlers for quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (product && product.stock > quantity) {
      setQuantity(quantity + 1);
    }
  };

  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
          <span className="text-[#a1a1a1] text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Loading fragrance details...
          </span>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Fragrance Not Found
        </h1>
        <p className="text-[#a1a1a1] text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {error || "This product doesn't exist or has been removed."}
        </p>
        <Link href="/products">
          <span
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold tracking-widest uppercase cursor-pointer transition-all duration-300 hover:scale-105"
            style={{ fontFamily: "'Montserrat', sans-serif", backgroundColor: "#d4af37", color: "#0a0a0a" }}
          >
            <ChevronLeft className="h-4 w-4" /> Back to Collection
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12">
      <div className="container">
        <Link href="/products">
          <span
            className="inline-flex items-center gap-2 text-[#a1a1a1] hover:text-[#d4af37] transition-colors mb-8 text-sm cursor-pointer"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <ChevronLeft className="h-4 w-4" /> Back to Collection
          </span>
        </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden border border-[#262626] bg-[#111111]" style={{ borderRadius: "8px" }}>
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://via.placeholder.com/600x600?text=${encodeURIComponent(product.name)}`;
                }}
              />
            ) : (
              <div className="h-full w-full bg-[#111111] flex items-center justify-center">
                <Info className="h-12 w-12 text-[#a1a1a1]" />
              </div>
            )}
          </div>

          {product.images && product.images.length > 1 && (
            <div className="flex space-x-3 overflow-auto pb-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden border-2 transition-all duration-300 ${
                    activeImage === index ? "border-[#d4af37]" : "border-[#262626] hover:border-[#d4af37]/50"
                  }`}
                  style={{ borderRadius: "4px" }}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://via.placeholder.com/100x100?text=Image`;
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1
              className="text-3xl md:text-4xl font-bold text-[#fafafa]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {product.name}
            </h1>
            <div className="mt-3 flex items-center gap-3">
              <span
                className="text-2xl font-semibold text-[#d4af37]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {formatPrice(product.price)}
              </span>
              {product.discountedPrice && product.discountedPrice > 0 && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.discountedPrice)}
                </span>
              )}
            </div>
          </div>

      

          <div>
            <h3
              className="text-xs font-semibold tracking-widest uppercase text-[#a1a1a1] mb-2"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Description
            </h3>
            <p className="text-[#a1a1a1] text-sm leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {product.description}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <span
                className="text-[10px] font-bold tracking-widest uppercase px-2 py-1"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  backgroundColor: "#d4af37",
                  color: "#0a0a0a",
                  borderRadius: "3px",
                }}
              >
                {product.category?.name || "Fragrance"}
              </span>
            </div>
            {product.brand && (
              <span className="text-[#a1a1a1] text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {product.brand}
              </span>
            )}
          </div>

          <div>
            <h3
              className="text-xs font-semibold tracking-widest uppercase text-[#a1a1a1] mb-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Quantity
            </h3>
            <div className="flex items-center gap-3">
              <button
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className="w-10 h-10 flex items-center justify-center border border-[#262626] text-[#fafafa] hover:border-[#d4af37] hover:text-[#d4af37] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ borderRadius: "4px" }}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span
                className="w-12 text-center text-[#fafafa] font-semibold"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {quantity}
              </span>
              <button
                onClick={increaseQuantity}
                disabled={product.stock <= quantity}
                className="w-10 h-10 flex items-center justify-center border border-[#262626] text-[#fafafa] hover:border-[#d4af37] hover:text-[#d4af37] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ borderRadius: "4px" }}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleAddToCart(product)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-105"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                backgroundColor: "#d4af37",
                color: "#0a0a0a",
                border: "none",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              <CirclePlus className="h-4 w-4" /> Add to Cart
            </button>
            <button
              onClick={() => handleAddToCart(product)}
              disabled={product.stock <= 0}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-[#d4af37] hover:text-[#0a0a0a] disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                backgroundColor: "transparent",
                color: "#d4af37",
                border: "2px solid #d4af37",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              Buy Now
            </button>
          </div>

          <div className="pt-4 border-t border-[#262626]">
            <p className="text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {product.stock > 0 ? (
                <span className="text-green-400 font-medium">In Stock ({product.stock} available)</span>
              ) : (
                <span className="text-red-400 font-medium">Out of Stock</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mt-16">
        <h2
          className="text-2xl font-bold text-[#fafafa] mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Customer <span className="text-[#d4af37] italic">Reviews</span>
        </h2>
        {reviews.length === 0 ? (
          <div className="bg-[#111111] border border-[#262626] p-8 text-center" style={{ borderRadius: "8px" }}>
            <p className="text-[#a1a1a1] text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              No reviews yet for this fragrance. Be the first to review!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-[#111111] border border-[#262626] p-6 transition-all hover:border-[#d4af37]/20"
                style={{ borderRadius: "8px" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-[#fafafa] text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {review.userId?.name || "Anonymous"}
                    </span>
                    <span className="text-xs text-[#a1a1a1]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 ${index < review.rating ? "fill-[#d4af37] text-[#d4af37]" : "text-[#262626]"}`}
                      />
                    ))}
                  </div>
                </div>
                {review.comment && (
                  <p className="text-[#a1a1a1] text-sm leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                    "{review.comment}"
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2
            className="text-2xl font-bold text-[#fafafa] mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            You May Also <span className="text-[#d4af37] italic">Like</span>
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct._id}
                className="group bg-[#111111] border border-[#262626] overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-[#d4af37]/30"
                style={{ borderRadius: "8px" }}
              >
                <Link href={`/products/${relatedProduct._id}`}>
                  <div className="relative h-48 w-full overflow-hidden bg-[#0d0d0d]">
                    {relatedProduct.images && relatedProduct.images.length > 0 ? (
                      <img
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(relatedProduct.name)}`;
                        }}
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <span className="text-[#a1a1a1] text-sm">{relatedProduct.name}</span>
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={`/products/${relatedProduct._id}`}>
                    <h3
                      className="font-bold text-[#fafafa] hover:text-[#d4af37] transition-colors mb-2"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {relatedProduct.name}
                    </h3>
                  </Link>
                  <div className="flex justify-between items-center">
                    <span
                      className="text-[#d4af37] font-semibold"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {formatPrice(relatedProduct.price)}
                    </span>
                    <button
                      onClick={() => handleAddToCart(relatedProduct)}
                      disabled={relatedProduct.stock <= 0}
                      className="w-8 h-8 flex items-center justify-center border border-[#262626] text-[#fafafa] hover:border-[#d4af37] hover:text-[#d4af37] transition-all disabled:opacity-40"
                      style={{ borderRadius: "4px" }}
                    >
                      <CirclePlus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}