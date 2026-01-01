"use server";

import { updateTag } from "next/cache";

import { validator } from "@/validations";

import { updateStatus } from "../dal/mutation";
import { UpdateStatusSchema } from "../validations/updateSchema";

export const updateArticleStatus = async (id: string, status: unknown) => {
  const { errors, output, success } = validator(UpdateStatusSchema, status);
  if (!success) {
    return { success, message: "خطای اعتبارسنجی", errors };
  }
  try {
    await updateStatus(id, output);
    updateTag("articles");
    return { success, message: "ویرایش انجام شد" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "خطا در ویرایش" };
  }
};
