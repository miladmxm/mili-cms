"use server";

import { updateTag } from "next/cache";

import type { ActionResult } from "@/types/actions";

import { deleteArticle } from "../dal/mutation";

export const deleteArticleAction = async (
  id: string,
): Promise<ActionResult<unknown>> => {
  try {
    await deleteArticle(id);
    updateTag("articles");
    return { success: true, message: "با موفقیت حذف شد" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "در حذف مقاله مشکلی رخ داد" };
  }
};
