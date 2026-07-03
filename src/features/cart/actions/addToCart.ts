"use server";

import * as cartMutation from "@/features/cart/dal/mutation";
import { validator } from "@/validations";

import { AddToCartInputSchema } from "../validations";

export const addToCartAction = async (input: unknown) => {
  // const session = await getSession();

  // if (!session?.user?.id) {
  //   return { success: false, error: "لطفا ابتدا وارد حساب خود شوید" };
  // }
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
    return { success: true };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "خطا در افزودن به سبد خرید",
    };
  }
};

export const updateCartItemQuantity = async (
  itemId: string,
  quantity: number,
) => {
  // const session = await getSession();

  // if (!session?.user?.id) {
  //   return { success: false, error: "لطفا ابتدا وارد حساب خود شوید" };
  // }

  try {
    await cartMutation.updateCartItem({
      itemId,
      quantity,
    });
    return { success: true };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "خطا در بروزرسانی سبد خرید",
    };
  }
};

export const removeFromCart = async (itemId: string) => {
  // const session = await getSession();

  // if (!session?.user?.id) {
  //   return { success: false, error: "لطفا ابتدا وارد حساب خود شوید" };
  // }

  try {
    await cartMutation.removeFromCart(itemId);
    return { success: true };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "خطا در حذف از سبد خرید",
    };
  }
};
