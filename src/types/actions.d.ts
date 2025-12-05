export type ActionResult<T extends Record<string, unknown>> =
  | {
      success: false;
      message: string;
      errors: Partial<Record<keyof T, string[]>>;
    }
  | { success: true; message?: string; errors?: undefined };
