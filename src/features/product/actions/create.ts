"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";

import type { CreateProduct } from "@/services/product/type";
import type { ActionResult } from "@/types/actions";

import { CacheKeys } from "@/constant/cacheKeys";
import { getSession } from "@/lib/auth";
import { validator } from "@/validations";

import { createProduct } from "../dal/mutation";
import { CreateProductSchema } from "../validations/product.schema";

export const createArticleAction = async (
  inputData: unknown,
): Promise<ActionResult<Partial<CreateProduct>>> => {
  const session = await getSession();
  if (!session) redirect("/");
  const {
    errors,
    output,
    success: successValidation,
  } = validator(CreateProductSchema, inputData);
  if (!successValidation) {
    return { success: successValidation, message: "خطای اعتبارسنجی", errors };
  }
  try {
    const createdArticleOutput = await createProduct({
      ...output,
      authorId: session.user.id,
    });
    if (!createdArticleOutput.success) {
      return { success: false, message: "خطا در ایجاد مقاله" };
    }
    updateTag(CacheKeys.articles);
    return { success: successValidation, message: "مثاله با موفقیت ایجاد شد" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "خطا در ایجاد مقاله" };
  }
};

// export const createCategoryAction = async (
//   inputData: unknown,
// ): Promise<ActionResult<CreateCategoryOutput>> => {
//   const {
//     errors,
//     output,
//     success: successValidation,
//   } = validator(CreateCategorySchema, inputData);

//   if (!successValidation) {
//     return { success: successValidation, errors, message: "خطای اعتبارسنجی" };
//   }

//   try {
//     const { success } = await createCategory(output);
//     if (!success) return { success, message: "خطا در ایجاد دسته بندی" };
//     updateTag(CacheKeys.articleCategories);
//     return { success, message: "دسته بندی با موفقیت ایجاد شد" };
//   } catch (error) {
//     console.log(error);
//     return { success: false, message: "خطا در ایجاد دسته بندی" };
//   }
// };
