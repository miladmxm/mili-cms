import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import { TableKit } from "@tiptap/extension-table";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Gapcursor } from "@tiptap/extensions";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useImperativeHandle } from "react";

import type { RichEditorHandlerRef } from "./type";

import { FontSize } from "./extensions/fontSize";
import { ImageWithAlign } from "./extensions/image";
import { TableCellWithBackground } from "./extensions/tableCell";

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
      Gapcursor,
      ImageWithAlign,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Color,
      TableCellWithBackground,
      TableKit.configure({
        table: {
          resizable: true,
          allowTableNodeSelection: true,
          renderWrapper: false,
        },
      }),
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
