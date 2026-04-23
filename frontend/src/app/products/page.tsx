import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProductsPage as StitchProductsPage } from "@/app/components/pages/ProductsPage";

async function getProducts() {
  try {
    const res = await fetch('http://localhost:5000/api/products', { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.products || data || [];
  } catch (error) {
    console.error("Failed to fetch products", error);
    return [];
  }
}

export default async function Products() {
  const products = await getProducts();
  const categoriesObj = new Set(products.map((p: any) => p.category || "Uncategorized"));
  const categories = ["All", ...Array.from(categoriesObj)] as string[];

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-16 bg-[#0f0f0f] min-h-screen text-white">
        <StitchProductsPage products={products} categories={categories} />
      </main>
      <Footer />
    </>
  );
}
