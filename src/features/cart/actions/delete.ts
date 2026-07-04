"use server";

import { updateTag } from "next/cache";

import { CacheKeys } from "@/constant/cacheKeys";
import * as cartMutation from "@/features/cart/dal/mutation";
import { getSession } from "@/lib/auth";

export const removeFromCartAction = async (itemId: string) => {
  const session = await getSession();

  if (!session?.user?.id) {
    return { success: false, error: "لطفا ابتدا وارد حساب خود شوید" };
  }

  try {
    await cartMutation.removeFromCart(itemId);
    updateTag(`${CacheKeys.cart}-${session.user.id}`);

    return { success: true };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "خطا در حذف از سبد خرید",
    };
  }
};
