import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { ProductCard } from "../shared/ProductCard";

export function HomePage({ products = [] }: { products?: any[] }) {
  const mappedProducts = products.map(p => ({
    id: p._id || p.id,
    name: p.name,
    price: p.price,
    image: p.images?.[0] || p.image || "https://via.placeholder.com/400",
    rating: p.rating || 5.0,
    reviews: p.reviews || 120,
    inStock: typeof p.countInStock !== 'undefined' ? p.countInStock > 0 : typeof p.inStock !== 'undefined' ? p.inStock : true,
    category: p.category || "Uncategorized",
    description: p.description || "",
    vendor: p.vendor || "Vendor",
  }));

  const featuredProducts = mappedProducts.slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-card to-card border border-border mb-12">
        <div className="px-8 md:px-16 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl mb-4">
              Discover Amazing Products
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Shop the latest trends in electronics, fashion, and more. Free shipping on orders over $100.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div className="absolute inset-0 bg-gradient-to-l from-primary to-transparent" />
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl mb-2">Featured Products</h2>
            <p className="text-muted-foreground">Hand-picked items just for you</p>
          </div>
          <Link
            href="/products"
            className="text-primary hover:underline flex items-center gap-1"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </div>
          <h3 className="mb-2">Free Shipping</h3>
          <p className="text-muted-foreground text-sm">On orders over $100</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
            <Star className="w-6 h-6 text-primary" />
          </div>
          <h3 className="mb-2">Quality Guarantee</h3>
          <p className="text-muted-foreground text-sm">100% satisfaction guaranteed</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h3 className="mb-2">Secure Payment</h3>
          <p className="text-muted-foreground text-sm">Safe and encrypted transactions</p>
        </div>
      </section>
    </div>
  );
}

