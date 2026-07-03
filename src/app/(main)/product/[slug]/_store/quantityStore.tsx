/* eslint-disable react-hooks/refs */
"use client";

import type { PropsWithChildren } from "react";
import type { StoreApi } from "zustand";

import { createContext, use, useRef } from "react";
import { createStore, useStore } from "zustand";

interface QuantityAction {
  setQuantity: (quantity: number) => void;
  increment: () => void;
  decrement: () => void;
}

interface QuantityState extends QuantityAction {
  quantity: number;
}

const QuantityContext = createContext<StoreApi<QuantityState> | null>(null);
QuantityContext.displayName = "QuantityContext";

export const QuantityProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<StoreApi<QuantityState>>(null);

  if (storeRef.current === null) {
    storeRef.current = createStore<QuantityState>((set) => ({
      quantity: 1,
      setQuantity: (quantity) => set({ quantity: Math.max(1, quantity) }),
      increment: () => set((state) => ({ quantity: state.quantity + 1 })),
      decrement: () =>
        set((state) => ({ quantity: Math.max(1, state.quantity - 1) })),
    }));
  }

  return <QuantityContext value={storeRef.current}>{children}</QuantityContext>;
};

export function useQuantityContext<T>(
  selector: (state: QuantityState) => T,
): T {
  const store = use(QuantityContext);
  if (!store) throw new Error("Missing QuantityProvider in the tree");
  return useStore(store, selector);
}
