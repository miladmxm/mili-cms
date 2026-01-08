import type { FileMeta, SaveFile } from "@/services/media/type";

import { dalDbOperation, dalRequireAuth } from "@/dal/helpers";
import * as mediaService from "@/services/media";
import "server-only";

export const saveFile = async (fileData: SaveFile) => {
  return dalRequireAuth(
    () => dalDbOperation(() => mediaService.uploadAndSaveFile(fileData)),
    { media: ["upload"] },
  );
};

export const removeFile = async (id: string) => {
  return dalRequireAuth(
    () => dalDbOperation(() => mediaService.deleteFile(id)),
    {
      media: ["delete"],
    },
  );
};

export const updateFileData = async (id: string, data: FileMeta) => {
  return dalRequireAuth(
    () => dalDbOperation(() => mediaService.updateFileMeta(id, data)),
    { media: ["update"] },
  );
};
