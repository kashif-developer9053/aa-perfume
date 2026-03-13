"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Package, Clock, CheckCircle, Truck, AlertCircle, Eye, Calendar, MapPin, Phone, Mail, ShoppingBag, Star } from "lucide-react"
import Footer from "@/components/footer"
import { toast } from "@/hooks/use-toast"

const goldBtn = "inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold tracking-widest uppercase bg-[#d4af37] text-[#0a0a0a] hover:bg-[#c9a227] transition-all duration-300 hover:scale-[1.02]"
const outlineBtn = "inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-widest uppercase border border-[#d4af37] text-[#d4af37] bg-transparent hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-all duration-300"
const dangerBtn = "inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-widest uppercase border border-red-800 text-red-400 bg-transparent hover:bg-red-900/20 transition-all duration-300"

export default function MyOrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [reviewForm, setReviewForm] = useState({ orderId: null, productId: null, rating: 0, comment: "" })
  const [showReviewForm, setShowReviewForm] = useState(false)

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user")
      if (!userData) {
        toast({ title: "Authentication required", description: "Please login to view your orders", variant: "destructive" })
        router.push("/login")
        return
      }
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      fetchUserOrders(parsedUser)
    } catch (error) {
      console.error("Error loading user data:", error)
      router.push("/login")
    }
  }, [router])

  const fetchUserOrders = async (userData) => {
    try {
      const response = await fetch("/api/my-orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "user-email": userData.email || "",
          "user-id": userData._id || "",
        },
        credentials: "include",
      })
      const data = await response.json()
      if (data.success) {
        setOrders(data.data || [])
        if (data.count === 0) {
          toast({ title: "No orders found", description: "You haven't placed any orders yet." })
        }
      } else {
        toast({ title: "Error loading orders", description: data.message || "Failed to load orders", variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Network Error", description: "Failed to connect to server. Please check your connection.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const submitReview = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...reviewForm, userId: user._id }),
      })
      const data = await response.json()
      if (data.success) {
        toast({ title: "Review submitted", description: "Thank you for your feedback!" })
        setShowReviewForm(false)
        setReviewForm({ orderId: null, productId: null, rating: 0, comment: "" })
      } else {
        toast({ title: "Error submitting review", description: data.message || "Failed to submit review", variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to submit review. Please try again.", variant: "destructive" })
    }
  }

  const formatPrice = (price) => {
    if (typeof price === "object" && price.$numberDouble) return `Rs. ${parseFloat(price.$numberDouble).toFixed(0)}`
    return `Rs. ${(price || 0).toFixed(0)}`
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    if (typeof dateString === "object" && dateString.$date) {
      dateString = dateString.$date.$numberLong || dateString.$date
    }
    return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
  }

  const getStatusStyle = (status) => {
    const map = {
      pending:    { bg: "bg-yellow-900/20 border-yellow-700/40 text-yellow-400" },
      confirmed:  { bg: "bg-blue-900/20 border-blue-700/40 text-blue-400" },
      processing: { bg: "bg-purple-900/20 border-purple-700/40 text-purple-400" },
      shipped:    { bg: "bg-indigo-900/20 border-indigo-700/40 text-indigo-400" },
      delivered:  { bg: "bg-[#d4af37]/10 border-[#d4af37]/30 text-[#d4af37]" },
      cancelled:  { bg: "bg-red-900/20 border-red-700/40 text-red-400" },
      refunded:   { bg: "bg-[#262626] border-[#333] text-[#a1a1a1]" },
    }
    return map[status?.toLowerCase()]?.bg || "bg-[#262626] border-[#333] text-[#a1a1a1]"
  }

  const getStatusIcon = (status) => {
    const icons = {
      pending:    <Clock className="h-3 w-3" />,
      confirmed:  <CheckCircle className="h-3 w-3" />,
      processing: <Package className="h-3 w-3" />,
      shipped:    <Truck className="h-3 w-3" />,
      delivered:  <CheckCircle className="h-3 w-3" />,
      cancelled:  <AlertCircle className="h-3 w-3" />,
      refunded:   <AlertCircle className="h-3 w-3" />,
    }
    return icons[status?.toLowerCase()] || <Package className="h-3 w-3" />
  }

  const getPaymentStyle = (status) => {
    const map = {
      pending:  "bg-yellow-900/20 border-yellow-700/40 text-yellow-400",
      paid:     "bg-[#d4af37]/10 border-[#d4af37]/30 text-[#d4af37]",
      failed:   "bg-red-900/20 border-red-700/40 text-red-400",
      refunded: "bg-[#262626] border-[#333] text-[#a1a1a1]",
    }
    return map[status?.toLowerCase()] || "bg-yellow-900/20 border-yellow-700/40 text-yellow-400"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <section className="py-16 bg-[#0d0d0d] border-b border-[#262626]">
          <div className="container text-center">
            <span className="text-xs tracking-[0.3em] text-[#d4af37] uppercase mb-3 block" style={{ fontFamily: "'Montserrat', sans-serif" }}>Your Account</span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>
              My <span className="text-[#d4af37] italic">Orders</span>
            </h1>
            <div className="mt-4 h-px w-16 bg-[#d4af37] mx-auto" />
          </div>
        </section>
        <div className="flex justify-center items-center py-32">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
            <span className="text-[#a1a1a1] text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>Loading your orders...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Page Header */}
      <section className="py-16 bg-[#0d0d0d] border-b border-[#262626]">
        <div className="container text-center">
          <span className="text-xs tracking-[0.3em] text-[#d4af37] uppercase mb-3 block" style={{ fontFamily: "'Montserrat', sans-serif" }}>Your Account</span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>
            My <span className="text-[#d4af37] italic">Orders</span>
          </h1>
          <div className="mt-4 h-px w-16 bg-[#d4af37] mx-auto" />
        </div>
      </section>

      <main className="py-12">
        <div className="container max-w-4xl mx-auto space-y-6">

          {/* Header actions */}
          <div className="flex items-center justify-between">
            <p className="text-[#a1a1a1] text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {orders.length > 0 ? `${orders.length} order${orders.length !== 1 ? "s" : ""} found` : "Track and manage your orders"}
            </p>
            <Link href="/products">
              <button className={outlineBtn} style={{ borderRadius: "4px" }}>Continue Shopping</button>
            </Link>
          </div>

          {/* User Info Card */}
          {user && (
            <div className="bg-[#111111] border border-[#262626] p-4 flex items-center gap-4" style={{ borderRadius: "8px" }}>
              <div className="h-12 w-12 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center flex-shrink-0">
                <span className="text-[#d4af37] font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {user.name?.charAt(0)?.toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-semibold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>{user.name}</p>
                <p className="text-sm text-[#a1a1a1]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{user.email}</p>
              </div>
            </div>
          )}

          {/* Review Form */}
          {showReviewForm && (
            <div className="bg-[#111111] border border-[#262626] p-6" style={{ borderRadius: "8px" }}>
              <h3 className="text-lg font-bold text-[#fafafa] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Submit Review</h3>
              <p className="text-sm text-[#a1a1a1] mb-5" style={{ fontFamily: "'Montserrat', sans-serif" }}>Share your feedback about the product</p>
              <form onSubmit={submitReview} className="space-y-4">
                <div>
                  <label className="text-xs tracking-widest uppercase text-[#a1a1a1] block mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-6 w-6 cursor-pointer transition-colors ${star <= reviewForm.rating ? "text-[#d4af37] fill-[#d4af37]" : "text-[#444]"}`}
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-[#a1a1a1] block mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Comment</label>
                  <textarea
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    placeholder="Share your experience..."
                    rows={4}
                    className="w-full bg-[#0d0d0d] border border-[#262626] text-[#fafafa] px-4 py-3 text-sm outline-none focus:border-[#d4af37] transition-colors resize-none"
                    style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}
                  />
                </div>
                <div className="flex gap-3">
                  <button type="submit" disabled={reviewForm.rating === 0} className={goldBtn} style={{ borderRadius: "4px", opacity: reviewForm.rating === 0 ? 0.5 : 1 }}>Submit Review</button>
                  <button type="button" onClick={() => setShowReviewForm(false)} className={outlineBtn} style={{ borderRadius: "4px" }}>Cancel</button>
                </div>
              </form>
            </div>
          )}

          {/* Empty State */}
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 border border-dashed border-[#262626] text-center" style={{ borderRadius: "8px" }}>
              <div className="w-20 h-20 rounded-full bg-[#111111] border border-[#262626] flex items-center justify-center mb-6">
                <ShoppingBag className="h-10 w-10 text-[#d4af37]/40" />
              </div>
              <h2 className="text-2xl font-bold text-[#fafafa] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>No orders yet</h2>
              <p className="text-[#a1a1a1] text-sm mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>When you place orders, they'll appear here.</p>
              <Link href="/products">
                <button className={goldBtn} style={{ borderRadius: "4px" }}>Start Shopping</button>
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {orders.map((order) => (
                <div key={order._id} className="bg-[#111111] border border-[#262626] overflow-hidden transition-all duration-300 hover:border-[#d4af37]/20" style={{ borderRadius: "8px" }}>
                  {/* Order Header */}
                  <div className="bg-[#0d0d0d] border-b border-[#262626] px-6 py-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Order #{order.orderNumber || order._id?.slice(-6)?.toUpperCase()}
                          </h3>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold tracking-widest uppercase border ${getStatusStyle(order.orderStatus)}`} style={{ borderRadius: "3px", fontFamily: "'Montserrat', sans-serif" }}>
                            {getStatusIcon(order.orderStatus)}
                            {order.orderStatus}
                          </span>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold tracking-widest uppercase border ${getPaymentStyle(order.paymentStatus)}`} style={{ borderRadius: "3px", fontFamily: "'Montserrat', sans-serif" }}>
                            Payment: {order.paymentStatus || "Pending"}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-[#a1a1a1]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(order.orderDate || order.createdAt)}</span>
                          </div>
                          {order.trackingNumber && (
                            <div className="flex items-center gap-1">
                              <Truck className="h-3 w-3" />
                              <span className="font-mono">{order.trackingNumber}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#d4af37]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          {formatPrice(order.pricing?.total || order.total)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Order Items */}
                    <div>
                      <h4 className="text-xs tracking-widest uppercase text-[#a1a1a1] mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        Items ({order.items?.length || 0})
                      </h4>
                      <div className="space-y-2">
                        {order.items?.map((item, index) => (
                          <div key={index} className="flex items-center gap-4 p-3 bg-[#0d0d0d] border border-[#262626]" style={{ borderRadius: "6px" }}>
                            <div className="h-14 w-14 overflow-hidden border border-[#262626] flex-shrink-0" style={{ borderRadius: "4px" }}>
                              <img
                                src={item.image || `https://via.placeholder.com/100?text=${encodeURIComponent(item.name)}`}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="font-semibold text-sm text-[#fafafa] truncate" style={{ fontFamily: "'Playfair Display', serif" }}>{item.name}</h5>
                              <p className="text-xs text-[#a1a1a1] mt-0.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                                Qty: {item.quantity} × {formatPrice(item.price)}
                              </p>
                              {order.orderStatus === "delivered" && (
                                <button
                                  className="text-xs text-[#d4af37] hover:underline mt-1 transition-colors"
                                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                                  onClick={() => {
                                    setReviewForm({ orderId: order._id, productId: item.productId, rating: 0, comment: "" })
                                    setShowReviewForm(true)
                                    window.scrollTo({ top: 0, behavior: "smooth" })
                                  }}
                                >
                                  Write a Review
                                </button>
                              )}
                            </div>
                            <span className="font-semibold text-[#d4af37] text-sm flex-shrink-0" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="h-px bg-[#262626]" />

                    {/* Details grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-xs tracking-widest uppercase text-[#a1a1a1] mb-3 flex items-center gap-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          <MapPin className="h-3 w-3" /> Shipping Address
                        </h4>
                        <div className="text-sm text-[#a1a1a1] space-y-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          <p className="text-[#fafafa] font-medium">{order.customer?.firstName} {order.customer?.lastName}</p>
                          <p>{order.address?.street}</p>
                          <p>{order.address?.city}{order.address?.postalCode ? `, ${order.address.postalCode}` : ""}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs tracking-widest uppercase text-[#a1a1a1] mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>Contact Information</h4>
                        <div className="text-sm text-[#a1a1a1] space-y-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3 text-[#d4af37]/60" />
                            <span>{order.customer?.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3 text-[#d4af37]/60" />
                            <span>{order.customer?.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pricing Summary */}
                    <div className="bg-[#0d0d0d] border border-[#262626] p-4 space-y-2" style={{ borderRadius: "6px" }}>
                      <div className="flex justify-between text-sm text-[#a1a1a1]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        <span>Subtotal</span><span>{formatPrice(order.pricing?.subtotal || order.subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-[#a1a1a1]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        <span>Shipping</span>
                        <span>{(order.pricing?.shipping || order.shipping) === 0 ? <span className="text-[#d4af37]">Free</span> : formatPrice(order.pricing?.shipping || order.shipping)}</span>
                      </div>
                      {(order.pricing?.tax || order.tax) > 0 && (
                        <div className="flex justify-between text-sm text-[#a1a1a1]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          <span>Tax</span><span>{formatPrice(order.pricing?.tax || order.tax)}</span>
                        </div>
                      )}
                      <div className="h-px bg-[#262626]" />
                      <div className="flex justify-between font-semibold text-base" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        <span className="text-[#fafafa]">Total</span>
                        <span className="text-[#d4af37]">{formatPrice(order.pricing?.total || order.total)}</span>
                      </div>
                    </div>

                    {/* Notes */}
                    {order.notes && (
                      <div className="bg-[#d4af37]/5 border border-[#d4af37]/20 p-4" style={{ borderRadius: "6px" }}>
                        <h4 className="text-xs tracking-widest uppercase text-[#d4af37]/70 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Delivery Notes</h4>
                        <p className="text-sm text-[#a1a1a1]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{order.notes}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <Link href={`/track-order?tracking=${order.trackingNumber || order._id}`}>
                        <button className={outlineBtn} style={{ borderRadius: "4px" }}>
                          <Eye className="h-3 w-3" /> Track Order
                        </button>
                      </Link>
                      {order.orderStatus === "delivered" && (
                        <button className={outlineBtn} style={{ borderRadius: "4px" }}>
                          <Package className="h-3 w-3" /> Reorder Items
                        </button>
                      )}
                      {["pending", "confirmed"].includes(order.orderStatus?.toLowerCase()) && (
                        <button className={dangerBtn} style={{ borderRadius: "4px" }}>Cancel Order</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Help Notice */}
          <div className="bg-[#111111] border border-[#262626] p-4 flex items-start gap-3" style={{ borderRadius: "8px" }}>
            <AlertCircle className="h-4 w-4 text-[#d4af37]/60 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#a1a1a1]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Need help with your order? Contact our customer support team or visit our help center.
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
