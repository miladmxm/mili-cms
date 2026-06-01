import { create } from "zustand";

interface FilterMenuState {
  open: boolean;
}

export const useFilterMenuStore = create<FilterMenuState>(() => ({
  open: false,
}));

export const setCloseFilter = () =>
  useFilterMenuStore.setState({ open: false });
export const setOpenFilter = () => useFilterMenuStore.setState({ open: true });
export const toggleFilterBox = () =>
  useFilterMenuStore.setState({ open: !useFilterMenuStore.getState().open });
