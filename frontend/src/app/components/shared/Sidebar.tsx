"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, BarChart3, Bell } from "lucide-react";

interface SidebarProps {
  role: 'admin' | 'vendor';
}

export function Sidebar({ role }: SidebarProps) {
  const location = usePathname();

  const adminLinks = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
    { path: '/admin/products', icon: Package, label: 'Products' },
    { path: '/admin/users', icon: Users, label: 'Users' },
    { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  const vendorLinks = [
    { path: '/vendor', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/vendor/products', icon: Package, label: 'My Products' },
    { path: '/vendor/orders', icon: ShoppingCart, label: 'Orders' },
    { path: '/vendor/notifications', icon: Bell, label: 'Notifications' },
    { path: '/vendor/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/vendor/settings', icon: Settings, label: 'Settings' },
  ];

  const links = role === 'admin' ? adminLinks : vendorLinks;

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen sticky top-16">
      <div className="p-6">
        <h2 className="text-xl mb-6">{role === 'admin' ? 'Admin Panel' : 'Vendor Panel'}</h2>
        <nav className="space-y-2">
          {links.map(link => {
            const Icon = link.icon;
            const isActive = location === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}


