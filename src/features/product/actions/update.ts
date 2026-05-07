"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";

import type { CreateProduct } from "@/services/product/type";
import type { ActionResult } from "@/types/actions";

import { CacheKeys } from "@/constant/cacheKeys";
import { getSession } from "@/lib/auth";
import { renameObjectItemInArray } from "@/utils/renameObjectitem";
import { validator } from "@/validations";

import type { UpdateCategoryOutput } from "../validations/category.schema";
import type { EditOptionInput } from "../validations/option.schema";
import type { UpdateProductOutput } from "../validations/product.schema";

import * as productMutation from "../dal/mutation";
import { UpdateCategorySchema } from "../validations/category.schema";
import { EditOptionSchema } from "../validations/option.schema";
import { CreateProductSchema } from "../validations/product.schema";

export const updateProductAction = async (
  id: string,
  data: unknown,
): Promise<ActionResult<UpdateProductOutput>> => {
  const session = await getSession();
  if (!session) redirect("/");
  const {
    errors,
    output,
    success: successValidation,
  } = validator(CreateProductSchema, data);
  if (!successValidation)
    return { success: successValidation, message: "خطای اعتبار سنجی", errors };

  try {
    let { metadata } = output;

    if (output.type === "variable") {
      metadata = renameObjectItemInArray(
        output.metadata,
        "thumbnail",
        "thumbnailId",
      );
    }

    const { success } = await productMutation.updateProduct(id, {
      ...output,
      metadata,
      thumbnailId: output.thumbnail,
      authorId: session.user.id,
    } as CreateProduct);
    updateTag(CacheKeys.product);
    updateTag(`${CacheKeys.product}-${id}`);
    return { success, message: "ویرایش انجام شد" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "خطا در ویرایش" };
  }
};

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
      updateTag(CacheKeys.productOption);
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
