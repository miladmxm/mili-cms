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
  const media = dalVerifySuccess(
    await dalRequireAuth(
      () => dalDbOperation(() => mediaService.getMediaByTypes(types)),
      { media: ["read"] },
    ),
  );
  return media;
};

export const getMedia = async () => {
  const media = dalVerifySuccess(
    await dalRequireAuth(() => dalDbOperation(mediaService.getMedia), {
      media: ["read"],
    }),
  );
  return media;
};

export const getMediaById = async (id: string) => {
  const media = dalVerifySuccess(
    await dalRequireAuth(
      () => dalDbOperation(() => mediaService.getMediaById(id)),
      {
        media: ["read"],
      },
    ),
  );
  if (!media) throw new ThrowableDalError({ type: "not-found" });
  return media;
};
