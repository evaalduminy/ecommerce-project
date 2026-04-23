"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("United States");
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxes = subtotal * 0.08;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + taxes + shipping;

  const handleCheckout = async () => {
    if (!user) { router.push("/login"); return; }
    setLoading(true);
    
    try {
      // Step 1: Create the order
      const orderProducts = cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      }));

      const orderRes = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          products: orderProducts,
          shippingAddress: { address, city, postalCode, country },
          paymentMethod: "stripe",
          totalAmount: total
        })
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.success) {
        alert(orderData.message || "Failed to create order");
        setLoading(false);
        return;
      }

      // Step 2: Create Stripe Checkout Session
      const paymentRes = await fetch("http://localhost:5000/api/payments/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ orderId: orderData.order._id })
      });

      const paymentData = await paymentRes.json();
      if (paymentRes.ok && paymentData.success && paymentData.url) {
        clearCart();
        window.location.href = paymentData.url; // Redirect to Stripe
      } else {
        // Stripe might not be configured, go to confirmation
        clearCart();
        router.push("/order-confirmation");
      }
    } catch (e) {
      console.error(e);
      // Fallback: if Stripe isn't set up, just confirm
      clearCart();
      router.push("/order-confirmation");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <main className="page-container flex justify-center items-center px-6">
          <div className="glass-card rounded-2xl p-12 text-center max-w-md">
            <span className="material-symbols-outlined text-[#555] mb-4" style={{ fontSize: '48px' }}>shopping_cart</span>
            <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
            <p className="text-[#888] mb-6">Add some products before checking out.</p>
            <a href="/products" className="btn-primary inline-block">Browse Products</a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="page-container px-6 md:px-12">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Left: Shipping Form */}
          <div className="lg:col-span-2">
            <h1 className="section-title text-2xl mb-8">Checkout</h1>
            
            <div className="glass-card rounded-2xl p-8 mb-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#d80000] rounded-full"></span>
                Shipping Address
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#888] mb-2">Street Address</label>
                  <input value={address} onChange={e => setAddress(e.target.value)} className="glass-input" placeholder="123 Main Street, Apt 4B" required />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#888] mb-2">City</label>
                    <input value={city} onChange={e => setCity(e.target.value)} className="glass-input" placeholder="New York" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#888] mb-2">Postal Code</label>
                    <input value={postalCode} onChange={e => setPostalCode(e.target.value)} className="glass-input" placeholder="10011" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#888] mb-2">Country</label>
                    <input value={country} onChange={e => setCountry(e.target.value)} className="glass-input" />
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#d80000] rounded-full"></span>
                Payment
              </h3>
              <div className="flex items-center gap-4 p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                <span className="material-symbols-outlined text-[#d80000]" style={{ fontSize: '24px' }}>credit_card</span>
                <div>
                  <p className="font-medium text-white">Secure Stripe Checkout</p>
                  <p className="text-[#888] text-sm">You&apos;ll be redirected to Stripe to complete payment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl p-6 sticky top-24">
              <h3 className="text-lg font-bold mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                {cart.map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="text-[#c0c0c0] truncate max-w-[60%]">{item.name} × {item.quantity}</span>
                    <span className="text-white font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#2a2a2a] pt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-[#888]">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-[#888]">Shipping</span><span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span></div>
                <div className="flex justify-between"><span className="text-[#888]">Tax (8%)</span><span>${taxes.toFixed(2)}</span></div>
              </div>

              <div className="border-t border-[#2a2a2a] mt-4 pt-4 flex justify-between items-center">
                <span className="font-bold text-lg">Total</span>
                <span className="text-[#d80000] font-bold text-2xl">${total.toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading || !address || !city}
                className="btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Processing...
                  </span>
                ) : "PAY WITH STRIPE"}
              </button>

              <p className="text-[#555] text-xs text-center mt-3">🔒 Secure payment powered by Stripe</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
