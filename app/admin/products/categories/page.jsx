'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Edit, Trash2, Plus, Image as ImageIcon, X } from 'lucide-react';

const inputCls = "w-full bg-[#0d0d0d] border border-[#262626] text-[#fafafa] px-3 py-2.5 text-sm outline-none focus:border-[#d4af37] transition-colors placeholder-[#666]";
const labelCls = "text-xs tracking-widest uppercase text-[#c0c0c0] block mb-1.5";
const goldBtn = "inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-widest uppercase bg-[#d4af37] text-[#0a0a0a] hover:bg-[#c9a227] transition-all disabled:opacity-60";
const outlineBtn = "inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-widest uppercase border border-[#262626] text-[#c0c0c0] hover:border-[#d4af37] hover:text-[#d4af37] transition-all";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', slug: '', description: '', parent: '', image: null });
  const [editingId, setEditingId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/products/categories');
      if (res.data.success) setCategories(res.data.data);
    } catch { setMessage("Failed to load categories"); }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) { setFormData((prev) => ({ ...prev, image: file })); setPreviewImage(URL.createObjectURL(file)); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const fd = new FormData(e.target);
      const imageFile = fd.get('image');
      let base64Image = null;
      if (imageFile && imageFile.size > 0) {
        base64Image = await new Promise((res, rej) => {
          const reader = new FileReader();
          reader.readAsDataURL(imageFile);
          reader.onload = () => res(reader.result);
          reader.onerror = rej;
        });
      }
      const data = { name: fd.get('name') || '', slug: fd.get('slug') || '', description: fd.get('description') || '', parent: fd.get('parent') || null, imageBase64: base64Image };
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/products/categories/${editingId}` : '/api/products/categories';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await res.json();
      if (result.success) {
        setModalOpen(false);
        fetchCategories();
        setFormData({ name: '', slug: '', description: '', parent: '', image: null });
        setPreviewImage(null);
        setEditingId(null);
      } else {
        setMessage(result.message || "Failed to save category");
      }
    } catch { setMessage("An error occurred while saving the category"); }
    finally { setLoading(false); }
  };

  const handleEdit = (cat) => {
    setFormData({ name: cat.name || '', slug: cat.slug || '', description: cat.description || '', parent: cat.parent?._id || '', image: null });
    setPreviewImage(cat.image || null);
    setEditingId(cat._id);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this category?')) return;
    try { await axios.delete(`/api/products/categories/${id}`); fetchCategories(); }
    catch { alert("Failed to delete category"); }
  };

  const openAdd = () => {
    setModalOpen(true);
    setFormData({ name: '', slug: '', description: '', parent: '', image: null });
    setEditingId(null);
    setPreviewImage(null);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Fragrance <span className="text-[#d4af37] italic">Categories</span>
          </h1>
          <p className="text-xs text-[#c0c0c0] mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>Manage product categories</p>
        </div>
        <button onClick={openAdd} className={goldBtn} style={{ borderRadius: "4px" }}>
          <Plus className="h-3.5 w-3.5" /> Add Category
        </button>
      </div>

      {/* Category Grid */}
      {categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-[#262626] text-center" style={{ borderRadius: "8px" }}>
          <ImageIcon className="h-12 w-12 text-[#777] mb-4" />
          <h3 className="text-sm font-semibold text-[#fafafa] mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>No categories yet</h3>
          <p className="text-xs text-[#888] mb-5" style={{ fontFamily: "'Montserrat', sans-serif" }}>Get started by creating your first category.</p>
          <button onClick={openAdd} className={goldBtn} style={{ borderRadius: "4px" }}>
            <Plus className="h-3.5 w-3.5" /> Create Category
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat._id} className="bg-[#111111] border border-[#262626] overflow-hidden group hover:border-[#d4af37]/30 transition-all duration-300" style={{ borderRadius: "8px" }}>
              <div className="h-44 bg-[#0d0d0d] overflow-hidden relative">
                {cat.image ? (
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="flex items-center justify-center h-full text-[#777]">
                    <ImageIcon size={40} />
                  </div>
                )}
                <div className="absolute inset-0 bg-[#d4af37]/0 group-hover:bg-[#d4af37]/5 transition-all duration-300" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-[#fafafa] mb-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>{cat.name}</h3>
                <p className="text-[10px] text-[#888] mb-2 font-mono">{cat.slug}</p>
                {cat.parent && (
                  <p className="text-xs text-[#c0c0c0] mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Parent: <span className="text-[#d4af37]">{cat.parent.name}</span>
                  </p>
                )}
                <p className="text-xs text-[#c0c0c0] mb-4 line-clamp-2 leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {cat.description || 'No description provided'}
                </p>
                <div className="flex justify-end gap-2">
                  <button onClick={() => handleEdit(cat)} className={outlineBtn} style={{ borderRadius: "4px" }}>
                    <Edit className="h-3 w-3" /> Edit
                  </button>
                  <button onClick={() => handleDelete(cat._id)} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold tracking-widest uppercase border border-red-900/50 text-red-400 hover:bg-red-900/10 transition-all" style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}>
                    <Trash2 className="h-3 w-3" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
          <div className="bg-[#111111] border border-[#262626] w-full max-w-md" style={{ borderRadius: "8px" }}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#262626] bg-[#0d0d0d]">
              <h3 className="font-bold text-[#fafafa]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {editingId ? "Edit" : "Add"} Category
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-[#888] hover:text-[#fafafa] transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4" encType="multipart/form-data">
              <div>
                <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Name *</label>
                <input name="name" placeholder="Category name" value={formData.name} onChange={handleChange} required className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
              </div>
              <div>
                <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Slug *</label>
                <input name="slug" placeholder="category-slug" value={formData.slug} onChange={handleChange} required className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
              </div>
              <div>
                <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Description</label>
                <textarea name="description" placeholder="Category description" value={formData.description} onChange={handleChange} className={`${inputCls} min-h-[80px] resize-none`} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
              </div>
              <div>
                <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Parent Category</label>
                <select name="parent" value={formData.parent} onChange={handleChange} className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}>
                  <option value="">No Parent</option>
                  {categories.filter((c) => c._id !== editingId).map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls} style={{ fontFamily: "'Montserrat', sans-serif" }}>Image</label>
                <input type="file" name="image" accept="image/*" onChange={handleFileChange} className={inputCls} style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }} />
                {previewImage && (
                  <img src={previewImage} alt="Preview" className="mt-2 w-20 h-20 object-cover border border-[#262626]" style={{ borderRadius: "4px" }} />
                )}
              </div>

              {message && (
                <div className="px-3 py-2 text-xs bg-red-900/20 border border-red-700/40 text-red-400" style={{ borderRadius: "4px", fontFamily: "'Montserrat', sans-serif" }}>
                  {message}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-1">
                <button type="button" onClick={() => setModalOpen(false)} className={outlineBtn} style={{ borderRadius: "4px" }}>Cancel</button>
                <button type="submit" disabled={loading} className={goldBtn} style={{ borderRadius: "4px" }}>
                  {loading ? (
                    <><span className="w-3 h-3 border-2 border-[#0a0a0a] border-t-transparent rounded-full animate-spin" /> Saving...</>
                  ) : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
