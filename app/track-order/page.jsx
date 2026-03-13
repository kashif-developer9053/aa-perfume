// app/track-order/page.jsx
"use client";

import { useState } from "react";
import { Search, Package, Clock, Truck, CheckCircle, XCircle, MapPin } from "lucide-react";
import axios from "axios";
import Footer from "@/components/footer";

const goldBtn = "inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold tracking-widest uppercase bg-[#d4af37] text-[#0a0a0a] hover:bg-[#c9a227] transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";
const inputClass = "w-full bg-[#0d0d0d] border border-[#262626] text-[#fafafa] px-4 py-3 text-sm outline-none focus:border-[#d4af37] transition-colors placeholder-[#555]";
const labelClass = "text-xs tracking-widest uppercase text-[#a1a1a1] block mb-2";

export default function TrackOrderPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const trackOrder = async () => {
    if (!searchQuery.trim() && !email.trim()) {
      setError("Please enter either Order ID / Tracking Number or Email Address (or both)");
      return;
    }
    setLoading(true);
    setError("");
    setOrder(null);

    try {
      let response;

      if (!searchQuery.trim() && email.trim()) {
        response = await axios.get(`/api/orders?email=${email}`);
        if (response.data.success && response.data.data.orders.length > 0) {
          response.data.data = response.data.data.orders[0];
        }
      } else if (searchQuery.trim() && !email.trim()) {
        if (searchQuery.length === 24) {
          response = await axios.get(`/api/orders/${searchQuery}`);
        } else if (searchQuery.length === 6) {
          response = await axios.get(`/api/orders?search=${searchQuery}`);
          if (response.data.success && response.data.data.orders.length > 0) {
            response.data.data = response.data.data.orders[0];
          }
        } else {
          response = await axios.get(`/api/orders?trackingNumber=${searchQuery}`);
          if (response.data.success && response.data.data.orders.length > 0) {
            response.data.data = response.data.data.orders[0];
          }
        }
      } else {
        if (searchQuery.length === 24 || searchQuery.length === 6) {
          try {
            if (searchQuery.length === 24) {
              response = await axios.get(`/api/orders/${searchQuery}`);
            } else {
              response = await axios.get(`/api/orders?search=${searchQuery}&email=${email}`);
              if (response.data.success && response.data.data.orders.length > 0) {
                response.data.data = response.data.data.orders[0];
              }
            }
          } catch {
            response = await axios.get(`/api/orders?trackingNumber=${searchQuery}&email=${email}`);
            if (response.data.success && response.data.data.orders.length > 0) {
              response.data.data = response.data.data.orders[0];
            }
          }
        } else {
          response = await axios.get(`/api/orders?trackingNumber=${searchQuery}&email=${email}`);
          if (response.data.success && response.data.data.orders.length > 0) {
            response.data.data = response.data.data.orders[0];
          }
        }
      }

      if (response.data.success && response.data.data) {
        const orderData = response.data.data;
        if (email.trim() && orderData.customer.email.toLowerCase() !== email.toLowerCase()) {
          setError("Order not found or email doesn't match");
          return;
        }
        setOrder(orderData);
      } else {
        setError("Order not found. Please check your details and try again.");
      }
    } catch {
      setError("Order not found. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusSteps = () => {
    const steps = [
      { key: "confirmed",  label: "Confirmed",  icon: <CheckCircle className="h-4 w-4" /> },
      { key: "processing", label: "Processing", icon: <Package className="h-4 w-4" /> },
      { key: "shipped",    label: "Shipped",    icon: <Truck className="h-4 w-4" /> },
      { key: "delivered",  label: "Delivered",  icon: <CheckCircle className="h-4 w-4" /> },
    ];
    const currentIndex = steps.findIndex((s) => s.key === order?.orderStatus);
    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex && order?.orderStatus !== "cancelled",
      active: index === currentIndex && order?.orderStatus !== "cancelled",
    }));
  };

  const formatPrice = (price) => `Rs. ${(price || 0).toFixed(0)}`;
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });

  const getStatusStyle = (status) => {
    const map = {
      confirmed:  "bg-blue-900/20 border-blue-700/40 text-blue-400",
      processing: "bg-purple-900/20 border-purple-700/40 text-purple-400",
      shipped:    "bg-indigo-900/20 border-indigo-700/40 text-indigo-400",
      delivered:  "bg-[#d4af37]/10 border-[#d4af37]/30 text-[#d4af37]",
      cancelled:  "bg-red-900/20 border-red-700/40 text-red-400",
    };
    return map[status] || "bg-[#262626] border-[#333] text-[#a1a1a1]";
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Page Header */}
      <section className="py-16 bg-[#0d0d0d] border-b border-[#262626]">
        <div className="container text-center">
          <span className="text-xs tracking-[0.3em] text-[#d4af37] uppercase mb-3 block" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Order Status
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Track Your <span className="text-[#d4af37] italic">Order</span>
          </h1>
          <p className="mt-3 text-sm text-[#a1a1a1]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Enter your order details to track your package
          </p>
          <div className="mt-4 h-px w-16 bg-[#d4af37] mx-auto" />
        </div>
      </section>

      <main className="py-12">
        <div className="container max-w-3xl mx-auto space-y-8">

          {/* Search Form */}
          <div className="bg-[#111111] border border-[#262626] p-6" style={{ borderRadius: "8px" }}>
            <div className="flex items-center gap-2 mb-5">
              <Search className="h-4 w-4 text-[#d4af37]" />
              <h2 className="text-sm font-semibold tracking-widest uppercase text-[#fafafa]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Order Tracking
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelClass} style={{ fontFamily: "'Montserrat', sans-serif" }}>Order ID or Tracking Number</label>
                <input
                  style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}
                  className={inputClass}
                  placeholder="e.g. ABC123 or TCF12345"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && trackOrder()}
                />
                <p className="text-[10px] text-[#555] mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>Optional — search with just this field</p>
              </div>
              <div>
                <label className={labelClass} style={{ fontFamily: "'Montserrat', sans-serif" }}>Email Address</label>
                <input
                  type="email"
                  style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}
                  className={inputClass}
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && trackOrder()}
                />
                <p className="text-[10px] text-[#555] mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>Optional — search with just this field</p>
              </div>
            </div>

            {/* Tip */}
            <div className="bg-[#d4af37]/5 border border-[#d4af37]/20 p-3 mb-4" style={{ borderRadius: "6px" }}>
              <p className="text-xs text-[#d4af37]/80 font-semibold mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>Flexible Search</p>
              <ul className="text-[10px] text-[#a1a1a1] space-y-0.5 list-disc list-inside" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                <li>Just your email address (shows your most recent order)</li>
                <li>Just your Order ID or Tracking Number</li>
                <li>Both fields for more specific results</li>
              </ul>
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-700/40 text-red-400 text-sm px-4 py-3 mb-4" style={{ borderRadius: "6px", fontFamily: "'Montserrat', sans-serif" }}>
                {error}
              </div>
            )}

            <button onClick={trackOrder} disabled={loading} className={goldBtn} style={{ borderRadius: "4px" }}>
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-[#0a0a0a] border-t-transparent rounded-full animate-spin" />
                  Tracking...
                </>
              ) : (
                <>
                  <Search className="h-3.5 w-3.5" /> Track Order
                </>
              )}
            </button>
          </div>

          {/* Order Results */}
          {order && (
            <div className="space-y-5">
              {/* Status Card */}
              <div className="bg-[#111111] border border-[#262626] overflow-hidden" style={{ borderRadius: "8px" }}>
                <div className="bg-[#0d0d0d] border-b border-[#262626] px-6 py-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h2 className="font-bold text-[#fafafa] text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Order #{order._id.slice(-6).toUpperCase()}
                      </h2>
                      {order.trackingNumber && (
                        <p className="text-xs font-mono text-[#d4af37]/70 mt-1">{order.trackingNumber}</p>
                      )}
                      <p className="text-xs text-[#a1a1a1] mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        Placed on {formatDate(order.orderDate)}
                      </p>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold tracking-widest uppercase border self-start ${getStatusStyle(order.orderStatus)}`} style={{ borderRadius: "3px", fontFamily: "'Montserrat', sans-serif" }}>
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  {order.orderStatus !== "cancelled" ? (
                    <>
                      {/* Timeline */}
                      <div className="relative flex items-start justify-between mb-6">
                        {getStatusSteps().map((step, index, arr) => (
                          <div key={step.key} className="flex flex-col items-center flex-1 relative">
                            {/* connector line */}
                            {index < arr.length - 1 && (
                              <div className={`absolute top-5 left-1/2 w-full h-px ${step.completed ? "bg-[#d4af37]" : "bg-[#262626]"}`} style={{ zIndex: 0 }} />
                            )}
                            <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                              step.completed
                                ? "bg-[#d4af37] text-[#0a0a0a]"
                                : "bg-[#1a1a1a] border border-[#333] text-[#555]"
                            }`}>
                              {step.icon}
                            </div>
                            <p className={`text-[10px] mt-2 text-center tracking-wide ${step.completed ? "text-[#d4af37] font-semibold" : "text-[#555]"}`} style={{ fontFamily: "'Montserrat', sans-serif" }}>
                              {step.label}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Status banners */}
                      {order.orderStatus === "shipped" && (
                        <div className="bg-indigo-900/20 border border-indigo-700/30 p-4 mb-4" style={{ borderRadius: "6px" }}>
                          <div className="flex items-center gap-2 mb-1">
                            <Truck className="h-4 w-4 text-indigo-400" />
                            <span className="font-semibold text-indigo-400 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>Out for Delivery</span>
                          </div>
                          <p className="text-xs text-indigo-300/80" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                            Your order is on its way and will be delivered within 1-2 business days.
                          </p>
                          {order.trackingNumber && (
                            <p className="text-xs text-indigo-300/80 mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                              Tracking: <span className="font-mono font-semibold">{order.trackingNumber}</span>
                            </p>
                          )}
                        </div>
                      )}
                      {order.orderStatus === "delivered" && order.deliveryDate && (
                        <div className="bg-[#d4af37]/10 border border-[#d4af37]/30 p-4 mb-4" style={{ borderRadius: "6px" }}>
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle className="h-4 w-4 text-[#d4af37]" />
                            <span className="font-semibold text-[#d4af37] text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>Delivered</span>
                          </div>
                          <p className="text-xs text-[#a1a1a1]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                            Delivered on {formatDate(order.deliveryDate)}
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <XCircle className="h-14 w-14 text-red-500/60 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-red-400 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Order Cancelled</h3>
                      <p className="text-sm text-[#a1a1a1]" style={{ fontFamily: "'Montserrat', sans-serif" }}>This order has been cancelled.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-[#111111] border border-[#262626] p-6" style={{ borderRadius: "8px" }}>
                <h3 className="text-xs tracking-widest uppercase text-[#a1a1a1] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Order Items</h3>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-[#0d0d0d] border border-[#262626]" style={{ borderRadius: "6px" }}>
                      <div className="h-16 w-16 overflow-hidden border border-[#262626] flex-shrink-0" style={{ borderRadius: "4px" }}>
                        <img
                          src={item.image || `https://via.placeholder.com/80?text=${encodeURIComponent(item.name)}`}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-[#fafafa] truncate" style={{ fontFamily: "'Playfair Display', serif" }}>{item.name}</h4>
                        <p className="text-xs text-[#a1a1a1] mt-0.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          Qty: {item.quantity} × {formatPrice(item.price)}
                        </p>
                      </div>
                      <span className="font-semibold text-[#d4af37] text-sm flex-shrink-0" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-[#111111] border border-[#262626] p-6" style={{ borderRadius: "8px" }}>
                <h3 className="text-xs tracking-widest uppercase text-[#a1a1a1] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Order Summary</h3>
                <div className="space-y-2 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  <div className="flex justify-between text-[#a1a1a1]">
                    <span>Subtotal</span><span>{formatPrice(order.pricing.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#a1a1a1]">
                    <span>Shipping</span>
                    <span>{order.pricing.shipping === 0 ? <span className="text-[#d4af37]">Free</span> : formatPrice(order.pricing.shipping)}</span>
                  </div>
                  {order.pricing.tax > 0 && (
                    <div className="flex justify-between text-[#a1a1a1]">
                      <span>Tax</span><span>{formatPrice(order.pricing.tax)}</span>
                    </div>
                  )}
                  <div className="h-px bg-[#262626] my-2" />
                  <div className="flex justify-between font-semibold text-base">
                    <span className="text-[#fafafa]">Total</span>
                    <span className="text-[#d4af37]">{formatPrice(order.pricing.total)}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-[#111111] border border-[#262626] p-6" style={{ borderRadius: "8px" }}>
                <h3 className="text-xs tracking-widest uppercase text-[#a1a1a1] mb-4 flex items-center gap-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  <MapPin className="h-3 w-3" /> Delivery Address
                </h3>
                <div className="text-sm space-y-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  <p className="font-semibold text-[#fafafa]">{order.customer.firstName} {order.customer.lastName}</p>
                  <p className="text-[#a1a1a1]">{order.address.street}</p>
                  <p className="text-[#a1a1a1]">{order.address.city} {order.address.postalCode}</p>
                  <p className="text-[#a1a1a1] mt-2">Phone: <span className="text-[#fafafa]">{order.customer.phone}</span></p>
                </div>
              </div>

              {/* Special Instructions */}
              {order.notes && (
                <div className="bg-[#111111] border border-[#262626] p-6" style={{ borderRadius: "8px" }}>
                  <h3 className="text-xs tracking-widest uppercase text-[#a1a1a1] mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>Special Instructions</h3>
                  <p className="text-sm text-[#a1a1a1]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{order.notes}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
