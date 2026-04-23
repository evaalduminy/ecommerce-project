"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartPage } from "@/app/components/pages/CartPage";

export default function ShoppingCartPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-16 bg-[#0f0f0f] min-h-screen">
        <CartPage />
      </main>
      <Footer />
    </>
  );
}
