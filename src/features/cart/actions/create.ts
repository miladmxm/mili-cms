"use server";

import { updateTag } from "next/cache";

import { CacheKeys } from "@/constant/cacheKeys";
import * as cartMutation from "@/features/cart/dal/mutation";
import { getSession } from "@/lib/auth";
import { validator } from "@/validations";

import { AddToCartInputSchema } from "../validations";

export const addToCartAction = async (input: unknown) => {
  const session = await getSession();

  if (!session?.user?.id) {
    return { success: false, error: "لطفا ابتدا وارد حساب خود شوید" };
  }

  const { errors, output, success } = validator(AddToCartInputSchema, input);

  if (!success) {
    return {
      success: false,
      error: "برخی موارد به درستی انتخاب نشده اند",
      errors,
    };
  }

  try {
    await cartMutation.addToCart(output);
    console.log("from action add", CacheKeys.cart, session.user.id);
    updateTag(`${CacheKeys.cart}-${session.user.id}`);
    return { success: true };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "خطا در افزودن به سبد خرید",
    };
  }
};
