import type { DrizzleQueryError } from "drizzle-orm";

export type DalReturn<T, E extends DalError = DalError> =
  | {
      success: false;
      error: E;
    }
  | {
      success: true;
      data: T;
    };

export type DalError =
  | {
      type: "drizzle-error";
      error: DrizzleQueryError;
    }
  | {
      type: "fetch-error";
      status: number;
    }
  | {
      type: "no-access";
    }
  | {
      type: "no-user";
    }
  | {
      type: "not-found";
    }
  | {
      type: "unknown-error";
      error: unknown;
    };

export class ThrowableDalError extends Error {
  dalError: DalError;

  constructor(dalError: DalError) {
    super("ThrowableDalError");
    this.dalError = dalError;
  }
}

export function createSuccessReturn<T>(data: T): DalReturn<T> {
  return { success: true, data };
}

export function createErrorReturn<E extends DalError>(
  error: E,
): DalReturn<never> {
  return { success: false, error };
}
