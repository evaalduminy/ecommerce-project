"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Sidebar } from "@/app/components/shared/Sidebar";

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  images: string[];
}

export default function VendorProductsPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "", description: "" });

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products", { credentials: "include" });
      const data = await res.json();
      setProducts(data.products || data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST", headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: newProduct.name, price: +newProduct.price, stock: +newProduct.stock, description: newProduct.description })
      });
      const data = await res.json();
      if (data.success || data.product) {
        fetchProducts();
        setShowForm(false);
        setNewProduct({ name: "", price: "", stock: "", description: "" });
      }
    } catch (err) { console.error(err); }
  };

  if (!user || user.role !== "vendor") return null;

  return (
    <>
      <Navbar />
      <div className="flex pt-[66px] min-h-screen bg-[#0a0a0a]">
        <Sidebar role="vendor" />
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="section-title text-2xl">My Products</h1>
            <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
              Add Product
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleAdd} className="glass-card rounded-xl p-6 mb-6 animate-fade-in-up">
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#888] mb-2">Name</label>
                  <input value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="glass-input" required />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#888] mb-2">Price ($)</label>
                  <input type="number" step="0.01" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="glass-input" required />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#888] mb-2">Stock</label>
                  <input type="number" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} className="glass-input" required />
                </div>
              </div>
              <div className="flex gap-3">
                <button type="submit" className="btn-primary text-sm">Save Product</button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-outline text-sm">Cancel</button>
              </div>
            </form>
          )}

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-[#d80000] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map(p => (
                <div key={p._id} className="glass-card glass-card-hover rounded-xl p-5 cursor-pointer transition-all duration-300">
                  <div className="w-full h-40 bg-[#141414] rounded-lg mb-4 overflow-hidden">
                    {p.images?.[0] ? (
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#555]">
                        <span className="material-symbols-outlined" style={{ fontSize: '40px' }}>image</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-white mb-1 truncate">{p.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-[#d80000] font-bold">${p.price}</span>
                    <span className={`text-xs ${p.stock < 10 ? "text-yellow-400" : "text-[#888]"}`}>{p.stock} in stock</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
