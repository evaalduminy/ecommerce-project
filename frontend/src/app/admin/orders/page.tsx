"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Sidebar } from "@/app/components/shared/Sidebar";

interface Order {
  _id: string;
  userId: any;
  products: any[];
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

export default function AdminOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === "admin") fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders", { credentials: "include" });
      const data = await res.json();
      if (data.success) setOrders(data.orders || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`http://localhost:5000/api/orders/${id}/status`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        credentials: "include", body: JSON.stringify({ status })
      });
      setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o));
    } catch (err) { console.error(err); }
  };

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-500/20 text-yellow-400",
    processing: "bg-blue-500/20 text-blue-400",
    shipped: "bg-purple-500/20 text-purple-400",
    delivered: "bg-green-500/20 text-green-400",
    cancelled: "bg-red-500/20 text-red-400",
  };

  if (!user || user.role !== "admin") return null;

  return (
    <>
      <Navbar />
      <div className="flex pt-[66px] min-h-screen bg-[#0a0a0a]">
        <Sidebar role="admin" />
        <div className="flex-1 p-8">
          <h1 className="section-title text-2xl mb-8">Manage Orders</h1>
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-[#d80000] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : orders.length === 0 ? (
            <div className="glass-card rounded-xl p-12 text-center">
              <p className="text-[#888]">No orders found.</p>
            </div>
          ) : (
            <div className="glass-card rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2a2a2a] bg-[#0f0f0f]">
                    <th className="text-left py-4 px-6 text-xs uppercase tracking-wider text-[#888]">Order ID</th>
                    <th className="text-left py-4 px-6 text-xs uppercase tracking-wider text-[#888]">Date</th>
                    <th className="text-left py-4 px-6 text-xs uppercase tracking-wider text-[#888]">Amount</th>
                    <th className="text-left py-4 px-6 text-xs uppercase tracking-wider text-[#888]">Status</th>
                    <th className="text-left py-4 px-6 text-xs uppercase tracking-wider text-[#888]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id} className="border-b border-[#1a1a1a] hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 font-mono text-sm">#{order._id.slice(-8).toUpperCase()}</td>
                      <td className="py-4 px-6 text-[#888] text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="py-4 px-6 text-[#d80000] font-bold">${order.totalAmount?.toFixed(2)}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${statusColors[order.status] || "bg-gray-500/20 text-gray-400"}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order._id, e.target.value)}
                          className="glass-input text-sm py-1 px-2"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
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
