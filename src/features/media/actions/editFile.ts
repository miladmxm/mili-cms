"use server";

import { updateTag } from "next/cache";

import type { FileMeta } from "@/features/type";
import type { ActionResult } from "@/types/actions";

import { updateMediaMeta } from "@/repositories/media.repo";
import { validator } from "@/validations";

import { EditFileDataSchema } from "../validations";

export const editFileMeta = async (
  id: string,
  fileData: Partial<FileMeta>,
): Promise<ActionResult<{ id: string }>> => {
  const { output, success } = validator(EditFileDataSchema, fileData);
  if (!success) {
    return { success, message: "validation error" };
  }
  try {
    await updateMediaMeta(id, output);
    updateTag("medias");
    updateTag(`media-${id}`);
    return { success };
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
