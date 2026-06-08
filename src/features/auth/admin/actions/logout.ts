"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";

export const logoutAction = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });
};
