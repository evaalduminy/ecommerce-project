"use client";

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[#2a2a2a]">
      {/* Red accent line at very top */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#d80000] to-transparent"></div>
      
      <div className="flex justify-between items-center px-8 h-16 w-full max-w-7xl mx-auto">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-gradient-to-br from-[#d80000] to-[#8b0000] text-white w-9 h-9 flex items-center justify-center font-black text-lg rounded-lg shadow-lg shadow-[#d80000]/10 group-hover:shadow-[#d80000]/30 transition-shadow">
            C
          </div>
          <span className="text-white text-lg font-bold tracking-widest uppercase">Crimson</span>
        </Link>
        
        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link className="text-[#888] hover:text-white text-sm font-medium uppercase tracking-wider transition-colors relative group" href="/">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#d80000] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link className="text-[#888] hover:text-white text-sm font-medium uppercase tracking-wider transition-colors relative group" href="/products">
            Products
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#d80000] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link className="text-[#888] hover:text-white text-sm font-medium uppercase tracking-wider transition-colors relative group" href="/orders">
            Orders
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#d80000] group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-5">
          <Link href="/cart" className="relative hover:text-[#d80000] transition-colors text-white p-2 rounded-lg hover:bg-white/5">
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>shopping_cart</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-[#d80000] rounded-full shadow-lg shadow-[#d80000]/30">
                {cartItemCount}
              </span>
            )}
          </Link>
          
          {user ? (
            <div className="flex items-center gap-3 pl-3 border-l border-[#2a2a2a]">
              {user.role === "admin" && (
                <Link href="/admin" className="flex items-center gap-1 text-[#d80000] hover:text-[#ff3333] transition-colors p-2 rounded-lg hover:bg-white/5 text-xs font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>dashboard</span>
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
              )}
              {user.role === "vendor" && (
                <Link href="/vendor" className="flex items-center gap-1 text-[#d80000] hover:text-[#ff3333] transition-colors p-2 rounded-lg hover:bg-white/5 text-xs font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>storefront</span>
                  <span className="hidden sm:inline">Store</span>
                </Link>
              )}
              <Link href="/profile" className="flex items-center gap-2 text-white hover:text-[#d80000] transition-colors p-2 rounded-lg hover:bg-white/5">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>person</span>
                <span className="text-sm font-medium hidden sm:inline">{user.name}</span>
              </Link>
              <button 
                onClick={logout} 
                className="text-[#888] hover:text-[#d80000] text-xs font-bold uppercase tracking-wider transition-colors p-2 rounded-lg hover:bg-white/5"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn-primary text-xs py-2 px-5">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
