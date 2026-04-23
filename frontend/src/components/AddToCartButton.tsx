"use client";

import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();
  const handleAdd = () => {
    addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images?.[0] || "",
    });
  };

  return (
    <button 
      onClick={handleAdd}
      disabled={product.stock === 0}
      className="w-full py-4 px-6 bg-[#d80000] text-white font-semibold text-lg hover:bg-[#b30000] flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:bg-[#333333] disabled:text-[#aaaaaa] rounded"
    >
      <span className="material-symbols-outlined">shopping_cart</span>
      {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
    </button>
  );
}
