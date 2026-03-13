// app/admin/orders/page.jsx
"use client";

import { useState, useEffect } from "react";
import { Eye, Search, Download, Package, Truck, CheckCircle, XCircle, X } from "lucide-react";
import axios from "axios";

const inputCls = "bg-[#0d0d0d] border border-[#262626] text-[#fafafa] px-3 py-2 text-sm outline-none focus:border-[#d4af37] transition-colors placeholder-[#666]";
const goldBtn = "inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-widest uppercase bg-[#d4af37] text-[#0a0a0a] hover:bg-[#c9a227] transition-all duration-200";
const outlineBtn = "inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-widest uppercase border border-[#262626] text-[#c0c0c0] hover:border-[#d4af37] hover:text-[#d4af37] transition-all duration-200";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [message, setMessage] = useState("");

  const stats = orders.reduce(
    (acc, o) => { acc.total++; acc[o.orderStatus] = (acc[o.orderStatus] || 0) + 1; return acc },
    { total: 0, confirmed: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0 }
  );

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/orders?limit=100");
      if (res.data.success) {
        setOrders(res.data.data.orders || []);
        setMessage("");
      } else {
        setMessage("Failed to load orders");
      }
    } catch (e) {
      setMessage("Error fetching orders: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await axios.patch(`/api/admin/orders/${orderId}`, { orderStatus: newStatus });
      if (res.data.success) {
        setOrders(orders.map(o => o._id === orderId ? { ...o, orderStatus: newStatus } : o));
        if (selectedOrder?._id === orderId) setSelectedOrder({ ...selectedOrder, orderStatus: newStatus });
        setMessage(`Status updated to ${newStatus}`);
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (e) {
      setMessage("Error updating status: " + e.message);
    }
  };

  const statusStyle = (s) => {
    const m = { confirmed: "bg-yellow-900/20 border-yellow-700/40 text-yellow-400", processing: "bg-blue-900/20 border-blue-700/40 text-blue-400", shipped: "bg-indigo-900/20 border-indigo-700/40 text-indigo-400", delivered: "bg-[#d4af37]/10 border-[#d4af37]/30 text-[#d4af37]", cancelled: "bg-red-900/20 border-red-700/40 text-red-400" };
    return m[s] || "bg-[#262626] border-[#333] text-[#c0c0c0]";
  };

  const fmt = (p) => `Rs. ${p?.toFixed(0) || 0}`;
  const fmtDate = (d) => { try { return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }); } catch { return "N/A"; } };

  const exportOrders = () => {
    const csv = "data:text/csv;charset=utf-8,Order ID,Customer,Email,Phone,Total,Status,Date,Tracking\n"
      + filteredOrders.map(o => `${o._id.slice(-6)},${o.customer.firstName} ${o.customer.lastName},${o.customer.email},${o.customer.phone},${o.pricing.total},${o.orderStatus},${fmtDate(o.orderDate)},${o.trackingNumber || "N/A"}`).join("\n");
    const a = document.createElement("a");
    a.href = encodeURI(csv);
    a.download = "orders.csv";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  const filteredOrders = orders.filter(o => {
    if (!o) return false;
    const q = searchTerm.toLowerCase();
    const matchSearch = (o.customer?.firstName?.toLowerCase() || "").includes(q) || (o.customer?.lastName?.toLowerCase() || "").includes(q) || (o.customer?.email?.toLowerCase() || "").includes(q) || (o._id?.toLowerCase() || "").includes(q) || (o.trackingNumber?.toLowerCase() || "").includes(q);
    return matchSearch && (statusFilter === "all" || o.orderStatus === statusFilter);
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
          <span className="text-[#c0c0c0] text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>Loading orders...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Order <span className="text-[#d4af37] italic">Management</span>
        </h1>
        <p className="text-xs text-[#c0c0c0] mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>Manage and track all customer orders</p>
      </div>

      {message && (
        <div className={`px-4 py-2.5 text-sm border ${message.includes("Error") || message.includes("Failed") ? "bg-red-900/20 border-red-700/40 text-red-400" : "bg-[#d4af37]/10 border-[#d4af37]/30 text-[#d4af37]"}`} style={{ borderRadius: "6px", fontFamily: "'Montserrat', sans-serif" }}>
          {message}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {[
          { label: "Total", val: stats.total, cls: "text-[#fafafa]" },
          { label: "Confirmed", val: stats.confirmed || 0, cls: "text-yellow-400" },
          { label: "Processing", val: stats.processing || 0, cls: "text-blue-400" },
          { label: "Shipped", val: stats.shipped || 0, cls: "text-indigo-400" },
          { label: "Delivered", val: stats.delivered || 0, cls: "text-[#d4af37]" },
          { label: "Cancelled", val: stats.cancelled || 0, cls: "text-red-400" },
        ].map((s) => (
          <div key={s.label} className="bg-[#111111] border border-[#262626] p-4 text-center" style={{ borderRadius: "8px" }}>
            <div className={`text-2xl font-bold ${s.cls}`} style={{ fontFamily: "'Montserrat', sans-serif" }}>{s.val}</div>
            <div className="text-[10px] text-[#888] tracking-widest uppercase mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-[#111111] border border-[#262626] p-4 flex flex-col md:flex-row gap-3" style={{ borderRadius: "8px" }}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888]" />
          <input
            type="text"
            placeholder="Search by name, email, order ID, tracking..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`${inputCls} pl-9 w-full`}
            style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={`${inputCls} min-w-[140px]`}
          style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}
        >
          <option value="all">All Status</option>
          <option value="confirmed">Confirmed</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button onClick={exportOrders} className={outlineBtn} style={{ borderRadius: "4px" }}>
          <Download className="h-3.5 w-3.5" /> Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#111111] border border-[#262626] overflow-hidden" style={{ borderRadius: "8px" }}>
        <div className="px-5 py-3.5 border-b border-[#262626] flex items-center justify-between">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-[#fafafa]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Orders ({filteredOrders.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#0d0d0d] border-b border-[#262626]">
              <tr>
                {["Order ID", "Tracking", "Customer", "Items", "Total", "Status", "Date", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-medium tracking-widest uppercase text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1a1a]">
              {filteredOrders.map((o) => (
                <tr key={o._id} className="hover:bg-[#1a1a1a] transition-colors">
                  <td className="px-4 py-3.5">
                    <code className="text-xs bg-[#1a1a1a] text-[#d4af37] px-2 py-0.5 font-mono" style={{ borderRadius: "3px" }}>
                      #{o._id.slice(-6).toUpperCase()}
                    </code>
                  </td>
                  <td className="px-4 py-3.5">
                    {o.trackingNumber ? (
                      <code className="text-xs text-[#c0c0c0] font-mono bg-[#1a1a1a] px-2 py-0.5" style={{ borderRadius: "3px" }}>{o.trackingNumber}</code>
                    ) : (
                      <span className="text-xs text-[#777]" style={{ fontFamily: "'Montserrat', sans-serif" }}>—</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="text-sm font-medium text-[#fafafa]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{o.customer.firstName} {o.customer.lastName}</div>
                    <div className="text-xs text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{o.customer.email}</div>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {o.items.reduce((t, i) => t + i.quantity, 0)}
                  </td>
                  <td className="px-4 py-3.5 text-sm font-semibold text-[#d4af37]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {fmt(o.pricing.total)}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase border capitalize ${statusStyle(o.orderStatus)}`} style={{ borderRadius: "3px", fontFamily: "'Montserrat', sans-serif" }}>
                      {o.orderStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{fmtDate(o.orderDate)}</td>
                  <td className="px-4 py-3.5">
                    <button onClick={() => setSelectedOrder(o)} className={outlineBtn} style={{ borderRadius: "4px" }}>
                      <Eye className="h-3.5 w-3.5" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-10 w-10 text-[#777] mx-auto mb-3" />
            <p className="text-sm text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {searchTerm || statusFilter !== "all" ? "No orders match your filters" : "No orders yet"}
            </p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-start z-50 p-4 overflow-y-auto">
          <div className="bg-[#111111] border border-[#262626] w-full max-w-3xl my-8" style={{ borderRadius: "8px" }}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#262626] bg-[#0d0d0d]">
              <div>
                <h2 className="font-bold text-[#fafafa] text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Order #{selectedOrder._id.slice(-6).toUpperCase()}
                </h2>
                {selectedOrder.trackingNumber && (
                  <p className="text-xs font-mono text-[#d4af37]/70 mt-0.5">{selectedOrder.trackingNumber}</p>
                )}
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-[#888] hover:text-[#fafafa] transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Status Controls */}
              <div className="bg-[#d4af37]/5 border border-[#d4af37]/20 p-4" style={{ borderRadius: "6px" }}>
                <p className="text-xs font-semibold tracking-widest uppercase text-[#d4af37] mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>Update Order Status</p>
                <div className="flex flex-wrap gap-2">
                  {["confirmed", "processing", "shipped", "delivered", "cancelled"].map((s) => (
                    <button
                      key={s}
                      onClick={() => updateOrderStatus(selectedOrder._id, s)}
                      disabled={selectedOrder.orderStatus === s}
                      className={`px-3 py-1.5 text-xs font-semibold tracking-wide uppercase capitalize transition-all border ${
                        selectedOrder.orderStatus === s
                          ? "bg-[#d4af37] border-[#d4af37] text-[#0a0a0a]"
                          : "bg-transparent border-[#262626] text-[#c0c0c0] hover:border-[#d4af37] hover:text-[#d4af37]"
                      }`}
                      style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {selectedOrder.orderStatus === s && "✓ "}{s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer + Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0d0d0d] border border-[#262626] p-4" style={{ borderRadius: "6px" }}>
                  <p className="text-[10px] tracking-widest uppercase text-[#888] mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>Customer</p>
                  <div className="space-y-1 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    <p className="text-[#fafafa] font-medium">{selectedOrder.customer.firstName} {selectedOrder.customer.lastName}</p>
                    <p className="text-[#c0c0c0]">{selectedOrder.customer.email}</p>
                    <p className="text-[#c0c0c0]">{selectedOrder.customer.phone}</p>
                  </div>
                </div>
                <div className="bg-[#0d0d0d] border border-[#262626] p-4" style={{ borderRadius: "6px" }}>
                  <p className="text-[10px] tracking-widest uppercase text-[#888] mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>Delivery Address</p>
                  <div className="space-y-1 text-sm text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    <p>{selectedOrder.address.street}</p>
                    <p>{selectedOrder.address.city}{selectedOrder.address.postalCode && `, ${selectedOrder.address.postalCode}`}</p>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div>
                <p className="text-[10px] tracking-widest uppercase text-[#888] mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>Items</p>
                <div className="border border-[#262626] divide-y divide-[#1a1a1a]" style={{ borderRadius: "6px" }}>
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4">
                      <img src={item.image || `https://via.placeholder.com/60?text=${encodeURIComponent(item.name)}`} alt={item.name} className="h-12 w-12 object-cover flex-shrink-0" style={{ borderRadius: "4px" }} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-[#fafafa] truncate" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.name}</p>
                        <p className="text-xs text-[#888]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{fmt(item.price)} × {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-sm text-[#d4af37] flex-shrink-0" style={{ fontFamily: "'Montserrat', sans-serif" }}>{fmt(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing + Payment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0d0d0d] border border-[#262626] p-4 space-y-2" style={{ borderRadius: "6px" }}>
                  <p className="text-[10px] tracking-widest uppercase text-[#888] mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>Order Summary</p>
                  {[["Subtotal", fmt(selectedOrder.pricing.subtotal)], ["Shipping", selectedOrder.pricing.shipping === 0 ? "Free" : fmt(selectedOrder.pricing.shipping)], ["Tax", fmt(selectedOrder.pricing.tax)]].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-xs text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}><span>{k}</span><span>{v}</span></div>
                  ))}
                  <div className="h-px bg-[#262626]" />
                  <div className="flex justify-between text-sm font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    <span className="text-[#fafafa]">Total</span><span className="text-[#d4af37]">{fmt(selectedOrder.pricing.total)}</span>
                  </div>
                </div>
                <div className="bg-[#0d0d0d] border border-[#262626] p-4" style={{ borderRadius: "6px" }}>
                  <p className="text-[10px] tracking-widest uppercase text-[#888] mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>Payment</p>
                  <div className="space-y-1.5 text-xs" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    <p className="text-[#c0c0c0]">Method: <span className="text-[#fafafa] capitalize">{selectedOrder.paymentMethod}</span></p>
                    <p className="text-[#c0c0c0]">Status: <span className="text-[#fafafa] capitalize">{selectedOrder.paymentStatus}</span></p>
                    <p className="text-[#c0c0c0]">Ordered: <span className="text-[#fafafa]">{fmtDate(selectedOrder.orderDate)}</span></p>
                    {selectedOrder.deliveryDate && <p className="text-[#c0c0c0]">Delivered: <span className="text-[#fafafa]">{fmtDate(selectedOrder.deliveryDate)}</span></p>}
                  </div>
                </div>
              </div>

              {selectedOrder.notes && (
                <div className="bg-[#d4af37]/5 border border-[#d4af37]/20 p-4" style={{ borderRadius: "6px" }}>
                  <p className="text-[10px] tracking-widest uppercase text-[#d4af37]/60 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Customer Notes</p>
                  <p className="text-sm text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{selectedOrder.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
