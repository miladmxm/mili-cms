"use client";
import type { PropsWithChildren } from "react";

import { createContext, use, useMemo } from "react";

import type { Media } from "@/services/media/type";

interface RichEditorContext {
  imageMedia: Promise<Media[]>;
  audioMedia: Promise<Media[]>;
}
const RichEditorContext = createContext<RichEditorContext | undefined>(
  undefined,
);
RichEditorContext.displayName = "richEditorContext";

export const useRichEditorContext = () => {
  const richEditor = use(RichEditorContext);
  return richEditor;
};

const RichEditorContextProvider = ({
  children,
  imageMedia,
  audioMedia,
}: PropsWithChildren & {
  imageMedia: Promise<Media[]>;
  audioMedia: Promise<Media[]>;
}) => {
  const mediaMemo = useMemo(
    () => ({ imageMedia, audioMedia }),
    [imageMedia, audioMedia],
  );
  return <RichEditorContext value={mediaMemo}>{children}</RichEditorContext>;
};
export default RichEditorContextProvider;
