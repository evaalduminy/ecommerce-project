import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProductDetailPage as StitchProductDetailPage } from "@/app/components/pages/ProductDetailPage";

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let product: any = null;
  let relatedProducts: any[] = [];

  try {
    const res = await fetch(`http://localhost:5000/api/products/${id}`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      product = data.product || data;
    }

    const resAll = await fetch(`http://localhost:5000/api/products`, { cache: 'no-store' });
    if (resAll.ok) {
      const data = await resAll.json();
      const all = data.products || data || [];
      const catId = product?.category?._id || product?.category;
      relatedProducts = all
        .filter((p: any) => {
          const pCat = p.category?._id || p.category;
          return pCat === catId && p._id !== product?._id;
        })
        .slice(0, 4);
    }
  } catch (e) {
    console.error(e);
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="page-container flex justify-center items-center">
          <div className="glass-card rounded-2xl p-12 text-center">
            <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
            <p className="text-[#888]">The product you&apos;re looking for doesn&apos;t exist.</p>
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
        <StitchProductDetailPage product={product} relatedProducts={relatedProducts} />
      </main>
      <Footer />
    </>
  );
}
