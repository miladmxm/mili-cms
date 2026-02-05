"use server";

import { updateTag } from "next/cache";

import type { ActionResult } from "@/types/actions";

import { CacheKeys } from "@/constant/cacheKeys";
import { validator } from "@/validations";

import type { UpdateArticle, UpdateStatus } from "../validations/updateSchema";

import * as articleMutation from "../dal/mutation";
import {
  UpdateArticleSchema,
  UpdateStatusSchema,
} from "../validations/updateSchema";

export const updateArticle = async (
  id: string,
  data: unknown,
): Promise<ActionResult<UpdateArticle>> => {
  const {
    errors,
    output,
    success: successValidation,
  } = validator(UpdateArticleSchema, data);
  if (!successValidation)
    return { success: successValidation, message: "خطای اعتبار سنجی", errors };
  try {
    const { success } = await articleMutation.updateArticle(id, output);
    if (success) return { success, message: "خطا در ویرایش مقاله" };
    updateTag(CacheKeys.articles);
    updateTag(`${CacheKeys.articles}-${id}`);
    return { success, message: "ویرایش انجام شد" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "خطا در ویرایش" };
  }
};

export const updateArticleStatus = async (
  id: string,
  status: unknown,
): Promise<ActionResult<{ status: UpdateStatus }>> => {
  const {
    errors,
    output,
    success: successValidation,
  } = validator(UpdateStatusSchema, { status });
  if (!successValidation) {
    return { success: successValidation, message: "خطای اعتبارسنجی", errors };
  }
  try {
    const { success } = await articleMutation.updateStatus(id, output.status);
    if (!success) return { success, message: "خطا در ویرایش مقاله" };
    updateTag(CacheKeys.articles);
    return { success, message: "ویرایش انجام شد" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "خطا در ویرایش" };
  }
};
