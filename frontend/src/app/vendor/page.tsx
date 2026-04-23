"use client";

import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { VendorDashboard as StitchVendorDashboard } from "@/app/components/pages/VendorDashboard";
import Link from "next/link";

export default function VendorDashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="page-container flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-[#d80000] border-t-transparent rounded-full animate-spin"></div>
        </main>
      </>
    );
  }

  if (!user || user.role !== "vendor") {
    return (
      <>
        <Navbar />
        <main className="page-container flex justify-center items-center px-6">
          <div className="glass-card rounded-2xl p-12 text-center max-w-md">
            <div className="w-16 h-16 mx-auto bg-[#d80000]/10 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[#d80000]" style={{ fontSize: '32px' }}>storefront</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Vendor Access Only</h1>
            <p className="text-[#888] mb-6">You must be logged in as a Vendor to view this dashboard.</p>
            <Link href="/login" className="btn-primary inline-block">Sign In</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-[66px] bg-[#0a0a0a] min-h-screen text-white">
        <StitchVendorDashboard />
      </main>
      <Footer />
    </>
  );
}
