import { create } from "zustand";

interface MobileMenuState {
  open: boolean;
}

interface MegaMenuAction {
  setOpen: (open: boolean) => void;
}

export const useMobileMenuStore = create<MegaMenuAction & MobileMenuState>(
  (set) => ({
    open: false,
    setOpen: (open) => set({ open }),
  }),
);
