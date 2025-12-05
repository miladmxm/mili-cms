import type { GenericSchema, InferInput } from "valibot";

import { safeParse } from "valibot";

type Errors<T> = Partial<Record<keyof T, string[]>>;

type Validator<T> =
  | {
      success: false;
      errors: Errors<T>;
      output: unknown;
    }
  | {
      success: true;
      output: T;
      errors: undefined;
    };

const normalizeErrors = <T>(
  issues: ReturnType<typeof safeParse>["issues"],
): Errors<T> => {
  if (!issues) return {};
  const errors: Errors<T> = {};
  issues.forEach((issue) => {
    if (issue.path) {
      const fieldName = issue.path[0].key as keyof T;
      const messages = errors[fieldName] ?? [""];
      errors[fieldName] = [...messages, issue.message];
    }
  });
  return errors;
};

export const validator = <T extends GenericSchema, D extends InferInput<T>>(
  schema: T,
  input: unknown,
): Validator<D> => {
  const { success, output, issues } = safeParse<T>(schema, input);
  if (!success) return { success, output, errors: normalizeErrors(issues) };
  return { success: true, output: output as D, errors: issues };
};
