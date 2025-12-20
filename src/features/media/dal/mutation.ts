import type { MediaTypes } from "@/features/type";

import { deleteFile, writeFile } from "@/lib/fileManager";
import * as mediaRepo from "@/repositories/media.repo";
import { getToDayString } from "@/utils/getToDayString";
import "server-only";

export const saveFile = async ({
  file,
  type,
}: {
  file: File;
  type: MediaTypes;
}) => {
  // todo handle has access
  const path = await writeFile({
    file,
    dir: getToDayString(),
    name: crypto.randomUUID() + file.name.trim(),
    type,
  });
  return await mediaRepo.createMedia({
    type,
    url: path,
    size: file.size,
    meta: { alt: file.name, name: file.name.trim(), title: file.name },
  });
};

export const removeFile = async (id: string) => {
  const { url } = await mediaRepo.deleteMedia(id);
  await deleteFile(url);
};
