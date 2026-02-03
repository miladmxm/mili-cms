import { useEditor } from "@tiptap/react";
import { useImperativeHandle } from "react";

import type { RichEditorHandlerRef } from "./type";

import { extensions } from "./extensions";

export const useRichEditor = ({
  ref,
  onUpdate,
}: {
  ref?: RichEditorHandlerRef;
  onUpdate?: (content: string) => void;
}) => {
  const editor = useEditor({
    immediatelyRender: false,
    textDirection: "auto",
    onUpdate: () => {
      if (onUpdate)
        onUpdate(`normilizeHtmlWhenUsingTagNode(e.editor.getHTML())`);
    },
    extensions,
    content: "",
  });
  useImperativeHandle(ref, () => ({
    clear: () => {
      editor?.commands.clearContent();
    },
    getHTML: () => {
      if (!editor) return "";
      return editor.getHTML();
    },
    getMD: () => {
      return `normilizeHtmlWhenUsingTagNode(editor.getHTML());`;
    },
  }));

  return { editor };
};
