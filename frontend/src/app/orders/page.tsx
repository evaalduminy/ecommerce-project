"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

interface OrderProduct {
  productId: { _id: string; name: string; images?: string[] };
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  products: OrderProduct[];
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchOrders();
    else setLoading(false);
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) setOrders(data.orders);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}/cancel`, {
        method: "PUT",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: "cancelled" } : o));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-500/20 text-yellow-400",
    processing: "bg-blue-500/20 text-blue-400",
    shipped: "bg-purple-500/20 text-purple-400",
    delivered: "bg-green-500/20 text-green-400",
    cancelled: "bg-red-500/20 text-red-400",
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <main className="flex-grow pt-32 pb-24 px-6 flex justify-center items-center min-h-screen bg-[#0f0f0f]">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Please Login</h1>
            <p className="text-[#aaa] mb-6">You need to be logged in to view your orders.</p>
            <Link href="/login" className="bg-[#d80000] text-white px-8 py-3 rounded font-bold hover:bg-[#b30000] transition-colors">
              LOGIN
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-24 pb-24 px-6 md:px-12 min-h-screen bg-[#0f0f0f]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2 uppercase">My Orders</h1>
          <p className="text-[#aaa] mb-10">Track and manage your purchases</p>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-[#d80000] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20 bg-[#1a1a1a] rounded-xl border border-[#333]">
              <p className="text-[#aaa] text-lg mb-6">You haven&apos;t placed any orders yet.</p>
              <Link href="/products" className="bg-[#d80000] text-white px-8 py-3 rounded font-bold hover:bg-[#b30000] transition-colors">
                START SHOPPING
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {orders.map((order) => (
                <div key={order._id} className="bg-[#1a1a1a] border border-[#333] rounded-xl overflow-hidden hover:border-[#555] transition-colors">
                  {/* Order Header */}
                  <div className="flex flex-wrap justify-between items-center px-6 py-4 bg-[#141414] border-b border-[#333]">
                    <div className="flex items-center gap-4">
                      <span className="text-[#aaa] text-xs uppercase tracking-widest font-bold">Order</span>
                      <span className="text-white font-mono text-sm">#{order._id.slice(-8).toUpperCase()}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusColors[order.status] || "bg-gray-500/20 text-gray-400"}`}>
                        {order.status}
                      </span>
                      <span className="text-[#666] text-sm">
                        {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                  </div>

                  {/* Order Products */}
                  <div className="px-6 py-4 space-y-3">
                    {order.products.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#333] rounded flex items-center justify-center text-[#aaa] text-xs">
                            {item.quantity}x
                          </div>
                          <span className="text-white text-sm">
                            {item.productId?.name || "Product"}
                          </span>
                        </div>
                        <span className="text-white font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="flex flex-wrap justify-between items-center px-6 py-4 border-t border-[#333]">
                    <span className="text-[#d80000] font-bold text-xl">${order.totalAmount?.toFixed(2)}</span>
                    {order.status === "pending" && (
                      <button
                        onClick={() => cancelOrder(order._id)}
                        className="text-sm text-red-400 border border-red-400/30 px-4 py-2 rounded hover:bg-red-400/10 transition-colors font-bold uppercase tracking-wider"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
