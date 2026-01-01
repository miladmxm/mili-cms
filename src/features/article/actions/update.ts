"use server";

import { updateTag } from "next/cache";

import type { ActionResult } from "@/types/actions";

import { validator } from "@/validations";

import type { UpdateStatus } from "../validations/updateSchema";

import { updateStatus } from "../dal/mutation";
import { UpdateStatusSchema } from "../validations/updateSchema";

export const updateArticleStatus = async (
  id: string,
  status: unknown,
): Promise<ActionResult<{ status: UpdateStatus }>> => {
  const { errors, output, success } = validator(UpdateStatusSchema, { status });
  if (!success) {
    return { success, message: "خطای اعتبارسنجی", errors };
  }
  try {
    await updateStatus(id, output.status);
    updateTag("articles");
    return { success, message: "ویرایش انجام شد" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "خطا در ویرایش" };
  }
};
