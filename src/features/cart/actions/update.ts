"use server";

import { updateTag } from "next/cache";

import { CacheKeys } from "@/constant/cacheKeys";
import * as cartMutation from "@/features/cart/dal/mutation";
import { getSession } from "@/lib/auth";

export const updateCartItemQuantity = async (
  itemId: string,
  quantity: number,
) => {
  const session = await getSession();

  if (!session?.user?.id) {
    return { success: false, error: "لطفا ابتدا وارد حساب خود شوید" };
  }

  try {
    await cartMutation.updateCartItem({
      itemId,
      quantity,
    });
    updateTag(`${CacheKeys.cart}-${session.user.id}`);
    return { success: true };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "خطا در بروزرسانی سبد خرید",
    };
  }
};
