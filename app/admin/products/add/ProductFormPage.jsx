// /app/admin/products/_components/ProductForm.jsx
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Upload, X, Save, ArrowLeft } from "lucide-react"
import axios from "axios"

const inputCls = "w-full bg-[#0d0d0d] border border-[#262626] text-[#fafafa] px-3 py-2.5 text-sm outline-none focus:border-[#d4af37] transition-colors placeholder-[#666]"
const labelCls = "text-xs tracking-widest uppercase text-[#c0c0c0] block mb-1.5"
const goldBtn = "inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-widest uppercase bg-[#d4af37] text-[#0a0a0a] hover:bg-[#c9a227] transition-all disabled:opacity-60"
const outlineBtn = "inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-widest uppercase border border-[#262626] text-[#c0c0c0] hover:border-[#d4af37] hover:text-[#d4af37] transition-all"

export default function ProductForm({ id, isEditing }) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categories, setCategories] = useState([])
  const [images, setImages] = useState([null, null, null, null])
  const [imageFiles, setImageFiles] = useState([null, null, null, null])
  const [message, setMessage] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discountedPrice: "",
    category: "",
    brand: "",
    stock: "",
    featured: false,
  })

  useEffect(() => {
    fetchCategories()
    if (isEditing && id) fetchProduct(id)
  }, [isEditing, id])

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/products/categories')
      if (res.data.success) setCategories(res.data.data)
    } catch {
      setMessage("Failed to load categories")
    }
  }

  const fetchProduct = async (productId) => {
    setIsLoading(true)
    try {
      const res = await axios.get(`/api/products/${productId}`)
      if (res.data.success) {
        const product = res.data.data
        setFormData({
          name: product.name || "",
          description: product.description || "",
          price: product.price || "",
          discountedPrice: product.discountedPrice || "",
          category: product.category?._id || "",
          brand: product.brand || "",
          stock: product.stock || "",
          featured: product.featured || false,
        })
        if (product.images?.length > 0) {
          const imgs = [null, null, null, null]
          product.images.forEach((img, i) => { if (i < 4) imgs[i] = img })
          setImages(imgs)
        }
      }
    } catch {
      setMessage("Failed to load product details")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
  }

  const handleImageChange = (e, index) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        const newImages = [...images]; newImages[index] = ev.target.result; setImages(newImages)
      }
      reader.readAsDataURL(file)
      const newFiles = [...imageFiles]; newFiles[index] = file; setImageFiles(newFiles)
    }
  }

  const removeImage = (index) => {
    const newImages = [...images]; newImages[index] = null; setImages(newImages)
    const newFiles = [...imageFiles]; newFiles[index] = null; setImageFiles(newFiles)
  }

  const convertFileToBase64 = (file) => new Promise((res, rej) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => res(reader.result)
    reader.onerror = rej
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)
    if (!formData.name || !formData.price || !formData.category) {
      setMessage("Please fill in all required fields (name, price, category)")
      return
    }
    setIsSubmitting(true)
    try {
      const productImages = []
      images.forEach(img => { if (img && !img.startsWith('data:')) productImages.push(img) })
      for (const file of imageFiles) {
        if (file) productImages.push(await convertFileToBase64(file))
      }
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        discountedPrice: formData.discountedPrice ? parseFloat(formData.discountedPrice) : undefined,
        stock: parseInt(formData.stock),
        images: productImages,
      }
      let response
      if (isEditing) {
        response = await axios.put(`/api/products/${id}`, productData)
      } else {
        response = await axios.post('/api/products', productData)
      }
      if (response.data.success) {
        router.push("/admin/products")
      } else {
        setMessage(response.data.message || `Failed to ${isEditing ? 'update' : 'add'} product`)
      }
    } catch {
      setMessage(`Failed to ${isEditing ? 'update' : 'add'} product`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full py-24">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-xs text-[#c0c0c0]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Loading product...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>
            {isEditing ? "Edit" : "Add New"} <span className="text-[#d4af37] italic">Product</span>
          </h1>
          <p className="text-xs text-[#c0c0c0] mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {isEditing ? "Update product details and inventory" : "Create a new product in your inventory"}
          </p>
        </div>
        <button onClick={() => router.push("/admin/products")} className={outlineBtn} style={{ borderRadius: "4px" }}>
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Products
        </button>
      </div>

      {message && (
        <div className="px-3 py-2 text-xs bg-red-900/20 border border-red-700/40 text-red-400" style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-5">
          <div className="bg-[#111111] border border-[#262626] p-5 space-y-4" style={{ borderRadius: "8px" }}>
            <h3 className="text-xs tracking-widest uppercase text-[#d4af37] font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>Basic Information</h3>

            <div>
              <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Product Name *</label>
              <input name="name" placeholder="Enter product name" value={formData.name} onChange={handleChange} required className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
            </div>

            <div>
              <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Description</label>
              <textarea name="description" placeholder="Enter product description" value={formData.description} onChange={handleChange} rows={5} className={`${inputCls} resize-none`} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Price (Rs.) *</label>
                <input name="price" type="number" step="0.01" min="0" placeholder="0.00" value={formData.price} onChange={handleChange} required className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
              </div>
              <div>
                <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Discounted Price</label>
                <input name="discountedPrice" type="number" step="0.01" min="0" placeholder="0.00" value={formData.discountedPrice} onChange={handleChange} className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Category *</label>
                <select name="category" value={formData.category} onChange={handleChange} required className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}>
                  <option value="">Select category</option>
                  {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Brand</label>
                <input name="brand" placeholder="Enter brand name" value={formData.brand} onChange={handleChange} className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
              </div>
            </div>

            <div>
              <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Stock *</label>
              <input name="stock" type="number" min="0" placeholder="0" value={formData.stock} onChange={handleChange} required className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
            </div>

            <div className="flex items-center gap-3 pt-1">
              <div
                className={`w-4 h-4 border flex items-center justify-center cursor-pointer transition-colors ${formData.featured ? "bg-[#d4af37] border-[#d4af37]" : "bg-[#0d0d0d] border-[#262626]"}`}
                style={{ borderRadius: "2px" }}
                onClick={() => setFormData(prev => ({ ...prev, featured: !prev.featured }))}
              >
                {formData.featured && <svg className="w-2.5 h-2.5 text-[#0a0a0a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
              </div>
              <label className="text-xs text-[#c0c0c0] cursor-pointer" style={{ fontFamily: "'Montserrat', sans-serif" }} onClick={() => setFormData(prev => ({ ...prev, featured: !prev.featured }))}>
                Featured Product
              </label>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-[#111111] border border-[#262626] p-5 space-y-4" style={{ borderRadius: "8px" }}>
            <h3 className="text-xs tracking-widest uppercase text-[#d4af37] font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>Additional Information</h3>
            <div>
              <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>SKU</label>
              <input placeholder="Enter product SKU" className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
            </div>
            <div>
              <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Weight (kg)</label>
              <input type="number" step="0.01" min="0" placeholder="0.00" className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
            </div>
            <div>
              <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Dimensions (cm)</label>
              <div className="grid grid-cols-3 gap-2">
                <input placeholder="Length" className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
                <input placeholder="Width" className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
                <input placeholder="Height" className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Images */}
          <div className="bg-[#111111] border border-[#262626] p-5" style={{ borderRadius: "8px" }}>
            <h3 className="text-xs tracking-widest uppercase text-[#d4af37] font-semibold mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Product Images</h3>
            <div className="grid grid-cols-2 gap-3">
              {images.map((image, index) => (
                <div key={index} className="aspect-square bg-[#0d0d0d] border border-[#262626] overflow-hidden relative" style={{ borderRadius: "6px" }}>
                  {image ? (
                    <>
                      <img src={image} alt={`Product image ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 w-6 h-6 bg-red-900/80 text-red-400 flex items-center justify-center hover:bg-red-900 transition-colors"
                        style={{ borderRadius: "4px" }}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-full cursor-pointer hover:bg-[#1a1a1a] transition-colors group">
                      <Upload className="h-7 w-7 text-[#777] group-hover:text-[#888] mb-2 transition-colors" />
                      <span className="text-xs text-[#888] group-hover:text-[#c0c0c0] transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>Upload Image</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, index)} />
                    </label>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-[#888] mt-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Upload up to 4 images. First image will be the featured image.
            </p>
          </div>

          {/* SEO */}
          <div className="bg-[#111111] border border-[#262626] p-5 space-y-4" style={{ borderRadius: "8px" }}>
            <h3 className="text-xs tracking-widest uppercase text-[#d4af37] font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>SEO Information</h3>
            <div>
              <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Meta Title</label>
              <input placeholder="Product meta title (for SEO)" className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
            </div>
            <div>
              <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Meta Description</label>
              <textarea placeholder="Product meta description (for SEO)" rows={3} className={`${inputCls} resize-none`} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="md:col-span-2 flex justify-end gap-3 pt-2 border-t border-[#1a1a1a]">
          <button type="button" onClick={() => router.push("/admin/products")} className={outlineBtn} style={{ borderRadius: "4px" }}>
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting} className={goldBtn} style={{ borderRadius: "4px" }}>
            {isSubmitting ? (
              <><span className="w-3 h-3 border-2 border-[#0a0a0a] border-t-transparent rounded-full animate-spin" /> {isEditing ? "Updating..." : "Creating..."}</>
            ) : (
              <><Save className="h-3.5 w-3.5" /> {isEditing ? "Update Product" : "Create Product"}</>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
