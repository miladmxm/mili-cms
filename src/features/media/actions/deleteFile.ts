"use server";

import { updateTag } from "next/cache";

import type { ActionResult } from "@/types/actions";

import { CacheKeys } from "@/constant/cacheKeys";

import { removeFile } from "../dal/mutation";

export const deleteFile = async (
  id: string,
): Promise<ActionResult<{ id: string }>> => {
  // todo access check
  try {
    await removeFile(id);
    updateTag(CacheKeys.medias);
    return { success: true };
  } catch (error) {
    if (error instanceof Error)
      return { success: false, message: error.message };
    return { success: false, message: "unkown error" };
  }
};
