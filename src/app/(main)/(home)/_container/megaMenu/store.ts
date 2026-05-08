import { create } from "zustand";

interface MegaMenuState {
  activeId: string;
}

interface MegaMenuAction {
  setActiveIndex: (id: string) => void;
}

export const useMegaMenuStore = create<MegaMenuAction & MegaMenuState>(
  (set) => ({
    activeId: "",
    setActiveIndex: (id) => set({ activeId: id }),
  }),
);
