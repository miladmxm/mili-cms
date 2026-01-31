import { useTiptap, useTiptapState } from "@tiptap/react";
import { BaselineIcon, PaintBucketIcon } from "lucide-react";
import { useRef } from "react";

import { Button } from "@/components/dashboard/ui/button";
import { Label } from "@/components/dashboard/ui/label";

const ColorPicker = () => {
  const { editor, isReady } = useTiptap();
  const color = useTiptapState((ctx) => {
    const nodeColor = ctx.editor.getAttributes("textStyle").color;
    if (nodeColor && typeof nodeColor === "string") {
      return nodeColor;
    }
    return "";
  });

  const timeoutRef = useRef<NodeJS.Timeout>(null);
  if (!editor || !isReady) return;
  const handleChangeColor = (value: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      editor.chain().focus().setColor(value).run();
    }, 100);
  };
  return (
    <div className="relative">
      <input
        className="sr-only"
        id="colorPicker"
        type="color"
        value={color}
        onChange={(e) => {
          handleChangeColor(e.target.value);
        }}
      />
      <Button
        asChild
        size="icon"
        style={{ color }}
        type="button"
        variant="outline"
      >
        <Label htmlFor="colorPicker">
          <BaselineIcon />
        </Label>
      </Button>
    </div>
  );
};
// todo fix background
export const BackGroundColorPicker = () => {
  const { editor } = useTiptap();
  const color = useTiptapState((ctx) => {
    const nodeColor = ctx.editor.getAttributes("textStyle").color;
    if (nodeColor && typeof nodeColor === "string") {
      return nodeColor;
    }
    return "";
  });
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  if (!editor) return;
  const handleChangeColor = (value: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      editor.chain().focus().setHighlight({ color: value }).run();
    }, 100);
  };
  return (
    <div className="relative">
      <input
        className="sr-only"
        id="colorPicker"
        type="color"
        value={color}
        onChange={(e) => {
          handleChangeColor(e.target.value);
        }}
      />
      <Button
        asChild
        size="icon"
        style={{ backgroundColor: color }}
        type="button"
        variant="outline"
      >
        <Label htmlFor="colorPicker">
          <PaintBucketIcon className="size-4" />
        </Label>
      </Button>
    </div>
  );
};
export default ColorPicker;
