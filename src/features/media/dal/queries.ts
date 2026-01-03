import { cacheTag } from "next/cache";
import { redirect } from "next/navigation";
import "server-only";

import type { Media, MediaTypes } from "@/features/type";

import env from "@/config/env";
import { ThrowableDalError } from "@/dal/types";
import * as mediaRepo from "@/repositories/media.repo";

export const DTOconvertMediaPathToRealUrl = (medias: Media[]) => {
  return medias.map((media) => {
    media.url = `${env.S3_ENDPOINT}/${env.S3_BUCKET}/${media.url}`;
    return media;
  });
};
export const getMediasByType = async (types: MediaTypes[]) => {
  "use cache";
  cacheTag("media", ...types.map((t) => `media-type-${t}`));

  const medias = await mediaRepo.findMediasByTypes(types);
  return DTOconvertMediaPathToRealUrl(medias);
};
export const getMedias = async () => {
  "use cache";
  cacheTag("media");
  const medias = await mediaRepo.findMedias();

  return DTOconvertMediaPathToRealUrl(medias);
};
export const checkMediaType = async (id: string, type: MediaTypes) => {
  "use cache";
  cacheTag(`media-${id}`);
  const media = await mediaRepo.findMediaByIdAndType(id, type);
  if (!media) throw new ThrowableDalError({ type: "not-found" });
};
export const getMedia = async (id: string) => {
  "use cache";
  cacheTag(`media-${id}`);
  const media = await mediaRepo.findMediaById(id);
  if (!media) redirect("/admin/media");
  return DTOconvertMediaPathToRealUrl([media])[0];
};
