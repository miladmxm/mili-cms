import type { Editor } from "@tiptap/react";

import { useCurrentEditor } from "@tiptap/react";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/dashboard/ui/select";

import Blockquote from "./blockquote";
import Code from "./code";
import HeadingItems from "./headings";
import Lists from "./lists";
import ParagraphItem from "./paragraph";

function getCurrentBlock(editor: Editor) {
  if (editor.isActive("heading", { level: 1 })) return "H1";
  if (editor.isActive("heading", { level: 2 })) return "H2";
  if (editor.isActive("heading", { level: 3 })) return "H3";
  if (editor.isActive("blockquote")) return "quote";
  if (editor.isActive("codeBlock")) return "code";
  if (editor.isActive("orderedList")) return "orderedList";
  if (editor.isActive("bulletList")) return "bulletList";
  if (editor.isActive("taskList")) return "taskList";
  return "paragraph";
}

const BlockFormat = () => {
  const { editor } = useCurrentEditor();
  const [value, setValue] = useState<string>("paragraph");
  useEffect(() => {
    if (!editor) return;
    const update = () => {
      setValue(getCurrentBlock(editor));
    };
    editor.on("selectionUpdate", update);
    editor.on("transaction", update);

    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor]);
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger>
        <SelectValue className="text-xs" />
      </SelectTrigger>
      <SelectContent>
        <ParagraphItem />
        <HeadingItems />
        <Lists />
        <Blockquote />
        <Code />
      </SelectContent>
    </Select>
  );
};

export default BlockFormat;
