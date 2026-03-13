"use client"

import { useState } from "react"
import { Save, Upload, AlertTriangle, Check } from "lucide-react"
import { toast } from "@/hooks/use-toast"

const inputCls = "w-full bg-[#0d0d0d] border border-[#262626] text-[#fafafa] px-3 py-2.5 text-sm outline-none focus:border-[#d4af37] transition-colors placeholder-[#666]"
const labelCls = "text-xs tracking-widest uppercase text-[#c0c0c0] block mb-1.5"
const goldBtn = "inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold tracking-widest uppercase bg-[#d4af37] text-[#0a0a0a] hover:bg-[#c9a227] transition-all disabled:opacity-60"
const outlineBtn = "inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold tracking-widest uppercase border border-[#262626] text-[#c0c0c0] hover:border-[#d4af37] hover:text-[#d4af37] transition-all"

const TABS = ["general", "appearance", "shipping", "payment", "notifications", "taxes"]

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-5 rounded-full transition-all duration-200 focus:outline-none flex-shrink-0 ${checked ? "bg-[#d4af37]" : "bg-[#262626]"}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-[#0a0a0a] rounded-full transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  )
}

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  const [settings, setSettings] = useState({
    general: {
      storeName: "Chocolate Factory Perfumes",
      storeEmail: "info@chocolatefactory.com",
      storePhone: "+92 300 1234567",
      storeAddress: "Lahore, Pakistan",
      storeCurrency: "PKR",
      storeLanguage: "en",
      storeDescription: "Premium luxury fragrances for every occasion.",
      enableMaintenanceMode: false,
    },
    appearance: {
      primaryColor: "#d4af37",
      secondaryColor: "#0a0a0a",
      accentColor: "#c9a227",
      logoUrl: "/images/logo.png",
      faviconUrl: "/favicon.ico",
      enableDarkMode: true,
      showFeaturedProducts: true,
      productsPerPage: 12,
    },
    shipping: {
      enableFreeShipping: true,
      freeShippingThreshold: 5000,
      flatRateShipping: 250,
      enableLocalPickup: false,
      enableInternationalShipping: false,
      internationalShippingRate: 2000,
      shippingOriginZip: "54000",
    },
    payment: {
      enableCreditCards: false,
      enablePayPal: false,
      enableApplePay: false,
      enableGooglePay: false,
      enableCashOnDelivery: true,
      testMode: true,
    },
    notifications: {
      orderConfirmation: true,
      orderShipped: true,
      orderDelivered: true,
      lowStockAlert: true,
      lowStockThreshold: 10,
      newsletterSignup: true,
      marketingEmails: false,
    },
    taxes: {
      enableAutomaticTax: false,
      taxRate: 0,
      includeTaxInPrice: false,
      enableTaxExemption: false,
    },
  })

  const set = (section, field, value) => setSettings(s => ({ ...s, [section]: { ...s[section], [field]: value } }))

  const handleSave = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({ title: "Settings saved", description: "Your store settings have been updated." })
    }, 1200)
  }

  const SaveBar = () => (
    <div className="flex justify-between pt-4 border-t border-[#262626] mt-4">
      <button type="button" className={outlineBtn} style={{ borderRadius: "4px" }}>Reset</button>
      <button onClick={handleSave} disabled={isLoading} className={goldBtn} style={{ borderRadius: "4px" }}>
        {isLoading ? (
          <><span className="w-3 h-3 border-2 border-[#0a0a0a] border-t-transparent rounded-full animate-spin" /> Saving...</>
        ) : <><Save className="h-3.5 w-3.5" /> Save Changes</>}
      </button>
    </div>
  )

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Store <span className="text-[#d4af37] italic">Settings</span>
        </h1>
        <p className="text-xs text-[#c0c0c0] mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>Manage your store settings and preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-[#262626] pb-0">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-all capitalize border-b-2 -mb-px ${
              activeTab === tab
                ? "border-[#d4af37] text-[#d4af37]"
                : "border-transparent text-[#888] hover:text-[#c0c0c0]"
            }`}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Panels */}
      <div className="bg-[#111111] border border-[#262626] p-6" style={{ borderRadius: "8px" }}>
        {/* General */}
        {activeTab === "general" && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-[#fafafa] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>General Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Store Name</label><input value={settings.general.storeName} onChange={(e) => set("general", "storeName", e.target.value)} className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} /></div>
              <div><label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Store Email</label><input type="email" value={settings.general.storeEmail} onChange={(e) => set("general", "storeEmail", e.target.value)} className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} /></div>
              <div><label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Store Phone</label><input value={settings.general.storePhone} onChange={(e) => set("general", "storePhone", e.target.value)} className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} /></div>
              <div>
                <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Currency</label>
                <select value={settings.general.storeCurrency} onChange={(e) => set("general", "storeCurrency", e.target.value)} className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}>
                  <option value="PKR">PKR (Rs.)</option><option value="USD">USD ($)</option><option value="EUR">EUR (€)</option><option value="GBP">GBP (£)</option>
                </select>
              </div>
              <div className="md:col-span-2"><label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Store Address</label><textarea value={settings.general.storeAddress} onChange={(e) => set("general", "storeAddress", e.target.value)} rows={2} className={`${inputCls} resize-none`} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} /></div>
              <div className="md:col-span-2"><label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Store Description</label><textarea value={settings.general.storeDescription} onChange={(e) => set("general", "storeDescription", e.target.value)} rows={3} className={`${inputCls} resize-none`} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} /></div>
              <div className="md:col-span-2 flex items-center gap-3">
                <Toggle checked={settings.general.enableMaintenanceMode} onChange={(v) => set("general", "enableMaintenanceMode", v)} />
                <span className="text-sm text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Enable Maintenance Mode</span>
              </div>
            </div>
            <SaveBar />
          </div>
        )}

        {/* Appearance */}
        {activeTab === "appearance" && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-[#fafafa] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Store Appearance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[["Primary Color", "primaryColor"], ["Secondary Color", "secondaryColor"], ["Accent Color", "accentColor"]].map(([l, k]) => (
                <div key={k}>
                  <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>{l}</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={settings.appearance[k]} onChange={(e) => set("appearance", k, e.target.value)} className="h-10 w-14 border border-[#262626] bg-[#0d0d0d] cursor-pointer" style={{ borderRadius: "4px" }} />
                    <input value={settings.appearance[k]} onChange={(e) => set("appearance", k, e.target.value)} className={`${inputCls} flex-1`} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
                  </div>
                </div>
              ))}
              <div>
                <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Products Per Page</label>
                <input type="number" min={4} max={48} value={settings.appearance.productsPerPage} onChange={(e) => set("appearance", "productsPerPage", parseInt(e.target.value))} className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
              </div>
              <div className="flex items-center gap-3">
                <Toggle checked={settings.appearance.enableDarkMode} onChange={(v) => set("appearance", "enableDarkMode", v)} />
                <span className="text-sm text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Enable Dark Mode Toggle</span>
              </div>
              <div className="flex items-center gap-3">
                <Toggle checked={settings.appearance.showFeaturedProducts} onChange={(v) => set("appearance", "showFeaturedProducts", v)} />
                <span className="text-sm text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Show Featured Products</span>
              </div>
            </div>
            <SaveBar />
          </div>
        )}

        {/* Shipping */}
        {activeTab === "shipping" && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-[#fafafa] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Shipping Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 md:col-span-2">
                <Toggle checked={settings.shipping.enableFreeShipping} onChange={(v) => set("shipping", "enableFreeShipping", v)} />
                <span className="text-sm text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Enable Free Shipping</span>
              </div>
              <div>
                <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Free Shipping Threshold (Rs.)</label>
                <input type="number" min={0} value={settings.shipping.freeShippingThreshold} onChange={(e) => set("shipping", "freeShippingThreshold", parseFloat(e.target.value))} disabled={!settings.shipping.enableFreeShipping} className={`${inputCls} disabled:opacity-50`} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
              </div>
              <div>
                <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Flat Rate Shipping (Rs.)</label>
                <input type="number" min={0} value={settings.shipping.flatRateShipping} onChange={(e) => set("shipping", "flatRateShipping", parseFloat(e.target.value))} className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
              </div>
              <div className="flex items-center gap-3">
                <Toggle checked={settings.shipping.enableLocalPickup} onChange={(v) => set("shipping", "enableLocalPickup", v)} />
                <span className="text-sm text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Enable Local Pickup</span>
              </div>
              <div className="flex items-center gap-3">
                <Toggle checked={settings.shipping.enableInternationalShipping} onChange={(v) => set("shipping", "enableInternationalShipping", v)} />
                <span className="text-sm text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>International Shipping</span>
              </div>
            </div>
            <SaveBar />
          </div>
        )}

        {/* Payment */}
        {activeTab === "payment" && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-[#fafafa] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Payment Methods</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ["Accept Credit Cards", "enableCreditCards"],
                ["Accept PayPal", "enablePayPal"],
                ["Accept Apple Pay", "enableApplePay"],
                ["Accept Google Pay", "enableGooglePay"],
                ["Cash on Delivery", "enableCashOnDelivery"],
                ["Test Mode", "testMode"],
              ].map(([label, key]) => (
                <div key={key} className="flex items-center gap-3">
                  <Toggle checked={settings.payment[key]} onChange={(v) => set("payment", key, v)} />
                  <span className="text-sm text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{label}</span>
                </div>
              ))}
            </div>
            <div className="bg-yellow-900/10 border border-yellow-700/30 p-4 flex gap-3" style={{ borderRadius: "6px" }}>
              <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-yellow-400 mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>Payment Gateway Notice</p>
                <p className="text-xs text-yellow-400/70" style={{ fontFamily: "'Montserrat', sans-serif" }}>Payment gateway credentials should be configured in environment settings. Contact your administrator to update API keys.</p>
              </div>
            </div>
            <SaveBar />
          </div>
        )}

        {/* Notifications */}
        {activeTab === "notifications" && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-[#fafafa] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Notification Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ["Order Confirmation Emails", "orderConfirmation"],
                ["Order Shipped Emails", "orderShipped"],
                ["Order Delivered Emails", "orderDelivered"],
                ["Low Stock Alerts", "lowStockAlert"],
                ["Newsletter Welcome Email", "newsletterSignup"],
                ["Marketing Emails", "marketingEmails"],
              ].map(([label, key]) => (
                <div key={key} className="flex items-center gap-3">
                  <Toggle checked={settings.notifications[key]} onChange={(v) => set("notifications", key, v)} />
                  <span className="text-sm text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{label}</span>
                </div>
              ))}
              <div>
                <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Low Stock Threshold</label>
                <input type="number" min={1} value={settings.notifications.lowStockThreshold} onChange={(e) => set("notifications", "lowStockThreshold", parseInt(e.target.value))} disabled={!settings.notifications.lowStockAlert} className={`${inputCls} disabled:opacity-50`} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
              </div>
            </div>
            <SaveBar />
          </div>
        )}

        {/* Taxes */}
        {activeTab === "taxes" && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-[#fafafa] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Tax Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 md:col-span-2">
                <Toggle checked={settings.taxes.enableAutomaticTax} onChange={(v) => set("taxes", "enableAutomaticTax", v)} />
                <span className="text-sm text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Enable Automatic Tax Calculation</span>
              </div>
              <div>
                <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Default Tax Rate (%)</label>
                <input type="number" min={0} max={100} step={0.01} value={settings.taxes.taxRate} onChange={(e) => set("taxes", "taxRate", parseFloat(e.target.value))} disabled={settings.taxes.enableAutomaticTax} className={`${inputCls} disabled:opacity-50`} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
              </div>
              <div className="flex items-center gap-3">
                <Toggle checked={settings.taxes.includeTaxInPrice} onChange={(v) => set("taxes", "includeTaxInPrice", v)} />
                <span className="text-sm text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Include Tax in Product Prices</span>
              </div>
              <div className="flex items-center gap-3">
                <Toggle checked={settings.taxes.enableTaxExemption} onChange={(v) => set("taxes", "enableTaxExemption", v)} />
                <span className="text-sm text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Enable Tax Exemption</span>
              </div>
            </div>
            <div className="bg-[#d4af37]/5 border border-[#d4af37]/20 p-4 flex gap-3" style={{ borderRadius: "6px" }}>
              <Check className="h-4 w-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-[#d4af37] mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>Tax Compliance</p>
                <p className="text-xs text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Always consult with a tax professional to ensure full compliance with tax regulations in your jurisdiction.</p>
              </div>
            </div>
            <SaveBar />
          </div>
        )}
      </div>
    </div>
  )
}
