import { Suspense } from "react";

import { getSession } from "@/lib/auth";

import SignInOrSignUp from "./signInOrSignUp";

const AuthHandler = async () => {
  const sesstion = await getSession();
  if (sesstion?.session) return null;
  return <SignInOrSignUp />;
};

const AuthContainer = async () => {
  return (
    <Suspense>
      <AuthHandler />
    </Suspense>
  );
};

export default AuthContainer;
