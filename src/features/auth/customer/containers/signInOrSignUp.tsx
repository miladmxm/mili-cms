"use client";

import DialogWrapper from "../components/dialogWrapper";
import { useAuthStore } from "../store/auth";
import SignIn from "./signIn";
import SignUp from "./signUp";

const SignInOrSignUp = () => {
  const mode = useAuthStore((state) => state.mode);

  return (
    <DialogWrapper title={mode === "signIn" ? "ورود" : "ثبت نام"}>
      {mode === "signIn" ? <SignIn /> : <SignUp />}
    </DialogWrapper>
  );
};

export default SignInOrSignUp;
