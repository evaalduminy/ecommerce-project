"use client";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { Product } from "../../data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      _id: (product as any)._id || product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-colors">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="text-sm">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviews})</span>
          </div>
          <h3 className="mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-2xl text-primary">${product.price}</span>
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
          {!product.inStock && (
            <p className="text-sm text-muted-foreground mt-2">Out of stock</p>
          )}
        </div>
      </div>
    </Link>
  );
}


