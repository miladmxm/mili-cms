"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";

import type { ActionResult } from "@/types/actions";

import { CacheKeys } from "@/constant/cacheKeys";
import { getSession } from "@/lib/auth";
import { validator } from "@/validations";

import type { CreatePortfolioInput } from "../validations/schema";

import { createPortfolio } from "../dal/mutation";
import { CreatePortfolioSchema } from "../validations/schema";

export const createPortfolioAction = async (
  inputData: unknown,
): Promise<ActionResult<Partial<CreatePortfolioInput>>> => {
  const session = await getSession();
  if (!session) redirect("/");
  const {
    errors,
    output,
    success: successValidation,
  } = validator(CreatePortfolioSchema, inputData);

  if (!successValidation) {
    return { success: successValidation, message: "خطای اعتبارسنجی", errors };
  }

  try {
    const createdArticleOutput = await createPortfolio({
      ...output,
      thumbnailId: output.thumbnail,
    });

    if (!createdArticleOutput.success) {
      return { success: false, message: "خطا در ایجاد نمونه‌کار" };
    }

    updateTag(CacheKeys.portfolio);
    return {
      success: successValidation,
      message: "نمونه‌کار با موفقیت ایجاد شد",
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "خطا در ایجاد نمونه‌کار" };
  }
};
