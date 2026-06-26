"use server";

import { updateTag } from "next/cache";

import type { ActionResult } from "@/types/actions";

import { CacheKeys } from "@/constant/cacheKeys";
import { validator } from "@/validations";

import type { ReplayCommentOutput } from "../validations";

import { createReplayComment } from "../dal/mutation";
import { ReplayCommentSchema } from "../validations";

export const replayCommentAction = async (
  data: unknown,
): Promise<ActionResult<ReplayCommentOutput>> => {
  const {
    success: validationSuccess,
    errors,
    output,
  } = validator(ReplayCommentSchema, data);
  console.log(data, errors);
  if (!validationSuccess)
    return { success: false, errors, message: "خطای اعتبارسنجی" };

  try {
    const { success } = await createReplayComment(output);
    updateTag(CacheKeys.comment);
    return {
      success,
      message: success ? "با موفقیت پاسخ داده شد" : "خطا در پاسخ به نظر",
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "خطا در پاسخ به نظر" };
  }
};
