"use client";

import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Sidebar } from "@/app/components/shared/Sidebar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const monthlyData = [
  { month: "Jan", revenue: 12000, orders: 145 },
  { month: "Feb", revenue: 15000, orders: 178 },
  { month: "Mar", revenue: 18500, orders: 210 },
  { month: "Apr", revenue: 22000, orders: 256 },
];

const categoryData = [
  { name: "Electronics", value: 40 },
  { name: "Fashion", value: 25 },
  { name: "Home", value: 20 },
  { name: "Sports", value: 15 },
];

const COLORS = ["#d80000", "#ff4444", "#ff8888", "#ffbbbb"];

export default function AdminAnalyticsPage() {
  const { user } = useAuth();
  if (!user || user.role !== "admin") return null;

  return (
    <>
      <Navbar />
      <div className="flex pt-[66px] min-h-screen bg-[#0a0a0a]">
        <Sidebar role="admin" />
        <div className="flex-1 p-8">
          <h1 className="section-title text-2xl mb-8">Analytics</h1>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#d80000] rounded-full"></span>
                Monthly Revenue
              </h3>
              <p className="text-[#888] text-sm mb-6">Revenue trends over recent months</p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "8px", color: "#fff" }} />
                  <Bar dataKey="revenue" fill="#d80000" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#d80000] rounded-full"></span>
                Sales by Category
              </h3>
              <p className="text-[#888] text-sm mb-6">Product category distribution</p>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={4} dataKey="value">
                    {categoryData.map((_, i) => (<Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "8px", color: "#fff" }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {categoryData.map((entry, i) => (
                  <div key={entry.name} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                    <span className="text-[#888]">{entry.name} ({entry.value}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
