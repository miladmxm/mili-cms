"use server";

import { updateTag } from "next/cache";

import type { ActionResult } from "@/types/actions";

import { CacheKeys } from "@/constant/cacheKeys";

import { deletePortfolio } from "../dal/mutation";

export const deletePortfolioAction = async (
  id: string,
): Promise<ActionResult<unknown>> => {
  try {
    const { success } = await deletePortfolio(id);
    if (!success) return { success, message: "خطا در حذف نمونه‌کار" };
    updateTag(CacheKeys.portfolio);
    return { success: true, message: "با موفقیت حذف شد" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "در حذف نمونه‌کار مشکلی رخ داد" };
  }
};
