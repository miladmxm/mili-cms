"use client";

import type { PropsWithChildren } from "react";

import { createContext, use, useMemo } from "react";

import type { Address } from "@/services/shipping/type";

interface CheckoutContextState {
  address: Promise<Address[]>;
}

const CheckoutContext = createContext<CheckoutContextState | undefined>(
  undefined,
);
CheckoutContext.displayName = "CheckoutContext";

const CheckoutContextProvider = ({
  address,
  children,
}: PropsWithChildren<CheckoutContextState>) => {
  const value = useMemo<CheckoutContextState>(() => ({ address }), [address]);
  return <CheckoutContext value={value}>{children}</CheckoutContext>;
};

export default CheckoutContextProvider;

export const useCheckoutContext = () => {
  const checkoutCTX = use(CheckoutContext);
  if (!checkoutCTX) throw new Error("Missing Provider in the tree");
  return checkoutCTX;
};
