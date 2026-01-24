import type { Editor } from "@tiptap/core";

import { ScrollArea, ScrollBar } from "@/components/dashboard/ui/scroll-area";

import BoldText from "./bold";
import Clear from "./clear";
import CodeText from "./code";
import ColorPicker from "./color";
import Emoji from "./emoji";
import Italic from "./italic";
import AddLink from "./link";
import Lists from "./lists";
import Strike from "./strike";

export const HeaderTools = ({ editor }: { editor: Editor }) => {
  return (
    <ScrollArea dir="rtl" className="w-full min-w-0">
      <div className="flex gap-2 items-stretch">
        <BoldText editor={editor} />
        <Italic editor={editor} />
        <Strike editor={editor} />
        <CodeText editor={editor} />
        <Lists editor={editor} />
        <ColorPicker editor={editor} />
        <AddLink editor={editor} />
        <Emoji editor={editor} />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
export const FooterTools = ({ editor }: { editor: Editor }) => {
  return (
    <div className="flex gap-2 items-stretch">
      <Clear editor={editor} />
    </div>
  );
};
