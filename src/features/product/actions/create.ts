"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";

import type { CreateProduct } from "@/services/product/type";
import type { Rating } from "@/services/type";
import type { ActionResult } from "@/types/actions";

import { CacheKeys } from "@/constant/cacheKeys";
import { getSession } from "@/lib/auth";
import { renameObjectItemInArray } from "@/utils/renameObjectitem";
import { validator } from "@/validations";

import type { CreateCategoryOutput } from "../validations/category.schema";
import type { ProductCommentContentOutput } from "../validations/comment.schema";
import type { CreateOptionInput } from "../validations/option.schema";

import {
  createCategory,
  createComment,
  createOption,
  createProduct,
} from "../dal/mutation";
import { CreateCategorySchema } from "../validations/category.schema";
import { ProductCommentContentSchema } from "../validations/comment.schema";
import { CreateOptionSchema } from "../validations/option.schema";
import { CreateProductSchema } from "../validations/product.schema";

export const createProductAction = async (
  inputData: unknown,
): Promise<ActionResult<CreateProduct>> => {
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

  let { metadata } = output;

  if (output.type === "variable") {
    metadata = renameObjectItemInArray(
      output.metadata,
      "thumbnail",
      "thumbnailId",
    );
  }

  try {
    const createdProductOutput = await createProduct({
      ...output,
      authorId: session.user.id,
      thumbnailId: output.thumbnail,
      metadata,
    } as CreateProduct);

    if (!createdProductOutput.success) {
      return { success: false, message: "خطا در ایجاد محصول" };
    }

    updateTag(CacheKeys.product);
    return { success: successValidation, message: "محصول با موفقیت ایجاد شد" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "خطا در ایجاد محصول" };
  }
};

export const createCategoryAction = async (
  inputData: unknown,
): Promise<ActionResult<CreateCategoryOutput>> => {
  const {
    errors,
    output,
    success: successValidation,
  } = validator(CreateCategorySchema, inputData);

  if (!successValidation) {
    return { success: successValidation, errors, message: "خطای اعتبارسنجی" };
  }

  try {
    const { success } = await createCategory({
      ...output,
      thumbnailId: output.thumbnail,
    });
    if (!success) return { success, message: "خطا در ایجاد دسته بندی" };
    updateTag(CacheKeys.productCategories);
    return { success, message: "دسته بندی با موفقیت ایجاد شد" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "خطا در ایجاد دسته بندی" };
  }
};

export const createOptionAction = async (
  inputData: unknown,
): Promise<ActionResult<CreateOptionInput>> => {
  const {
    errors,
    output,
    success: isSuccessValidation,
  } = validator(CreateOptionSchema, inputData);
  if (!isSuccessValidation)
    return { success: false, errors, message: "خطای اعتبار سنجی" };

  try {
    const { success } = await createOption(output);
    if (!success) return { success, message: "خطا در ایجاد ویژگی" };
    updateTag(CacheKeys.productOption);
    return { success: true, message: "ویژگی با موفقیت ایجاد شد" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "خطا در ایجاد ویژگی" };
  }
};

export const createProductComment = async (
  {
    productId,
    isQA,
    parentId,
  }: { productId: string; isQA?: boolean; parentId?: string },
  inputData: unknown,
): Promise<ActionResult<ProductCommentContentOutput>> => {
  const session = await getSession();
  if (!session) redirect("/");
  const {
    errors,
    output,
    success: isSuccessValidation,
  } = validator(ProductCommentContentSchema, inputData);
  if (!isSuccessValidation)
    return { success: false, errors, message: "خطای اعتبار سنجی" };

  try {
    const createdComment = await createComment({
      content: output.content,
      rate: isQA ? (output.rate as Rating | undefined) : undefined,
      productId,
      authorId: session?.user.id,
      isQA,
      parentId,
    });

    if (!createdComment.success) {
      return {
        success: false,
        message: isQA ? "خطا در ایجاد سوال" : "خطا در ایجاد نظر",
      };
    }

    updateTag(`${CacheKeys.productComment}-${productId}`);
    return {
      success: true,
      message: isQA ? "سوال شما با موفقیت ثبت شد" : "نظر شما با موفقیت ثبت شد",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: isQA ? "خطا در ثبت سوال" : "خطا در ثبت نظر",
    };
  }
};
