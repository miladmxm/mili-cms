import type { ReactNode } from "react";

import type { AuthSteps } from "../store/auth";

import PasswordSignIn from "../components/passwordSignIn";
import PhoneNumberSignIn from "../components/phoneNumberSignIn";
import { useAuthStore } from "../store/auth";

const steps: Partial<Record<AuthSteps, ReactNode>> = {
  phoneNumber: <PhoneNumberSignIn />,
  password: <PasswordSignIn />,
};

const SignIn = () => {
  const step = useAuthStore((state) => state.step);
  return <>{steps[step] || null}</>;
};

export default SignIn;
