"use server";

import { updateTag } from "next/cache";

import type { ActionResult } from "@/types/actions";

import { deleteArticle, deleteCategory } from "../dal/mutation";

export const deleteArticleAction = async (
  id: string,
): Promise<ActionResult<unknown>> => {
  try {
    await deleteArticle(id);
    updateTag("article-categories");
    return { success: true, message: "با موفقیت حذف شد" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "در حذف مقاله مشکلی رخ داد" };
  }
};
export const deleteCategoryAction = async (
  id: string,
): Promise<ActionResult<unknown>> => {
  try {
    await deleteCategory(id);
    updateTag("article-categories");
    return { success: true, message: "با موفقیت حذف شد" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "در حذف مقاله مشکلی رخ داد" };
  }
};
