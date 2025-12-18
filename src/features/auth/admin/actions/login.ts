"use server";

import type { ActionResult } from "@/types/actions";

import { auth } from "@/lib/auth";
import { validator } from "@/validations";

import type { LoginInput } from "../validations/loginSchema";

import { LoginInputSchema } from "../validations/loginSchema";

export const login = async (
  input: unknown,
): Promise<ActionResult<LoginInput>> => {
  const { output, success, errors } = validator(LoginInputSchema, input);
  if (!success) {
    return { success, errors, message: "Validation Error" };
  }
  try {
    await auth.api.signInEmail({
      body: output,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return {
      success: false,
      message: "خطا در احراز هویت",
    };
  }
};
