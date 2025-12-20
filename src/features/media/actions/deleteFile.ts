"use server";

import { revalidateTag } from "next/cache";

import type { ActionResult } from "@/types/actions";

import { removeFile } from "../dal/mutation";

export const deleteFile = async (
  id: string,
): Promise<ActionResult<{ id: string }>> => {
  // todo access check
  try {
    await removeFile(id);
    revalidateTag("media", "");
    return { success: true };
  } catch (error) {
    if (error instanceof Error)
      return { success: false, message: error.message };
    return { success: false, message: "unkown error " };
  }
};
