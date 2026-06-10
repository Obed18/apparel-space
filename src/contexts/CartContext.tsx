import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export interface CartItem {
  product_id: string;
  variant_id?: string;
  quantity: number;
  name: string;
  variant_title?: string;
  sku?: string;
  price: number; // cents
  image?: string;
  handle?: string;
}

interface CartContextType {
  cart: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (product_id: string, variant_id?: string) => void;
  updateQuantity: (product_id: string, variant_id: string | undefined, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  count: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "ecom_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setCart(JSON.parse(stored));
    } catch {}
  }, []);

  const persist = (next: CartItem[]) => {
    setCart(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const addToCart = useCallback((item: Omit<CartItem, "quantity">, quantity = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (i) => i.product_id === item.product_id && i.variant_id === item.variant_id
      );
      let next: CartItem[];
      if (idx >= 0) {
        next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
      } else {
        next = [...prev, { ...item, quantity }];
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
    setIsOpen(true);
  }, []);

  const removeFromCart = useCallback((product_id: string, variant_id?: string) => {
    setCart((prev) => {
      const next = prev.filter(
        (i) => !(i.product_id === product_id && i.variant_id === variant_id)
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const updateQuantity = useCallback(
    (product_id: string, variant_id: string | undefined, quantity: number) => {
      setCart((prev) => {
        const next = prev
          .map((i) =>
            i.product_id === product_id && i.variant_id === variant_id
              ? { ...i, quantity: Math.max(1, quantity) }
              : i
          )
          .filter((i) => i.quantity > 0);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    []
  );

  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const count = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
