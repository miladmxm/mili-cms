import { Suspense } from "react";

import { getSession } from "@/lib/auth";

import Sign from "./sign";

const AuthHandler = async () => {
  const sesstion = await getSession();
  if (sesstion?.session) return null;
  return <Sign />;
};

const AuthContainer = async () => {
  return (
    <Suspense>
      <AuthHandler />
    </Suspense>
  );
};

export default AuthContainer;
