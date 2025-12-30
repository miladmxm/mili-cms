"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";

import type { ActionResult } from "@/types/actions";

import { getSession } from "@/lib/auth";
import { validator } from "@/validations";

import type { CreateArticle } from "../types";

import { createArticle } from "../dal/mutation";
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
    updateTag("articles");
    return { success, message: "مثاله با موفقیت ایجاد شد" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "خطا در ایجاد مقاله" };
  }
};
