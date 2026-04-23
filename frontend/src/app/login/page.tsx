"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        login("", data.user);
        router.push("/profile");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err: any) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="page-container flex justify-center items-center px-6">
        {/* Background glow */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d80000] rounded-full opacity-[0.03] blur-[120px]"></div>
        </div>

        <div className="w-full max-w-md relative animate-fade-in-up">
          {/* Red accent line */}
          <div className="h-1 bg-gradient-to-r from-transparent via-[#d80000] to-transparent mb-8 rounded-full"></div>

          <div className="glass-card rounded-2xl p-10">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-[#d80000] to-[#8b0000] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl font-black">C</span>
              </div>
            </div>

            <h1 className="text-3xl font-black text-center uppercase tracking-tight mb-1">Welcome Back</h1>
            <p className="text-[#888] text-center mb-8 text-sm">Sign in to your Crimson Market account</p>
            
            {error && (
              <div className="bg-[#d80000]/10 border border-[#d80000]/30 text-[#ff6666] p-4 rounded-lg mb-6 text-sm text-center animate-fade-in-up">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#888] mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="glass-input"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#888] mb-2">Password</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="glass-input"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Signing in...
                  </span>
                ) : "SIGN IN"}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-[#2a2a2a]">
              <p className="text-center text-[#888] text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-[#d80000] font-bold hover:text-[#ff3333] transition-colors">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
