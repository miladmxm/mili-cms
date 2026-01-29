import type { Editor } from "@tiptap/core";

import { ScrollArea, ScrollBar } from "@/components/dashboard/ui/scroll-area";

import Additional from "./additional";
import Alignments from "./alignments";
import BlockFormat from "./bock-format";
import Clear from "./clear";
import ColorPicker, { BackGroundColorPicker } from "./color";
import FontFormat from "./font-format";
import FontSize from "./font-size";
import HorizontalRule from "./horizontalRule";
import AddImage from "./image";
import AddLink from "./link";
import UnsetAll from "./unsetAll";

export const HeaderTools = () => {
  return (
    <ScrollArea dir="rtl" className="w-full min-w-0">
      <div className="flex gap-2 items-stretch">
        <FontFormat />
        <BlockFormat />
        <FontSize />
        <AddLink />
        <UnsetAll />
        <ColorPicker />
        <BackGroundColorPicker />
        <HorizontalRule />
        <Alignments />
        <AddImage />
        <Additional />
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
