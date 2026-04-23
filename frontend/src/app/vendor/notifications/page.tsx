"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Sidebar } from "@/app/components/shared/Sidebar";

const initialNotifications = [
  { id: 1, title: "New Order Received", message: "Order #1234 for Premium Wireless Headphones", time: "5 min ago", unread: true },
  { id: 2, title: "Stock Alert", message: "Smart Watch Pro is running low (3 remaining)", time: "1 hour ago", unread: true },
  { id: 3, title: "Product Review", message: "New 5-star review on Wireless Earbuds", time: "2 hours ago", unread: false },
  { id: 4, title: "Payment Received", message: "Payment of $299.99 has been processed", time: "3 hours ago", unread: false },
  { id: 5, title: "Product Approved", message: "Your new product 'Gaming Mouse' is now live", time: "5 hours ago", unread: false },
];

export default function VendorNotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(initialNotifications);

  const markRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  if (!user || user.role !== "vendor") return null;

  return (
    <>
      <Navbar />
      <div className="flex pt-[66px] min-h-screen bg-[#0a0a0a]">
        <Sidebar role="vendor" />
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="section-title text-2xl">Notifications</h1>
            <button onClick={markAllRead} className="btn-outline text-xs py-2 px-4">Mark All Read</button>
          </div>

          <div className="space-y-3 max-w-3xl">
            {notifications.map(n => (
              <div
                key={n.id}
                onClick={() => markRead(n.id)}
                className={`glass-card rounded-xl p-5 cursor-pointer transition-all duration-300 hover:border-[#d80000]/20 ${n.unread ? "border-l-4 border-l-[#d80000]" : ""}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-white flex items-center gap-2">
                      {n.title}
                      {n.unread && <span className="w-2 h-2 bg-[#d80000] rounded-full"></span>}
                    </h3>
                    <p className="text-[#888] text-sm mt-1">{n.message}</p>
                  </div>
                  <span className="text-[#555] text-xs whitespace-nowrap">{n.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
