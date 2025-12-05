"use server";
import { headers } from "next/headers";

import type { ActionResult } from "@/types/actions";

import { auth } from "@/lib/auth";
import { validator } from "@/validations/serverActionValidator";

import type { LoginInput } from "../validations/loginSchema";

import { LoginInputSchema } from "../validations/loginSchema";

export const login = async (
  input: unknown,
): Promise<ActionResult<LoginInput>> => {
  const { output, success, errors } = validator(LoginInputSchema, input);
  if (!success) {
    return { success, errors, message: "Validation Error" };
  }
  console.log(output);
  try {
    const res = await auth.api.signInEmail({
      headers: await headers(),
      body: { ...output, rememberMe: true },
    });
    console.log(res);
    return { success: true };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "نام کاربری یا رمز عبور اشتباه است",
      errors: {},
    };
  }
};
