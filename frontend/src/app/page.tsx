import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { HomePage } from "@/app/components/pages/HomePage";

async function getFeaturedProducts() {
  try {
    const res = await fetch('http://localhost:5000/api/products?limit=8', { cache: 'no-store' });
    if (!res.ok) return [];
    
    // Check if the structure contains products array or is the array itself
    const data = await res.json();
    return data.products || data || [];
  } catch (error) {
    console.error("Failed to fetch featured products", error);
    return [];
  }
}

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-background min-h-screen">
        <HomePage products={products} />
      </main>
      <Footer />
    </>
  );
}
