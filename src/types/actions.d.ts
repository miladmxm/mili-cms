export type ActionResult<
  T extends unknown | Record<string, unknown>,
  D = undefined,
> =
  | {
      success: false;
      message: string;
      errors?: Partial<Record<keyof T, string[]>>;
    }
  | { success: true; message?: string; errors?: undefined; data?: D };
