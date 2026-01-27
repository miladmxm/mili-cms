import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useImperativeHandle } from "react";

import type { RichEditorHandlerRef } from "./type";

import { FontSize } from "./extensions/fontSize";

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
    extensions: [
      StarterKit,
      TextStyle,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Color,
      TaskList,
      Highlight.configure({
        multicolor: true,
      }),
      TaskItem.configure({
        nested: true,
      }),
      FontSize,
      Link.configure({ openOnClick: true }),
    ],
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
