import { headers } from "next/headers";
import "server-only";

import type { Permissions } from "@/lib/permisions";

import { auth } from "@/lib/auth";

export const getSession = async () =>
  await auth.api.getSession({
    headers: await headers(),
  });

export const hasAccess = (
  userId: (typeof auth.$Infer)["Session"]["user"]["id"],
  permissions: Partial<Permissions>,
) =>
  auth.api.userHasPermission({
    body: {
      userId,
      permissions,
    },
  });
