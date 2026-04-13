"use server";

import { updateTag } from "next/cache";

import type { ActionResult } from "@/types/actions";

import { CacheKeys } from "@/constant/cacheKeys";

import { deleteCategory, deleteOption, deleteProduct } from "../dal/mutation";

export const deleteProductAction = async (
  id: string,
): Promise<ActionResult<unknown>> => {
  try {
    const { success } = await deleteProduct(id);

    if (!success) return { success, message: "خطا در حذف محصول" };
    updateTag(CacheKeys.product);
    return { success: true, message: "با موفقیت حذف شد" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "در حذف محصول مشکلی رخ داد" };
  }
};
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
    return { success: false, message: "در حذف دسته بندی مشکلی رخ داد" };
  }
};
export const deleteOptionAction = async (
  id: string,
): Promise<ActionResult<unknown>> => {
  try {
    const { success } = await deleteOption(id);
    if (!success) return { success, message: "خطا در حذف ویژگی" };
    updateTag(CacheKeys.productOption);
    return { success: true, message: "با موفقیت حذف شد" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "در حذف ویژگی مشکلی رخ داد" };
  }
};
