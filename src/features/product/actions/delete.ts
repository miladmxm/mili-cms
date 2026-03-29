"use server";

import { updateTag } from "next/cache";

import type { ActionResult } from "@/types/actions";

import { CacheKeys } from "@/constant/cacheKeys";

import { deleteCategory } from "../dal/mutation";

// import { deleteArticle, deleteCategory } from "../dal/mutation";

// export const deleteArticleAction = async (
//   id: string,
// ): Promise<ActionResult<unknown>> => {
//   try {
//     const { success } = await deleteArticle(id);
//     if (!success) return { success, message: "خطا در حذف مقاله" };
//     updateTag(CacheKeys.articles);
//     return { success: true, message: "با موفقیت حذف شد" };
//   } catch (error) {
//     console.log(error);
//     return { success: false, message: "در حذف مقاله مشکلی رخ داد" };
//   }
// };
export const deleteCategoryAction = async (
  id: string,
): Promise<ActionResult<unknown>> => {
  try {
    const { success } = await deleteCategory(id);
    if (!success) return { success, message: "خطا در حذف دسته بندی" };
    updateTag(CacheKeys.productCategories);
    return { success: true, message: "با موفقیت حذف شد" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "در حذف مقاله مشکلی رخ داد" };
  }
};
