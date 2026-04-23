"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, LayoutDashboard } from "lucide-react";
import { useCart } from "../../context/CartContext";

export function Header() {
  const { totalItems } = useCart();
  const location = usePathname();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground">E</span>
            </div>
            <span className="text-xl">E-Shop</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`hover:text-primary transition-colors ${isActive('/') ? 'text-primary' : ''}`}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`hover:text-primary transition-colors ${isActive('/products') ? 'text-primary' : ''}`}
            >
              Products
            </Link>
            <Link
              href="/orders"
              className={`hover:text-primary transition-colors ${isActive('/orders') ? 'text-primary' : ''}`}
            >
              Orders
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              className="relative p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            <div className="relative group">
              <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                <User className="w-5 h-5" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link href="/profile" className="block px-4 py-2 hover:bg-accent rounded-t-lg">
                  Profile
                </Link>
                <Link href="/admin" className="block px-4 py-2 hover:bg-accent flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  Admin Dashboard
                </Link>
                <Link href="/vendor" className="block px-4 py-2 hover:bg-accent rounded-b-lg flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  Vendor Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}


