"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  loading: boolean;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: async () => {},
  removeFromCart: async () => {},
  clearCart: async () => {},
  loading: true,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      const localCart = localStorage.getItem("cart");
      if (localCart) {
        setCart(JSON.parse(localCart));
      }
      setLoading(false);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/cart", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success && data.cart) {
        const items = data.cart.products.map((i: any) => ({
          productId: i.productId?._id || i.productId,
          name: i.productId?.name || "Product", // depends on populate
          price: i.price,
          quantity: i.quantity,
          image: i.productId?.images?.[0] || "",
        }));
        setCart(items);
      }
    } catch (e) {
      console.error("Failed to fetch cart", e);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      let newCart;
      if (existing) {
        newCart = prev.map((i) =>
          i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        newCart = [...prev, item];
      }
      if (!user) {
        localStorage.setItem("cart", JSON.stringify(newCart));
      }
      return newCart;
    });

    if (user) {
      try {
        await fetch("http://localhost:5000/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          }),
        });
      } catch (e) {
        console.error("Failed to push to cart API", e);
      }
    }
  };

  const removeFromCart = async (productId: string) => {
      setCart((prev) => {
          const newCart = prev.filter(i => i.productId !== productId);
          if (!user) {
              localStorage.setItem("cart", JSON.stringify(newCart));
          }
          return newCart;
      });
      if (user) {
        try {
          await fetch(`http://localhost:5000/api/cart/${productId}`, {
            method: "DELETE",
            credentials: "include"
          });
        } catch (e) {}
      }
  };

  const clearCart = async () => {
    setCart([]);
    if (!user) {
        localStorage.setItem("cart", JSON.stringify([]));
    }
    if (user) {
      try {
        await fetch(`http://localhost:5000/api/cart`, {
          method: "DELETE",
          credentials: "include"
        });
      } catch (e) {}
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, loading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
