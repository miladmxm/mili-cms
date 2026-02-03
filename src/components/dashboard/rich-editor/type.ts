import type { JSONContent } from "@tiptap/react";
import type { RefObject } from "react";

export type Tags = { name: string; id: string }[];
export type RichEditorHandlerRef = RefObject<{
  getHTML: () => string;
  getProceMirror: JSONContent;
  clear: () => void;
} | null>;
