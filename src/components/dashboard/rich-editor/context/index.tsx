"use client";
import type { PropsWithChildren } from "react";

import { createContext, use, useMemo } from "react";

import type { Media } from "@/services/media/type";

interface RichEditorContext {
  media: Promise<Media[]>;
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
  media,
}: PropsWithChildren & { media: Promise<Media[]> }) => {
  const mediaMemo = useMemo(() => ({ media }), [media]);
  return <RichEditorContext value={mediaMemo}>{children}</RichEditorContext>;
};
export default RichEditorContextProvider;
