"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Footer from "@/components/footer";

const goldBtn = "inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold tracking-widest uppercase bg-[#d4af37] text-[#0a0a0a] hover:bg-[#c9a227] transition-all duration-300 hover:scale-[1.02]";
const outlineBtn = "inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold tracking-widest uppercase border border-[#d4af37] text-[#d4af37] bg-transparent hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-all duration-300";

export default function CartPage() {
  const { cartItems, updateQuantity, removeItem } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const applyPromoCode = () => {
    if (!promoCode) return;
    setIsApplyingPromo(true);
    setTimeout(() => {
      setIsApplyingPromo(false);
      toast({ title: "Invalid promo code", description: "The promo code you entered is invalid or expired.", variant: "destructive" });
    }, 1000);
  };

  const formatPrice = (price) => `Rs. ${price.toFixed(0)}`;
  const subtotal = cartItems.reduce((t, i) => t + i.price * i.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 250;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Page Header */}
      <section className="py-16 bg-[#0d0d0d] border-b border-[#262626]">
        <div className="container text-center">
          <span className="text-xs tracking-[0.3em] text-[#d4af37] uppercase mb-3 block" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Your Selection
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Shopping <span className="text-[#d4af37] italic">Cart</span>
          </h1>
          <div className="mt-4 h-px w-16 bg-[#d4af37] mx-auto" />
        </div>
      </section>

      <main className="py-12">
        <div className="container">
          {cartItems.length > 0 ? (
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Items */}
              <div className="lg:col-span-2 space-y-4">
                <div
                  className="hidden md:grid md:grid-cols-6 gap-4 pb-3 border-b border-[#262626] text-[10px] tracking-widest uppercase text-[#a1a1a1]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <div className="col-span-3">Product</div>
                  <div>Price</div>
                  <div>Qty</div>
                  <div className="text-right">Total</div>
                </div>

                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="bg-[#111111] border border-[#262626] p-5 transition-all duration-300 hover:border-[#d4af37]/20"
                    style={{ borderRadius: "8px" }}
                  >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-4 md:items-center">
                      {/* Product info */}
                      <div className="col-span-3 flex items-center gap-4">
                        <div className="h-20 w-20 overflow-hidden border border-[#262626] flex-shrink-0" style={{ borderRadius: "4px" }}>
                          <img
                            src={item.images?.[0] || `https://via.placeholder.com/200?text=${encodeURIComponent(item.name)}`}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <Link href={`/products/${item._id}`}>
                            <h3
                              className="font-bold text-[#fafafa] hover:text-[#d4af37] transition-colors"
                              style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-xs text-[#a1a1a1] mt-1 md:hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                            {formatPrice(item.price)}
                          </p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="hidden md:flex items-center text-[#d4af37] font-semibold text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {formatPrice(item.price)}
                      </div>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-[#262626]">
                          <button
                            className="h-8 w-8 flex items-center justify-center text-[#a1a1a1] hover:text-[#d4af37] hover:bg-[#1a1a1a] transition-colors disabled:opacity-30"
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <div
                            className="h-8 w-10 flex items-center justify-center text-[#fafafa] text-sm border-x border-[#262626]"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                          >
                            {item.quantity}
                          </div>
                          <button
                            className="h-8 w-8 flex items-center justify-center text-[#a1a1a1] hover:text-[#d4af37] hover:bg-[#1a1a1a] transition-colors"
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          className="h-8 w-8 flex items-center justify-center text-[#555] hover:text-red-400 transition-colors"
                          onClick={() => {
                            removeItem(item._id);
                            toast({ title: "Item Removed", description: `${item.name} removed from cart.` });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Row total */}
                      <div className="flex items-center justify-between md:justify-end">
                        <span className="text-xs text-[#a1a1a1] md:hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>Total:</span>
                        <span className="font-semibold text-[#d4af37]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Promo + Continue */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <input
                      className="bg-[#0d0d0d] border border-[#262626] text-[#fafafa] px-4 py-2 text-sm outline-none focus:border-[#d4af37] transition-colors"
                      style={{ maxWidth: "200px", borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button
                      className={outlineBtn}
                      style={{ borderRadius: "4px", padding: "8px 16px" }}
                      onClick={applyPromoCode}
                      disabled={isApplyingPromo || !promoCode}
                    >
                      {isApplyingPromo ? "..." : "Apply"}
                    </button>
                  </div>
                  <Link href="/products">
                    <button className={outlineBtn} style={{ borderRadius: "4px" }}>Continue Shopping</button>
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-4">
                <div className="bg-[#111111] border border-[#262626] p-6" style={{ borderRadius: "8px" }}>
                  <h2 className="text-lg font-bold text-[#fafafa] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Order Summary
                  </h2>
                  <div className="space-y-3 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    <div className="flex justify-between text-[#a1a1a1]">
                      <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-[#a1a1a1]">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? <span className="text-[#d4af37]">Free</span> : formatPrice(shipping)}</span>
                    </div>
                    {subtotal < 5000 && (
                      <p className="text-[10px] text-[#555]">
                        Add Rs. {(5000 - subtotal).toFixed(0)} more for free shipping
                      </p>
                    )}
                    <div className="h-px bg-[#262626] my-2" />
                    <div className="flex justify-between font-semibold text-base">
                      <span className="text-[#fafafa]">Total</span>
                      <span className="text-[#d4af37]">{formatPrice(total)}</span>
                    </div>
                  </div>
                  <Link href="/checkout" className="block mt-6">
                    <button className={`${goldBtn} w-full`} style={{ borderRadius: "4px" }}>
                      Proceed to Checkout <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                </div>

                <div className="bg-[#111111] border border-[#262626] p-5" style={{ borderRadius: "8px" }}>
                  <h3
                    className="text-[10px] tracking-widest uppercase text-[#a1a1a1] mb-3"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    We Accept
                  </h3>
                  <span
                    className="px-3 py-1 text-xs font-semibold tracking-wide uppercase bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37]"
                    style={{ fontFamily: "'Montserrat', sans-serif", borderRadius: "3px" }}
                  >
                    Cash on Delivery
                  </span>
                  <p className="text-xs text-[#555] mt-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Pay when your order arrives at your doorstep
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Empty cart */
            <div
              className="flex flex-col items-center justify-center py-24 border border-dashed border-[#262626] text-center"
              style={{ borderRadius: "8px" }}
            >
              <div className="w-20 h-20 rounded-full bg-[#111111] border border-[#262626] flex items-center justify-center mb-6">
                <ShoppingBag className="h-10 w-10 text-[#d4af37]/40" />
              </div>
              <h2
                className="text-2xl font-bold text-[#fafafa] mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Your cart is empty
              </h2>
              <p className="text-[#a1a1a1] text-sm mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Discover our luxury fragrances and find your signature scent.
              </p>
              <Link href="/products">
                <button className={goldBtn} style={{ borderRadius: "4px" }}>Explore Collection</button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
