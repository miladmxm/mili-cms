import "server-only";

import type { MediaTypes } from "@/services/media/type";
import type { SearchParams } from "@/types/type";

import { LoadMediaOffset } from "@/constant/dashboard";
import {
  dalDbOperation,
  dalRequireAuth,
  dalVerifySuccess,
} from "@/dal/helpers";
import { ThrowableDalError } from "@/dal/types";
import * as mediaService from "@/services/media";
import { getItemFromSearchParam } from "@/utils/getFromSearchParams";

export const getMediasByType = async (
  types: MediaTypes[],
  searchParams?: SearchParams,
) => {
  const page = parseInt(
    getItemFromSearchParam({
      searchParams,
      selectorKey: "page",
      defaultValue: "1",
    }),
    10,
  );
  const media = dalVerifySuccess(
    await dalRequireAuth(
      () =>
        dalDbOperation(() =>
          mediaService.getMediaByTypes(types, {
            limit: LoadMediaOffset * page,
            offset: 0,
          }),
        ),
      { media: ["read"] },
    ),
  );
  return media;
};

export const getMedia = async (searchParams?: SearchParams) => {
  const page = parseInt(
    getItemFromSearchParam({
      searchParams,
      selectorKey: "page",
      defaultValue: "1",
    }),
    10,
  );
  const media = dalVerifySuccess(
    await dalRequireAuth(
      () =>
        dalDbOperation(() =>
          mediaService.getMedia({
            limit: LoadMediaOffset * page,
            offset: 0,
          }),
        ),
      {
        media: ["read"],
      },
    ),
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
