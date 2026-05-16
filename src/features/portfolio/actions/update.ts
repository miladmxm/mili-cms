"use server";

import { updateTag } from "next/cache";

import type { ActionResult } from "@/types/actions";

import { CacheKeys } from "@/constant/cacheKeys";
import { validator } from "@/validations";

import type { CreatePortfolioInput } from "../validations/schema";

import { updatePortfolio } from "../dal/mutation";
import { CreatePortfolioSchema } from "../validations/schema";

export const updatePortfolioAction = async (
  id: string,
  data: unknown,
): Promise<ActionResult<CreatePortfolioInput>> => {
  const {
    errors,
    output,
    success: successValidation,
  } = validator(CreatePortfolioSchema, data);
  if (!successValidation)
    return { success: successValidation, message: "خطای اعتبار سنجی", errors };

  try {
    const { success } = await updatePortfolio(id, {
      ...output,
      thumbnailId: output.thumbnail,
    });
    if (!success) return { success, message: "خطا در ویرایش نمونه‌کار" };
    updateTag(CacheKeys.portfolio);
    updateTag(`${CacheKeys.portfolio}-${id}`);
    return { success, message: "ویرایش انجام شد" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "خطا در ویرایش" };
  }
};
