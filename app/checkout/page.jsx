"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, Truck, CreditCard, MapPin, User, CheckCircle, ChevronRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import Footer from "@/components/footer";

const inputClass =
  "w-full bg-[#0d0d0d] border border-[#262626] text-[#fafafa] px-4 py-3 text-sm outline-none focus:border-[#d4af37] transition-colors placeholder:text-[#444]";
const labelClass = "block text-[10px] tracking-widest uppercase text-[#a1a1a1] mb-2";
const goldBtn =
  "inline-flex items-center justify-center gap-2 w-full py-4 text-xs font-semibold tracking-widest uppercase bg-[#d4af37] text-[#0a0a0a] hover:bg-[#c9a227] transition-all duration-300 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";
const sectionCard = "bg-[#111111] border border-[#262626] p-6 space-y-5";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, clearCart, cartCount } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [orderTrackingNumber, setOrderTrackingNumber] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", postalCode: "", notes: ""
  });

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        setCurrentUser(user);
        setFormData((prev) => ({
          ...prev,
          firstName: user.name?.split(" ")[0] || "",
          lastName: user.name?.split(" ").slice(1).join(" ") || "",
          email: user.email || "",
          phone: user.phone || "",
        }));
      }
    } catch (e) {
      console.error("Error loading user data:", e);
    } finally {
      setIsUserLoaded(true);
    }
  }, []);

  if (cartCount === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 mx-auto text-[#d4af37]/30 mb-4" />
          <h1 className="text-2xl font-bold text-[#fafafa] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Your cart is empty
          </h1>
          <p className="text-[#a1a1a1] text-sm mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Add some fragrances before checkout
          </p>
          <Link href="/products">
            <button
              className="px-8 py-3 text-xs font-semibold tracking-widest uppercase bg-[#d4af37] text-[#0a0a0a] hover:bg-[#c9a227] transition-all"
              style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}
            >
              Explore Collection
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = cartItems.reduce((t, i) => t + i.price * i.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 250;
  const total = subtotal + shipping;
  const formatPrice = (price) => `Rs. ${price.toFixed(0)}`;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const required = ["firstName", "lastName", "email", "phone", "address", "city"];
    const missing = required.filter((f) => !formData[f].trim());
    if (missing.length > 0) {
      toast({ title: "Missing Information", description: `Please fill in: ${missing.join(", ")}`, variant: "destructive" });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address", variant: "destructive" });
      return false;
    }
    if (!/^(\+92|0)?[0-9]{10}$/.test(formData.phone.replace(/\s+/g, ""))) {
      toast({ title: "Invalid Phone", description: "Please enter a valid Pakistani phone number", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
    setIsProcessing(true);
    try {
      const customerData = {
        firstName: formData.firstName, lastName: formData.lastName,
        email: formData.email, phone: formData.phone,
        ...(currentUser
          ? { userId: currentUser._id, username: currentUser.name, userRole: currentUser.role }
          : { username: "unregistered user", userId: null }),
      };
      const orderData = {
        customer: customerData,
        address: { street: formData.address, city: formData.city, postalCode: formData.postalCode || "N/A" },
        items: cartItems.map((item) => ({
          productId: item._id, name: item.name, price: item.price,
          quantity: item.quantity, image: item.images?.[0] || null,
        })),
        pricing: { subtotal, shipping, tax: 0, total },
        paymentMethod, paymentStatus: "pending", orderStatus: "confirmed",
        notes: formData.notes || "", orderDate: new Date().toISOString(),
        isRegisteredUser: !!currentUser,
      };
      const response = await axios.post("/api/orders", orderData, { withCredentials: true });
      if (response.data.success) {
        setOrderId(response.data.data._id);
        setOrderTrackingNumber(response.data.data.trackingNumber);
        setOrderPlaced(true);
        clearCart();
        toast({ title: "Order Placed!", description: `Order #${response.data.data._id.slice(-6)} confirmed.` });
      } else {
        throw new Error(response.data.message || "Failed to place order");
      }
    } catch (error) {
      toast({ title: "Order Failed", description: error.response?.data?.message || "Please try again.", variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  // ── Order Success ───────────────────────────────────────────────
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center py-16">
        <div className="max-w-lg w-full mx-auto px-4 text-center">
          <div className="w-24 h-24 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-[#d4af37]" />
          </div>
          <h1 className="text-4xl font-bold text-[#fafafa] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Order <span className="text-[#d4af37] italic">Confirmed!</span>
          </h1>
          <p className="text-[#a1a1a1] text-sm mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Thank you for your order. We will start processing it right away.
          </p>

          {currentUser ? (
            <div className="bg-[#111111] border border-[#d4af37]/20 px-4 py-3 rounded mb-6 text-sm text-[#a1a1a1]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Hi {currentUser.name}! Your order is linked to your account — track it under <span className="text-[#d4af37]">My Orders</span>.
            </div>
          ) : (
            <div className="bg-[#111111] border border-[#262626] px-4 py-3 rounded mb-6 text-sm text-[#a1a1a1]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Ordered as a guest. <Link href="/register" className="text-[#d4af37] hover:underline">Create an account</Link> to track orders easily.
            </div>
          )}

          {/* Order ID + Tracking */}
          <div className="bg-[#111111] border border-[#262626] p-6 mb-6 text-left space-y-4" style={{ borderRadius: "8px" }}>
            <div>
              <p className="text-[10px] tracking-widest uppercase text-[#a1a1a1] mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Order ID</p>
              <div className="bg-[#0d0d0d] border border-[#262626] px-4 py-3 select-all">
                <p className="text-2xl font-mono font-bold text-[#fafafa]">#{orderId?.slice(-6).toUpperCase()}</p>
              </div>
            </div>
            <div>
              <p className="text-[10px] tracking-widest uppercase text-[#a1a1a1] mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Tracking Number</p>
              <div className="bg-[#0d0d0d] border border-[#262626] px-4 py-3 select-all">
                <p className="text-xl font-mono font-bold text-[#d4af37]">{orderTrackingNumber || "Generating..."}</p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-[#111111] border border-[#262626] p-5 mb-6 text-left text-sm" style={{ borderRadius: "8px", fontFamily: "'Montserrat', sans-serif" }}>
            <p className="text-[10px] tracking-widest uppercase text-[#a1a1a1] mb-3">Order Summary</p>
            <div className="space-y-2 text-[#a1a1a1]">
              <div className="flex justify-between"><span>Customer</span><span className="text-[#fafafa]">{currentUser ? currentUser.name : `${formData.firstName} ${formData.lastName}`}</span></div>
              <div className="flex justify-between"><span>Total</span><span className="text-[#d4af37] font-semibold">{formatPrice(total)}</span></div>
              <div className="flex justify-between"><span>Payment</span><span className="text-[#fafafa]">Cash on Delivery</span></div>
              <div className="flex justify-between"><span>Estimated Delivery</span><span className="text-[#fafafa]">2–3 business days</span></div>
            </div>
          </div>

          <div className="space-y-3">
            <Link href="/track-order">
              <button className="inline-flex items-center justify-center gap-2 w-full py-3 text-xs font-semibold tracking-widest uppercase bg-[#d4af37] text-[#0a0a0a] hover:bg-[#c9a227] transition-all" style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}>
                Track Your Order
              </button>
            </Link>
            {currentUser && (
              <Link href="/my-orders">
                <button className="inline-flex items-center justify-center gap-2 w-full py-3 text-xs font-semibold tracking-widest uppercase border border-[#d4af37] text-[#d4af37] bg-transparent hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-all" style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}>
                  View My Orders
                </button>
              </Link>
            )}
            <Link href="/products">
              <button className="inline-flex items-center justify-center gap-2 w-full py-3 text-xs font-semibold tracking-widest uppercase border border-[#262626] text-[#a1a1a1] bg-transparent hover:border-[#d4af37] hover:text-[#d4af37] transition-all" style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}>
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Loading ─────────────────────────────────────────────────────
  if (!isUserLoaded) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#a1a1a1] text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>Loading checkout...</p>
        </div>
      </div>
    );
  }

  // ── Checkout Form ───────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Page Header */}
      <section className="py-16 bg-[#0d0d0d] border-b border-[#262626]">
        <div className="container">
          <nav className="flex items-center gap-2 text-xs tracking-widest uppercase mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <Link href="/cart" className="text-[#a1a1a1] hover:text-[#d4af37] transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" /> Cart
            </Link>
            <ChevronRight className="h-3 w-3 text-[#555]" />
            <span className="text-[#d4af37]">Checkout</span>
          </nav>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs tracking-[0.3em] text-[#d4af37] uppercase mb-2 block" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Secure
              </span>
              <h1 className="text-4xl font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Check<span className="text-[#d4af37] italic">out</span>
              </h1>
            </div>
            {currentUser ? (
              <div className="flex items-center gap-2 text-xs text-[#d4af37]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                <User className="h-4 w-4" /> {currentUser.name}
              </div>
            ) : (
              <div className="text-xs text-[#a1a1a1]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                <Link href="/login" className="text-[#d4af37] hover:underline">Login</Link> to save this order
              </div>
            )}
          </div>
          <div className="mt-4 h-px w-16 bg-[#d4af37]" />
        </div>
      </section>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-6">
            {/* Customer Info */}
            <div className={sectionCard} style={{ borderRadius: "8px" }}>
              <div className="flex items-center gap-3 pb-2 border-b border-[#262626]">
                <User className="h-4 w-4 text-[#d4af37]" />
                <h2 className="text-sm font-semibold tracking-widest uppercase text-[#fafafa]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Customer Information
                  {currentUser && <span className="ml-2 text-[#d4af37] font-normal normal-case text-xs">(from your account)</span>}
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} style={{ fontFamily: "'Montserrat', sans-serif" }}>First Name *</label>
                  <input className={inputClass} style={{ borderRadius: "4px" }} name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First name" />
                </div>
                <div>
                  <label className={labelClass} style={{ fontFamily: "'Montserrat', sans-serif" }}>Last Name *</label>
                  <input className={inputClass} style={{ borderRadius: "4px" }} name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last name" />
                </div>
              </div>
              <div>
                <label className={labelClass} style={{ fontFamily: "'Montserrat', sans-serif" }}>Email *</label>
                <input className={`${inputClass} ${currentUser ? "opacity-60 cursor-not-allowed" : ""}`} style={{ borderRadius: "4px" }} name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Email address" readOnly={!!currentUser} />
              </div>
              <div>
                <label className={labelClass} style={{ fontFamily: "'Montserrat', sans-serif" }}>Phone Number *</label>
                <input className={inputClass} style={{ borderRadius: "4px" }} name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="03XX-XXXXXXX" />
              </div>
            </div>

            {/* Delivery Address */}
            <div className={sectionCard} style={{ borderRadius: "8px" }}>
              <div className="flex items-center gap-3 pb-2 border-b border-[#262626]">
                <MapPin className="h-4 w-4 text-[#d4af37]" />
                <h2 className="text-sm font-semibold tracking-widest uppercase text-[#fafafa]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Delivery Address</h2>
              </div>
              <div>
                <label className={labelClass} style={{ fontFamily: "'Montserrat', sans-serif" }}>Street Address *</label>
                <textarea
                  className={`${inputClass} resize-none`}
                  style={{ borderRadius: "4px", minHeight: "80px" }}
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Complete street address"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} style={{ fontFamily: "'Montserrat', sans-serif" }}>City *</label>
                  <input className={inputClass} style={{ borderRadius: "4px" }} name="city" value={formData.city} onChange={handleInputChange} placeholder="City" />
                </div>
                <div>
                  <label className={labelClass} style={{ fontFamily: "'Montserrat', sans-serif" }}>Postal Code</label>
                  <input className={inputClass} style={{ borderRadius: "4px" }} name="postalCode" value={formData.postalCode} onChange={handleInputChange} placeholder="Optional" />
                </div>
              </div>
              <div>
                <label className={labelClass} style={{ fontFamily: "'Montserrat', sans-serif" }}>Delivery Notes</label>
                <textarea
                  className={`${inputClass} resize-none`}
                  style={{ borderRadius: "4px", minHeight: "72px" }}
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Special instructions (optional)"
                  rows={3}
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className={sectionCard} style={{ borderRadius: "8px" }}>
              <div className="flex items-center gap-3 pb-2 border-b border-[#262626]">
                <CreditCard className="h-4 w-4 text-[#d4af37]" />
                <h2 className="text-sm font-semibold tracking-widest uppercase text-[#fafafa]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Payment Method</h2>
              </div>
              <div
                className="flex items-center gap-4 p-4 border border-[#d4af37]/40 bg-[#d4af37]/5"
                style={{ borderRadius: "4px" }}
              >
                <div className="w-4 h-4 rounded-full border-2 border-[#d4af37] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-[#d4af37]" />
                  <span className="text-sm font-semibold text-[#fafafa]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Cash on Delivery</span>
                </div>
              </div>
              <p className="text-xs text-[#555]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Pay when your order is delivered to your doorstep.</p>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-[#111111] border border-[#262626] p-6 sticky top-24" style={{ borderRadius: "8px" }}>
              <h2 className="text-lg font-bold text-[#fafafa] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center gap-3">
                    <div className="h-14 w-14 border border-[#262626] overflow-hidden flex-shrink-0" style={{ borderRadius: "4px" }}>
                      <img src={item.images?.[0] || `https://via.placeholder.com/200?text=${encodeURIComponent(item.name)}`} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-[#fafafa] truncate" style={{ fontFamily: "'Playfair Display', serif" }}>{item.name}</h4>
                      <p className="text-xs text-[#a1a1a1]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Qty: {item.quantity} × {formatPrice(item.price)}</p>
                    </div>
                    <span className="text-sm font-semibold text-[#d4af37] flex-shrink-0" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-[#262626] mb-4" />

              <div className="space-y-2 text-sm mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                <div className="flex justify-between text-[#a1a1a1]"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between text-[#a1a1a1]">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-[#d4af37]">Free</span> : formatPrice(shipping)}</span>
                </div>
                <div className="h-px bg-[#262626] my-2" />
                <div className="flex justify-between font-bold text-base">
                  <span className="text-[#fafafa]">Total</span>
                  <span className="text-[#d4af37]">{formatPrice(total)}</span>
                </div>
              </div>

              <button className={goldBtn} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} onClick={handlePlaceOrder} disabled={isProcessing}>
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-[#0a0a0a] border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : "Place Order"}
              </button>

              <p className="text-[10px] text-center text-[#555] mt-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                By placing this order, you agree to our terms and conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
