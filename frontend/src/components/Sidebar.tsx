import Link from 'next/link';

export default function Sidebar() {
  return (
    <nav className="bg-[#1a0a07] dark:bg-[#1a0a07] h-screen w-64 flex-shrink-0 flex flex-col py-8 gap-4 shadow-[24px_0_48px_-12px_rgba(26,10,7,0.5)] z-40 relative">
        <div className="px-8 mb-8 flex flex-col gap-2">
            <span className="font-['Epilogue'] font-bold text-[#d80000] text-xl tracking-tighter">
                <Link href="/">Management</Link>
            </span>
            <span className="text-on-surface-variant text-xs opacity-70">Global Controller</span>
        </div>
        
        <div className="flex-1 flex flex-col gap-2 px-4 font-['Manrope'] text-sm font-medium tracking-wide">
            <Link href="/vendor" className="flex items-center gap-4 bg-gradient-to-r from-[#d80000] to-[#ffb4a8] text-white rounded-sm px-4 py-3 translate-x-1 duration-200">
                <span className="material-symbols-outlined" aria-hidden="true" style={{fontVariationSettings: "'FILL' 1"}}>dashboard</span>
                <span>Dashboard</span>
            </Link>
            <Link href="/admin/inventory" className="flex items-center gap-4 text-[#e8bcb5] px-4 py-3 opacity-70 hover:bg-[#2e1b17] hover:opacity-100 transition-all translate-x-1 duration-200">
                <span className="material-symbols-outlined" aria-hidden="true">inventory_2</span>
                <span>Inventory</span>
            </Link>
            <Link href="/admin/orders" className="flex items-center gap-4 text-[#e8bcb5] px-4 py-3 opacity-70 hover:bg-[#2e1b17] hover:opacity-100 transition-all translate-x-1 duration-200">
                <span className="material-symbols-outlined" aria-hidden="true">receipt_long</span>
                <span>Orders</span>
            </Link>
            <Link href="/admin/analytics" className="flex items-center gap-4 text-[#e8bcb5] px-4 py-3 opacity-70 hover:bg-[#2e1b17] hover:opacity-100 transition-all translate-x-1 duration-200">
                <span className="material-symbols-outlined" aria-hidden="true">analytics</span>
                <span>Analytics</span>
            </Link>
            <Link href="/admin/vendors" className="flex items-center gap-4 text-[#e8bcb5] px-4 py-3 opacity-70 hover:bg-[#2e1b17] hover:opacity-100 transition-all translate-x-1 duration-200">
                <span className="material-symbols-outlined" aria-hidden="true">group</span>
                <span>Vendors</span>
            </Link>
            <Link href="/profile" className="flex items-center gap-4 text-[#e8bcb5] px-4 py-3 opacity-70 hover:bg-[#2e1b17] hover:opacity-100 transition-all translate-x-1 duration-200 mt-auto">
                <span className="material-symbols-outlined" aria-hidden="true">settings</span>
                <span>Settings</span>
            </Link>
        </div>
        
        <div className="px-6 mt-4">
            <button className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-headline font-bold text-xs py-3 rounded-DEFAULT hover:opacity-90 transition-opacity">Launch New Collection</button>
        </div>
    </nav>
  );
}
