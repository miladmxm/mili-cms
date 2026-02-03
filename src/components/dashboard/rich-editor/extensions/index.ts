import type { Extensions } from "@tiptap/react";

import Audio from "@tiptap/extension-audio";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import { TableKit } from "@tiptap/extension-table";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { Gapcursor } from "@tiptap/extensions";
import StarterKit from "@tiptap/starter-kit";

import { FontSize } from "./fontSize";
import IFrame from "./iframe";
import { ImageWithAlign } from "./image";
import { TableCellWithBackground } from "./tableCell";

export const extensions: Extensions = [
  Audio.configure({
    controls: true,
    preload: "metadata",
  }),
  IFrame.configure({ allowFullscreen: true }),
  StarterKit,
  Text,
  TextStyleKit,
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
];
