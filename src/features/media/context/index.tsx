"use client";
import type { PropsWithChildren } from "react";

import { createContext, use, useMemo } from "react";

import type { MediaContextKey, MediaContextState } from "./types";

const MediaContext = createContext<MediaContextState | undefined>(undefined);
MediaContext.displayName = "MediaContext";

export const useMediaContext = (key: MediaContextKey) => {
  const media = use(MediaContext);
  if (!media) throw new Error("media context not provided");
  const selectedMedia = media.media[key];
  if (!selectedMedia) throw new Error("media context not provided");
  return selectedMedia;
};

const MediaContextProvider = ({
  media,
  children,
}: PropsWithChildren<MediaContextState>) => {
  const values = useMemo(() => ({ media }), [media]);
  return <MediaContext value={values}>{children}</MediaContext>;
};

export default MediaContextProvider;
