import { create } from "zustand";

interface MobileMenuState {
  open: boolean;
}

export const useMobileMenuStore = create<MobileMenuState>(() => ({
  open: false,
}));

export const setClose = () => useMobileMenuStore.setState({ open: false });
export const setOpen = () => useMobileMenuStore.setState({ open: true });
