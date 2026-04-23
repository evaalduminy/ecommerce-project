"use client";
import Link from "next/link";
import { Plus, Minus, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function CartPage() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h2 className="text-2xl mb-2 text-white">Your cart is empty</h2>
        <p className="text-[#aaaaaa] mb-6">Add some products to get started!</p>
        <Link
          href="/products"
          className="inline-block bg-[#d80000] text-white px-6 py-3 rounded hover:bg-[#b30000] transition-colors"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-white">Shopping Cart</h1>
        <button
          onClick={clearCart}
          className="text-[#aaaaaa] hover:text-[#d80000] transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.productId} className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6 flex gap-6">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded overflow-hidden shrink-0">
                <img src={item.image || "https://via.placeholder.com/400"} alt={item.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div className="flex items-start justify-between mb-2">
                  <Link href={`/products/${item.productId}`} className="hover:text-[#d80000]">
                    <h3 className="text-xl font-bold text-white">{item.name}</h3>
                  </Link>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="p-1 text-[#aaaaaa] hover:text-[#d80000] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-[#d80000] font-bold text-2xl mb-4">${item.price.toFixed(2)}</p>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-[#333] rounded">
                    <span className="px-4 text-[#aaaaaa]">Qty: {item.quantity}</span>
                  </div>
                  <span className="text-[#aaaaaa] font-medium hidden sm:inline">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-8 sticky top-24">
            <h3 className="text-2xl font-bold text-white border-b border-[#333] pb-4 mb-6">Order Summary</h3>

            <div className="space-y-4 mb-6 text-[#aaaaaa]">
              <div className="flex items-center justify-between">
                <span>Subtotal ({cart.reduce((a,c) => a + c.quantity, 0)} items)</span>
                <span className="text-white">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Estimated Shipping</span>
                <span className="text-white">{totalPrice > 0 ? 'Calculated at checkout' : '$0.00'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Estimated Tax</span>
                <span className="text-white">${(totalPrice * 0.08).toFixed(2)}</span>
              </div>
              
              <div className="border-t border-[#333] mt-6 pt-6 flex justify-between items-center mb-8">
                <span className="text-xl font-bold text-white">Total</span>
                <span className="text-3xl font-bold text-[#d80000]">${(totalPrice * 1.08).toFixed(2)}</span>
              </div>
            </div>

            <Link href="/checkout">
                <button disabled={cart.length === 0} className="w-full bg-[#d80000] text-white font-bold text-lg py-4 rounded hover:bg-[#b30000] transition-colors flex justify-center mb-3 disabled:opacity-50">
                  Proceed to Checkout
                </button>
            </Link>

            <Link
              href="/products"
              className="block text-center text-[#d80000] font-bold hover:text-[#ff3333] mt-4"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


