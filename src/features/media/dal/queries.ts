import "server-only";

import type { MediaTypes } from "@/services/media/type";

import {
  dalDbOperation,
  dalRequireAuth,
  dalVerifySuccess,
} from "@/dal/helpers";
import { ThrowableDalError } from "@/dal/types";
import * as mediaService from "@/services/media";

export const getMediasByType = async (types: MediaTypes[]) => {
  const medias = dalVerifySuccess(
    await dalRequireAuth(
      () => dalDbOperation(() => mediaService.getMediasByTypes(types)),
      { media: ["read"] },
    ),
  );
  return medias;
};

export const getMedias = async () => {
  const medias = dalVerifySuccess(
    await dalRequireAuth(() => dalDbOperation(mediaService.getMedias), {
      media: ["read"],
    }),
  );
  return medias;
};

export const getMedia = async (id: string) => {
  const media = dalVerifySuccess(
    await dalRequireAuth(
      () => dalDbOperation(() => mediaService.getMedia(id)),
      {
        media: ["read"],
      },
    ),
  );
  if (!media) throw new ThrowableDalError({ type: "not-found" });
  return media;
};
