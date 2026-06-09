import { create } from "zustand";

export const authSteps = ["phoneNumber", "password", "verify"] as const;
export type AuthSteps = (typeof authSteps)[number];

interface AuthStoreState {
  isOpenAuthDialog: boolean;
  step: AuthSteps;
}

export const useAuthStore = create<AuthStoreState>(() => ({
  isOpenAuthDialog: false,
  step: "phoneNumber",
}));

export const openAuthDialog = () =>
  useAuthStore.setState({ isOpenAuthDialog: true });
export const closeAuthDialog = () =>
  useAuthStore.setState({ isOpenAuthDialog: false });
export const setAuthStep = (step: AuthSteps) => useAuthStore.setState({ step });
