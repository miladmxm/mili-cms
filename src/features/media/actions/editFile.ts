"use server";

import { updateTag } from "next/cache";

import type { FileMeta } from "@/services/media/type";
import type { ActionResult } from "@/types/actions";

import { CacheKeys } from "@/constant/cacheKeys";
import { validator } from "@/validations";

import { updateFileData } from "../dal/mutation";
import { EditFileDataSchema } from "../validations";

export const editFileMeta = async (
  id: string,
  fileData: Partial<FileMeta>,
): Promise<ActionResult<{ id: string }>> => {
  const { output, success: successValidation } = validator(
    EditFileDataSchema,
    fileData,
  );
  if (!successValidation) {
    return { success: successValidation, message: "validation error" };
  }
  try {
    const { success } = await updateFileData(id, output);
    if (!success) return { success, message: "ویرایش انجام نشد" };
    updateTag(CacheKeys.media);
    updateTag(`${CacheKeys.media}-${id}`);
    return { success: successValidation };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return {
      success: false,
      message: "خطا در احراز هویت",
    };
  }
};
