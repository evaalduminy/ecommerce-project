"use client";

import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Sidebar } from "@/app/components/shared/Sidebar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const salesData = [
  { month: "Jan", sales: 4200 },
  { month: "Feb", sales: 5800 },
  { month: "Mar", sales: 7100 },
  { month: "Apr", sales: 8900 },
];

const visitsData = [
  { day: "Mon", visits: 120 },
  { day: "Tue", visits: 200 },
  { day: "Wed", visits: 180 },
  { day: "Thu", visits: 250 },
  { day: "Fri", visits: 310 },
  { day: "Sat", visits: 400 },
  { day: "Sun", visits: 350 },
];

export default function VendorAnalyticsPage() {
  const { user } = useAuth();
  if (!user || user.role !== "vendor") return null;

  return (
    <>
      <Navbar />
      <div className="flex pt-[66px] min-h-screen bg-[#0a0a0a]">
        <Sidebar role="vendor" />
        <div className="flex-1 p-8">
          <h1 className="section-title text-2xl mb-8">Store Analytics</h1>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="glass-card rounded-xl p-5">
              <p className="text-[#888] text-xs uppercase tracking-wider mb-1">Total Sales</p>
              <p className="text-2xl font-bold text-white">$26,000</p>
              <span className="text-green-400 text-xs">+14.5% this month</span>
            </div>
            <div className="glass-card rounded-xl p-5">
              <p className="text-[#888] text-xs uppercase tracking-wider mb-1">Products Sold</p>
              <p className="text-2xl font-bold text-white">342</p>
              <span className="text-green-400 text-xs">+8.2% this month</span>
            </div>
            <div className="glass-card rounded-xl p-5">
              <p className="text-[#888] text-xs uppercase tracking-wider mb-1">Store Views</p>
              <p className="text-2xl font-bold text-white">1,810</p>
              <span className="text-green-400 text-xs">+22% this week</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#d80000] rounded-full"></span>
                Monthly Sales
              </h3>
              <p className="text-[#888] text-sm mb-6">Revenue per month</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "8px", color: "#fff" }} />
                  <Bar dataKey="sales" fill="#d80000" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#d80000] rounded-full"></span>
                Store Visits
              </h3>
              <p className="text-[#888] text-sm mb-6">Daily traffic this week</p>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={visitsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis dataKey="day" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "8px", color: "#fff" }} />
                  <Area type="monotone" dataKey="visits" stroke="#d80000" fill="#d80000" fillOpacity={0.1} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
