import { useState, useEffect } from 'react';

export interface CartItem {
  id: string; // unique cart item id (e.g. productId + sizeLabel)
  productId: string;
  name: string;
  sizeLabel: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
}

const STORAGE_CART_KEY = 'malabar_cart_v1';

const listeners: Array<() => void> = [];

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

export function getStoredCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(items));
    emitChange();
  } catch (err) {
    console.error('Failed to save cart to localStorage', err);
  }
}

export function addToCart(item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) {
  const current = getStoredCart();
  const id = `${item.productId}-${item.sizeLabel}`;
  const existingIdx = current.findIndex((c) => c.id === id);

  let updated: CartItem[];
  if (existingIdx !== -1) {
    updated = current.map((c, i) =>
      i === existingIdx ? { ...c, quantity: c.quantity + (item.quantity || 1) } : c
    );
  } else {
    updated = [
      ...current,
      {
        ...item,
        id,
        quantity: item.quantity || 1
      }
    ];
  }
  saveCart(updated);
}

export function updateCartQuantity(id: string, delta: number) {
  const current = getStoredCart();
  const updated = current
    .map((item) => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    })
    .filter(Boolean) as CartItem[];

  saveCart(updated);
}

export function removeFromCart(id: string) {
  const current = getStoredCart();
  const updated = current.filter((item) => item.id !== id);
  saveCart(updated);
}

export function clearCart() {
  saveCart([]);
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(getStoredCart);

  useEffect(() => {
    const handleUpdate = () => {
      setCart(getStoredCart());
    };

    listeners.push(handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      const idx = listeners.indexOf(handleUpdate);
      if (idx !== -1) listeners.splice(idx, 1);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    cart,
    totalItems,
    totalAmount,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart
  };
}

