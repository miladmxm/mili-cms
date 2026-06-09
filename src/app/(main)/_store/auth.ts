import { create } from "zustand";

interface AuthStoreState {
  isOpenAuthDialog: boolean;
}

export const useAuthStore = create<AuthStoreState>(() => ({
  isOpenAuthDialog: false,
}));

export const openAuthDialog = () =>
  useAuthStore.setState({ isOpenAuthDialog: true });
export const closeAuthDialog = () =>
  useAuthStore.setState({ isOpenAuthDialog: false });
