"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Sidebar } from "@/app/components/shared/Sidebar";

interface UserItem {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === "admin") fetchUsers();
  }, [user]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users", { credentials: "include" });
      const data = await res.json();
      if (data.success) setUsers(data.users || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const updateRole = async (id: string, role: string) => {
    try {
      await fetch(`http://localhost:5000/api/users/${id}/role`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        credentials: "include", body: JSON.stringify({ role })
      });
      setUsers(prev => prev.map(u => u._id === id ? { ...u, role } : u));
    } catch (err) { console.error(err); }
  };

  const roleColors: Record<string, string> = {
    admin: "bg-[#d80000]/20 text-[#d80000]",
    vendor: "bg-purple-500/20 text-purple-400",
    customer: "bg-blue-500/20 text-blue-400",
  };

  if (!user || user.role !== "admin") return null;

  return (
    <>
      <Navbar />
      <div className="flex pt-[66px] min-h-screen bg-[#0a0a0a]">
        <Sidebar role="admin" />
        <div className="flex-1 p-8">
          <h1 className="section-title text-2xl mb-8">User Management</h1>
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-[#d80000] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="glass-card rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2a2a2a] bg-[#0f0f0f]">
                    <th className="text-left py-4 px-6 text-xs uppercase tracking-wider text-[#888]">User</th>
                    <th className="text-left py-4 px-6 text-xs uppercase tracking-wider text-[#888]">Email</th>
                    <th className="text-left py-4 px-6 text-xs uppercase tracking-wider text-[#888]">Role</th>
                    <th className="text-left py-4 px-6 text-xs uppercase tracking-wider text-[#888]">Change Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u._id} className="border-b border-[#1a1a1a] hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 font-medium">{u.name}</td>
                      <td className="py-4 px-6 text-[#888] text-sm">{u.email}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${roleColors[u.role] || ""}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <select
                          value={u.role}
                          onChange={(e) => updateRole(u._id, e.target.value)}
                          className="glass-input text-sm py-1 px-2"
                        >
                          <option value="customer">Customer</option>
                          <option value="vendor">Vendor</option>
                          <option value="admin">Admin</option>
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
