import { cacheTag } from "next/cache";

import { CacheKeys } from "@/constant/cacheKeys";
import * as fileManager from "@/lib/fileManager";
import * as mediaRepo from "@/repositories/media.repo";
import { getToDayString } from "@/utils/getToDayString";

import type { FileMeta, MediaTypes, SaveFile } from "./type";

import { DTOconvertMediaToRealUrlMedia } from "./dto";

// READ
export const getMediaByTypes = async (types: MediaTypes[]) => {
  "use cache";
  cacheTag(CacheKeys.media, ...types.map((t) => `media-type-${t}`));

  const media = await mediaRepo.findMediaByTypesAndLimit({ types });
  return DTOconvertMediaToRealUrlMedia(media);
};
export const getMedia = async () => {
  "use cache";
  cacheTag(CacheKeys.media);

  const media = await mediaRepo.findMediaByLimit();
  return DTOconvertMediaToRealUrlMedia(media);
};

export const checkMediaType = async (id: string, type: MediaTypes) => {
  "use cache: private";
  cacheTag(`${CacheKeys.media}-${id}`, type);
  const media = await mediaRepo.findMediaByIdAndType(id, type);
  if (!media) throw new Error("not ok");
};
export const getMediaById = async (id: string) => {
  "use cache";
  cacheTag(`${CacheKeys.media}-${id}`);
  const media = await mediaRepo.findMediaById(id);
  if (!media) return;
  return DTOconvertMediaToRealUrlMedia([media])[0];
};

// CREATE
export const uploadAndSaveFile = async ({ file, type }: SaveFile) => {
  const path = await fileManager.writeFile({
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

// DELETE
export const deleteFile = async (id: string) => {
  const { url } = await mediaRepo.deleteMedia(id);
  return fileManager.deleteFile(url);
};

// UPDATE
export const updateFileMeta = async (id: string, data: FileMeta) => {
  return mediaRepo.updateMediaMeta(id, data);
};
