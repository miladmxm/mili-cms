import { cacheTag } from "next/cache";

import { CacheKeys } from "@/constant/cacheKeys";
import * as fileManager from "@/lib/fileManager";
import * as mediaRepo from "@/repositories/media.repo";
import { getToDayString } from "@/utils/getToDayString";

import type { FileMeta, MediaTypes, SaveFile } from "./type";

import { DTOconvertMediaToRealUrlMedia } from "./dto";

// READ
export const getMediasByTypes = async (types: MediaTypes[]) => {
  "use cache";
  cacheTag(CacheKeys.medias, ...types.map((t) => `media-type-${t}`));

  const medias = await mediaRepo.findMediasByTypes(types);
  return DTOconvertMediaToRealUrlMedia(medias);
};
export const getMedias = async () => {
  "use cache";
  cacheTag(CacheKeys.medias);

  const medias = await mediaRepo.findMedias();
  return DTOconvertMediaToRealUrlMedia(medias);
};

export const checkMediaType = async (id: string, type: MediaTypes) => {
  "use cache: private";
  cacheTag(`${CacheKeys.medias}-${id}`, type);
  const media = await mediaRepo.findMediaByIdAndType(id, type);
  if (!media) throw new Error("not ok");
};
export const getMedia = async (id: string) => {
  "use cache";
  cacheTag(`${CacheKeys.medias}-${id}`);
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
