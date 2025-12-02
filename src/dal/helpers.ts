import { DrizzleQueryError } from "drizzle-orm";
import { redirect } from "next/navigation";
import "server-only";

import type { user as userTable } from "@/db/drizzle/schemas";

import { getSession } from "@/features/auth/dal/query";

import type { DalError, DalReturn, UserRole } from "./types";

import {
  createErrorReturn,
  createSuccessReturn,
  ThrowableDalError,
} from "./types";

export function dalLoginRedirect<T, E extends DalError>(
  dalReturn: DalReturn<T, E>,
) {
  if (dalReturn.success) return dalReturn;
  if (dalReturn.error.type === "no-user") return redirect("/admin/login");

  return dalReturn as DalReturn<T, Exclude<E, { type: "no-user" }>>;
}

export function dalUnauthorizedRedirect<T, E extends DalError>(
  dalReturn: DalReturn<T, E>,
  redirectPath: Parameters<typeof redirect>[0] = "/",
) {
  if (dalReturn.success) return dalReturn;
  if (dalReturn.error.type === "no-access") return redirect(redirectPath);

  return dalReturn as DalReturn<T, Exclude<E, { type: "no-access" }>>;
}

export function dalThrowError<T, E extends DalError>(
  dalReturn: DalReturn<T, E>,
) {
  if (dalReturn.success) return dalReturn;

  throw dalReturn.error;
}

export function dalVerifySuccess<T, E extends DalError>(
  dalReturn: DalReturn<T, E>,
  {
    unauthorizedRedirectPath,
  }: { unauthorizedRedirectPath?: Parameters<typeof redirect>[0] } = {},
): T {
  const res = dalThrowError(
    dalUnauthorizedRedirect(
      dalLoginRedirect(dalReturn),
      unauthorizedRedirectPath,
    ),
  );
  return res.data;
}

export async function dalRequireAuth<T, E extends DalError>(
  operation: (user: typeof userTable.$inferSelect) => Promise<DalReturn<T, E>>,
  { allowedRoles }: { allowedRoles?: UserRole[] } = {},
) {
  const session = await getSession();

  if (!session) {
    return createErrorReturn({ type: "no-user" });
  }
  if (allowedRoles && !allowedRoles.includes(session.user.role)) {
    return createErrorReturn({ type: "no-access" });
  }

  return operation(session.user);
}

export async function dalDbOperation<T>(operation: () => Promise<T>) {
  try {
    const data = await operation();
    return createSuccessReturn(data);
  } catch (e) {
    if (e instanceof ThrowableDalError) {
      return createErrorReturn(e.dalError);
    }
    if (e instanceof DrizzleQueryError) {
      return createErrorReturn({ type: "drizzle-error", error: e });
    }
    return createErrorReturn({ type: "unknown-error", error: e });
  }
}

export function dalFormatErrorMessage(error: DalError) {
  const type = error.type;

  switch (error.type) {
    case "no-user":
      return "You must be logged in to perform this action.";
    case "no-access":
      return "You do not have permission to perform this action.";
    case "drizzle-error":
      return `A database error occurred`;
    case "unknown-error":
      return `An unknown error occurred`;
    default:
      throw new Error(`Unhandled error type: ${type as never}`);
  }
}
