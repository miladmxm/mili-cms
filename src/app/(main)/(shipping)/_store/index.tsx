import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type { SendingMethodKey } from "@/constant/appData";

export interface ShippingState {
  step: number;
  nextStepAction?: () => void;
  isDisabledNextAction: boolean;
  addressId?: string;
  nextButtonLabel: string;
  isAddAddress: boolean;
  sendingMethod: SendingMethodKey;
}

export const useShippingStore = create<ShippingState>()(
  devtools(() => ({
    step: 1,
    isDisabledNextAction: true,
    nextButtonLabel: "ادامه فرایند خرید",
    isAddAddress: false,
    sendingMethod: "storeSend",
  })),
);

export const setShippingStep = (step: number) =>
  useShippingStore.setState({ step });

export const setShippingNextStepAction = (
  action: ShippingState["nextStepAction"],
) => useShippingStore.setState({ nextStepAction: action });

export const setShippingNextButtonLabel = (label: string) =>
  useShippingStore.setState({ nextButtonLabel: label });

export const setShippingNextActionDisable = (disabled: boolean) =>
  useShippingStore.setState({ isDisabledNextAction: disabled });

export const setAddressId = (addressId: ShippingState["addressId"]) =>
  useShippingStore.setState({ addressId });

export const setIsAddAddress = (isAddAddress: boolean) =>
  useShippingStore.setState({ isAddAddress });

export const setSendignMethod = (
  sendingMethod: ShippingState["sendingMethod"],
) => useShippingStore.setState({ sendingMethod });
