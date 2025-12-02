import { headers } from "next/headers";
import "server-only";

import { auth } from "@/lib/auth"; // path to your Better Auth server instance

export const getSession = async () =>
  await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
