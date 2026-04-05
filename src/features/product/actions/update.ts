"use server";

import { updateTag } from "next/cache";

import type { ActionResult } from "@/types/actions";

// import type {
//   UpdateArticle,
//   UpdateStatus,
// } from "../validations/product.schema";
import { CacheKeys } from "@/constant/cacheKeys";
import { validator } from "@/validations";

import type { UpdateCategoryOutput } from "../validations/category.schema";
import type { EditOptionInput } from "../validations/option.schema";

import * as productMutation from "../dal/mutation";
import { UpdateCategorySchema } from "../validations/category.schema";
import { EditOptionSchema } from "../validations/option.schema";
// import { UpdateCategorySchema } from "../validations/category.schema";
// import {
//   UpdateArticleSchema,
//   UpdateStatusSchema,
// } from "../validations/product.schema";

// export const updateArticle = async (
//   id: string,
//   data: unknown,
// ): Promise<ActionResult<UpdateArticle>> => {
//   const {
//     errors,
//     output,
//     success: successValidation,
//   } = validator(UpdateArticleSchema, data);
//   if (!successValidation)
//     return { success: successValidation, message: "خطای اعتبار سنجی", errors };
//   try {
//     const { success } = await articleMutation.updateArticle(id, output);
//     if (!success) return { success, message: "خطا در ویرایش مقاله" };
//     updateTag(CacheKeys.articles);
//     updateTag(`${CacheKeys.articles}-${id}`);
//     return { success, message: "ویرایش انجام شد" };
//   } catch (error) {
//     console.log(error);
//     return { success: false, message: "خطا در ویرایش" };
//   }
// };

// export const updateArticleStatus = async (
//   id: string,
//   status: unknown,
// ): Promise<ActionResult<{ status: UpdateStatus }>> => {
//   const {
//     errors,
//     output,
//     success: successValidation,
//   } = validator(UpdateStatusSchema, { status });
//   if (!successValidation) {
//     return { success: successValidation, message: "خطای اعتبارسنجی", errors };
//   }
//   try {
//     const { success } = await articleMutation.updateStatus(id, output.status);
//     if (!success) return { success, message: "خطا در ویرایش مقاله" };
//     updateTag(CacheKeys.articles);
//     updateTag(`${CacheKeys.articles}-${id}`);
//     return { success, message: "ویرایش انجام شد" };
//   } catch (error) {
//     console.log(error);
//     return { success: false, message: "خطا در ویرایش" };
//   }
// };

export const updateCategory = async (
  id: string,
  data: unknown,
): Promise<ActionResult<UpdateCategoryOutput>> => {
  const {
    errors,
    output,
    success: isSuccessValidation,
  } = validator(UpdateCategorySchema, data);
  if (!isSuccessValidation)
    return {
      success: isSuccessValidation,
      errors,
      message: "خطا در اعتبارسنجی",
    };
  try {
    const { success } = await productMutation.updateCategory(id, {
      ...output,
      thumbnailId: output.thumbnail,
    });
    if (success) {
      updateTag(CacheKeys.productCategories);
      return { success: true, message: "با موفقیت ویرایش شد" };
    } else {
      return { success: false, message: "خطا در ویرایش دسته بندی" };
    }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: "خطایی ناشناخته در ویرایش مقاله" };
    }
  }
};

export const updateOptionAction = async (
  id: string,
  data: unknown,
): Promise<ActionResult<EditOptionInput>> => {
  const {
    errors,
    output,
    success: isSuccessValidation,
  } = validator(EditOptionSchema, data);
  if (!isSuccessValidation)
    return {
      success: isSuccessValidation,
      errors,
      message: "خطا در اعتبارسنجی",
    };
  try {
    const { success } = await productMutation.updateOption(id, output);
    if (success) {
      updateTag(`${CacheKeys.productOption}-${id}`);
      return { success: true, message: "با موفقیت ویرایش شد" };
    } else {
      return { success: false, message: "خطا در ویرایش ویژگی" };
    }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: "خطایی ناشناخته در ویرایش رخ داد" };
    }
  }
};
