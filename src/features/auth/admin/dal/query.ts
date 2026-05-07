import "server-only";

import { getSession } from "@/lib/auth";

export const getCurrentUser = async () => {
  const res = await getSession();

  if (res) {
    return res.user;
  }
};
