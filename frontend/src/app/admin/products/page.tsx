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
  category: any;
}

export default function AdminProductsPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data.products || data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  if (!user || user.role !== "admin") return null;

  return (
    <>
      <Navbar />
      <div className="flex pt-[66px] min-h-screen bg-[#0a0a0a]">
        <Sidebar role="admin" />
        <div className="flex-1 p-8">
          <h1 className="section-title text-2xl mb-8">All Products</h1>
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-[#d80000] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="glass-card rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2a2a2a] bg-[#0f0f0f]">
                    <th className="text-left py-4 px-6 text-xs uppercase tracking-wider text-[#888]">Product</th>
                    <th className="text-left py-4 px-6 text-xs uppercase tracking-wider text-[#888]">Price</th>
                    <th className="text-left py-4 px-6 text-xs uppercase tracking-wider text-[#888]">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id} className="border-b border-[#1a1a1a] hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-[#1a1a1a] rounded-lg overflow-hidden flex-shrink-0">
                            {product.images?.[0] ? (
                              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[#555]">
                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>image</span>
                              </div>
                            )}
                          </div>
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-[#d80000] font-bold">${product.price}</td>
                      <td className="py-4 px-6">
                        <span className={product.stock < 10 ? "text-yellow-400" : "text-[#888]"}>
                          {product.stock} units
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
