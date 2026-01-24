import Color from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useImperativeHandle } from "react";

import type { RichEditorHandlerRef, Tags } from "./type";

import { normilizeHtmlWhenUsingTagNode, TagNode } from "./modules/tagNode";

export const useRichEditor = ({
  tags,
  ref,
  onUpdate,
}: {
  tags: Tags;
  ref?: RichEditorHandlerRef;
  onUpdate?: (content: string) => void;
}) => {
  const editor = useEditor({
    immediatelyRender: false,
    textDirection: "auto",
    onUpdate: (e) => {
      if (onUpdate)
        onUpdate(`normilizeHtmlWhenUsingTagNode(e.editor.getHTML())`);
    },
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Link.configure({ openOnClick: true }),
      TagNode(Object.values(tags).map(({ name }) => name)),
    ],
    content: "",
  });
  useImperativeHandle(ref, () => ({
    clear: () => {
      editor?.commands.clearContent();
    },
    getHTML: () => {
      if (!editor) return "";
      return normilizeHtmlWhenUsingTagNode(editor.getHTML()).body.innerHTML;
    },
    getMD: () => {
      return `normilizeHtmlWhenUsingTagNode(editor.getHTML());`;
    },
  }));

  return { editor };
};
