"use server";

import { updateTag } from "next/cache";

import type { UpdateCommentPayload } from "@/services/comment/type";
import type { ActionResult } from "@/types/actions";

import { CacheKeys } from "@/constant/cacheKeys";
import { validator } from "@/validations";

import { updateComment as updateCommentDAL } from "../dal/mutation";
import { UpdateCommentSchema } from "../validations";

export const updateComment = async (
  id: string,
  data: unknown,
): Promise<ActionResult<UpdateCommentPayload>> => {
  const {
    success: validationSuccess,
    errors,
    output,
  } = validator(UpdateCommentSchema, data);

  if (!validationSuccess) {
    return {
      success: validationSuccess,
      message: "خطای اعتبار سنجی",
      errors,
    };
  }

  try {
    const { success } = await updateCommentDAL(id, output);
    updateTag(CacheKeys.comment);
    return {
      success,
      message: success
        ? "نظر با موفقیت به روزرسانی شد"
        : "خطایی در به روزرسانی نظر رخ داد",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "خطایی در به روزرسانی نظر رخ داد",
    };
  }
};
