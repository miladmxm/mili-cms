import type { Editor } from "@tiptap/core";

import { PaletteIcon } from "lucide-react";

import { Button } from "@/components/dashboard/ui/button";
import { Label } from "@/components/dashboard/ui/label";

const ColorPicker = ({ editor }: { editor: Editor }) => {
  return (
    <>
      <input
        className="sr-only"
        id="colorPicker"
        type="color"
        onChange={(e) => {
          editor.chain().focus().setColor(e.target.value).run();
        }}
      />
      <Button asChild size="icon-sm" type="button" variant="outline">
        <Label htmlFor="colorPicker">
          <PaletteIcon />
        </Label>
      </Button>
    </>
  );
};

export default ColorPicker;
