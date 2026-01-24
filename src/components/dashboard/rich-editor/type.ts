import type { RefObject } from "react";

export type Tags = { name: string; id: string }[];
export type RichEditorHandlerRef = RefObject<{
  getHTML: () => string;
  getMD: () => string;
  clear: () => void;
} | null>;
