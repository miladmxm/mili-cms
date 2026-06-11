"use client";

import DialogWrapper from "../components/dialogWrapper";
import SignIn from "./signIn";

const SignInOrSignUp = () => {
  return (
    <DialogWrapper title="ورود یا ثبت نام">
      <SignIn />
    </DialogWrapper>
  );
};

export default SignInOrSignUp;
