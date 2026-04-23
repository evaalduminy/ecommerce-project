"use client";
import Link from "next/link";
import { Star, ShoppingCart, ArrowLeft, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "../shared/ProductCard";

export function ProductDetailPage({ product: rawProduct, relatedProducts = [] }: { product: any, relatedProducts?: any[] }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!rawProduct) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-white">
        <h2 className="text-2xl mb-4">Product not found</h2>
        <Link href="/products" className="text-[#d80000] hover:underline">
          Back to Products
        </Link>
      </div>
    );
  }

  const product = {
    id: rawProduct._id || rawProduct.id,
    name: rawProduct.name,
    price: rawProduct.price,
    image: rawProduct.images?.[0] || rawProduct.image || "https://via.placeholder.com/400",
    rating: rawProduct.rating || 5.0,
    reviews: rawProduct.reviews || 120,
    inStock: typeof rawProduct.countInStock !== 'undefined' ? rawProduct.countInStock > 0 : true,
    category: rawProduct.category || "Uncategorized",
    description: rawProduct.description || "",
    vendor: rawProduct.vendor || "Vendor",
  };

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <Link href="/products" className="inline-flex items-center gap-2 text-[#aaaaaa] hover:text-[#d80000] mb-8">
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="aspect-square bg-muted rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <div className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm mb-4">
            {product.category}
          </div>
          <h1 className="text-4xl mb-4">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-primary text-primary'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <span>{product.rating}</span>
            <span className="text-muted-foreground">({product.reviews} reviews)</span>
          </div>

          <p className="text-3xl text-primary mb-6">${product.price}</p>

          <p className="text-muted-foreground mb-6 leading-relaxed">
            {product.description}
          </p>

          <div className="bg-card border border-border rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Vendor:</span>
              <span>{product.vendor}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Availability:</span>
              <span className={product.inStock ? 'text-green-500' : 'text-destructive'}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-accent"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="px-6">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:bg-accent"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-3xl mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(rp => {
              const mapped = {
                id: rp._id || rp.id,
                name: rp.name,
                price: rp.price,
                image: rp.images?.[0] || rp.image || "https://via.placeholder.com/400",
                rating: rp.rating || 5.0,
                reviews: rp.reviews || 120,
                inStock: typeof rp.countInStock !== 'undefined' ? rp.countInStock > 0 : true,
                category: rp.category || "Uncategorized",
                description: rp.description || "",
                vendor: rp.vendor || "Vendor",
              };
              return <ProductCard key={mapped.id} product={mapped as any} />;
            })}
          </div>
        </section>
      )}
    </div>
  );
}


