import { create } from "zustand";
import { persist } from "zustand/middleware";

export const authSteps = ["phoneNumber", "password", "verify"] as const;
export type AuthSteps = (typeof authSteps)[number];

interface AuthStoreState {
  isOpenAuthDialog: boolean;
  step: AuthSteps;
  phoneNumber: string;
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (_set) => ({
      isOpenAuthDialog: false,
      step: "phoneNumber",
      phoneNumber: "",
    }),
    { name: "auth-sign" },
  ),
);

export const openAuthDialog = () =>
  useAuthStore.setState({ isOpenAuthDialog: true });
export const closeAuthDialog = () =>
  useAuthStore.setState({ isOpenAuthDialog: false });
export const setAuthStep = (step: AuthSteps) => useAuthStore.setState({ step });
export const setPhonenNumber = (phoneNumber: string) =>
  useAuthStore.setState({ phoneNumber });

export const resetAuth = () => {
  useAuthStore.setState(useAuthStore.getInitialState());
  useAuthStore.persist.clearStorage();
};
