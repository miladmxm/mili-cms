import { create } from "zustand";

export interface ShippingState {
  step: number;
  nextStepAction?: () => void;
  isDisabledNextAction: boolean;
  addressId?: string;
  nextButtonLabel: string;
}

export const useShippingStore = create<ShippingState>(() => ({
  step: 1,
  isDisabledNextAction: true,
  nextButtonLabel: "ادامه فرایند خرید",
}));

export const setShippingStep = (step: number) =>
  useShippingStore.setState({ step });

export const setShippingNextStepAction = (
  action: ShippingState["nextStepAction"],
) => useShippingStore.setState({ nextStepAction: action });

export const setShippingNextActionDisable = (disabled: boolean) =>
  useShippingStore.setState({ isDisabledNextAction: disabled });

export const setAddressId = (addressId: string) =>
  useShippingStore.setState({ addressId });
