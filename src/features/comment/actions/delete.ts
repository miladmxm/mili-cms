"use server";

import { updateTag } from "next/cache";

import type { ActionResult } from "@/types/actions";

import { CacheKeys } from "@/constant/cacheKeys";

import { deleteComment } from "../dal/mutation";

export const deleteCommentAction = async (
  id: string,
): Promise<ActionResult<unknown>> => {
  try {
    const { success } = await deleteComment(id);
    if (!success) return { success, message: "خطا در حذف نظر" };
    updateTag(CacheKeys.comment);
    return { success: true, message: "با موفقیت حذف شد" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "در حذف نظر مشکلی رخ داد" };
  }
};
