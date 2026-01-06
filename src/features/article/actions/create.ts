"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";

import type { ActionResult } from "@/types/actions";

import { CacheKeys } from "@/constant/cacheKeys";
import { getSession } from "@/lib/auth";
import { validator } from "@/validations";

import type { CreateArticle } from "../types";
import type { CreateCategoryOutput } from "../validations/createCategory";

import { createArticle, createCategory } from "../dal/mutation";
import { CreateCategorySchema } from "../validations/createCategory";
import { CreateArticleSchema } from "../validations/createSchema";

export const createArticleAction = async (
  inputData: unknown,
): Promise<ActionResult<Partial<CreateArticle>>> => {
  const session = await getSession();
  if (!session) redirect("/");
  const { errors, output, success } = validator(CreateArticleSchema, inputData);
  if (!success) {
    return { success, message: "خطای اعتبارسنجی", errors };
  }
  try {
    await createArticle({
      ...output,
      authorId: session.user.id,
    });
    updateTag(CacheKeys.articles);
    return { success, message: "مثاله با موفقیت ایجاد شد" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "خطا در ایجاد مقاله" };
  }
};

export const createCategoryAction = async (
  inputData: unknown,
): Promise<ActionResult<CreateCategoryOutput>> => {
  const { errors, output, success } = validator(
    CreateCategorySchema,
    inputData,
  );
  if (!success) {
    return { success, errors, message: "خطای اعتبارسنجی" };
  }
  try {
    await createCategory(output);
    updateTag(CacheKeys.articleCategories);
    return { success, message: "دسته بندی با موفقیت ایجاد شد" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "خطا در ایجاد دسته بندی" };
  }
};
