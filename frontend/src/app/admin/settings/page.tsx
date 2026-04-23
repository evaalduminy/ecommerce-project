"use client";

import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Sidebar } from "@/app/components/shared/Sidebar";

export default function AdminSettingsPage() {
  const { user } = useAuth();
  if (!user || user.role !== "admin") return null;

  return (
    <>
      <Navbar />
      <div className="flex pt-[66px] min-h-screen bg-[#0a0a0a]">
        <Sidebar role="admin" />
        <div className="flex-1 p-8">
          <h1 className="section-title text-2xl mb-8">Settings</h1>
          <div className="space-y-6 max-w-2xl">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#d80000] rounded-full"></span>
                Store Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#888] mb-2">Store Name</label>
                  <input type="text" defaultValue="Crimson Market" className="glass-input" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#888] mb-2">Store Currency</label>
                  <select className="glass-input">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>SAR (﷼)</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#d80000] rounded-full"></span>
                Notifications
              </h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm">Email notifications for new orders</span>
                  <input type="checkbox" defaultChecked className="accent-[#d80000] w-5 h-5" />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm">Low stock alerts</span>
                  <input type="checkbox" defaultChecked className="accent-[#d80000] w-5 h-5" />
                </label>
              </div>
            </div>
            <button className="btn-primary">Save Settings</button>
          </div>
        </div>
      </div>
    </>
  );
}
