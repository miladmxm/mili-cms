import type { Editor } from "@tiptap/core";

import { ScrollArea, ScrollBar } from "@/components/dashboard/ui/scroll-area";

import BlockFormat from "./bock-format";
import Clear from "./clear";
import FontFormat from "./font-format";

export const HeaderTools = () => {
  return (
    <ScrollArea dir="rtl" className="w-full min-w-0">
      <div className="flex gap-2 items-stretch">
        <FontFormat />
        <BlockFormat />
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
