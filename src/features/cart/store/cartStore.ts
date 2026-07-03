import { create } from "zustand";

import type { CartItem } from "@/services/cart/type";

interface CartActions {
  setItems: (items: CartItem[]) => void;
  addItemOptimistic: (item: CartItem) => void;
  updateQuantityOptimistic: (itemId: string, quantity: number) => void;
  removeItemOptimistic: (itemId: string) => void;
  clearCart: () => void;
  setLoading: (loading: boolean) => void;
}

interface CartState extends CartActions {
  items: CartItem[];
  loading: boolean;
  itemCount: number;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  loading: false,
  itemCount: 0,

  setItems: (items) =>
    set({
      items,
      itemCount: items.reduce((acc, item) => acc + item.quantity, 0),
    }),

  addItemOptimistic: (item) =>
    set((state) => {
      const existingIndex = state.items.findIndex(
        (i) =>
          i.productId === item.productId && i.metadataId === item.metadataId,
      );

      if (existingIndex >= 0) {
        const updated = [...state.items];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + item.quantity,
        };
        return {
          items: updated,
          itemCount: updated.reduce((acc, i) => acc + i.quantity, 0),
        };
      }

      const updated = [...state.items, item];
      return {
        items: updated,
        itemCount: updated.reduce((acc, i) => acc + i.quantity, 0),
      };
    }),

  updateQuantityOptimistic: (itemId, quantity) =>
    set((state) => {
      const updated = state.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item,
      );
      return {
        items: updated,
        itemCount: updated.reduce((acc, i) => acc + i.quantity, 0),
      };
    }),

  removeItemOptimistic: (itemId) =>
    set((state) => {
      const updated = state.items.filter((item) => item.id !== itemId);
      return {
        items: updated,
        itemCount: updated.reduce((acc, i) => acc + i.quantity, 0),
      };
    }),

  clearCart: () => set({ items: [], itemCount: 0 }),

  setLoading: (loading) => set({ loading }),
}));
