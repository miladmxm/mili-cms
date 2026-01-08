import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({});

export const signOut = (onSuccess: () => void) =>
  authClient.signOut({
    fetchOptions: {
      onSuccess,
    },
  });
