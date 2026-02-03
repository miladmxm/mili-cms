import type { Content, JSONContent } from "@tiptap/react";

import { useEditor } from "@tiptap/react";
import { useImperativeHandle } from "react";

import type { RichEditorHandlerRef } from "./type";

import { extensions } from "./extensions";

export const useRichEditor = ({
  ref,
  onUpdate,
  content,
}: {
  ref?: RichEditorHandlerRef;
  onUpdate?: (content: JSONContent) => void;
  content?: Content;
}) => {
  const editor = useEditor({
    immediatelyRender: false,
    textDirection: "auto",
    onUpdate: ({ editor: e }) => {
      if (onUpdate) onUpdate(e.getJSON());
    },
    extensions,
    content,
  });
  useImperativeHandle(ref, () => ({
    clear() {
      editor?.commands.clearContent();
    },
    getHTML() {
      if (!editor) return "";
      return editor.getHTML();
    },
    getProceMirror() {
      return editor?.getJSON();
    },
  }));

  return { editor };
};
