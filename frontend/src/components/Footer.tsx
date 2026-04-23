import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full mt-auto bg-[#0a0a0a] border-t border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-[#d80000] to-[#8b0000] text-white w-9 h-9 flex items-center justify-center font-black text-lg rounded-lg">
                C
              </div>
              <span className="text-white text-lg font-bold tracking-widest uppercase">Crimson</span>
            </div>
            <p className="text-[#666] text-sm leading-relaxed">
              Premium multi-vendor marketplace. Discover unique products from independent sellers worldwide.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-4">Shop</h4>
            <div className="flex flex-col gap-2">
              <Link className="text-[#888] hover:text-[#d80000] text-sm transition-colors" href="/products">All Products</Link>
              <Link className="text-[#888] hover:text-[#d80000] text-sm transition-colors" href="/orders">My Orders</Link>
              <Link className="text-[#888] hover:text-[#d80000] text-sm transition-colors" href="/cart">Cart</Link>
            </div>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-4">Account</h4>
            <div className="flex flex-col gap-2">
              <Link className="text-[#888] hover:text-[#d80000] text-sm transition-colors" href="/profile">Profile</Link>
              <Link className="text-[#888] hover:text-[#d80000] text-sm transition-colors" href="/register">Create Account</Link>
              <Link className="text-[#888] hover:text-[#d80000] text-sm transition-colors" href="/login">Sign In</Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-4">Legal</h4>
            <div className="flex flex-col gap-2">
              <Link className="text-[#888] hover:text-[#d80000] text-sm transition-colors" href="#">Privacy Policy</Link>
              <Link className="text-[#888] hover:text-[#d80000] text-sm transition-colors" href="#">Terms of Service</Link>
              <Link className="text-[#888] hover:text-[#d80000] text-sm transition-colors" href="#">Shipping</Link>
              <Link className="text-[#888] hover:text-[#d80000] text-sm transition-colors" href="#">Returns</Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#1a1a1a] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#555] text-xs uppercase tracking-[0.15em]">
            © 2026 Crimson Market. All Rights Reserved.
          </p>
          <div className="flex gap-4">
            <span className="text-[#555] hover:text-[#d80000] cursor-pointer transition-colors text-sm">🔗 GitHub</span>
            <span className="text-[#555] hover:text-[#d80000] cursor-pointer transition-colors text-sm">🐦 Twitter</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
