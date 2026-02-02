import type { MouseEvent } from "react";

import { useTiptap, useTiptapState } from "@tiptap/react";
import { BaselineIcon, PaintBucketIcon, SquareX } from "lucide-react";
import { useRef } from "react";

import { Button } from "@/components/dashboard/ui/button";
import { Label } from "@/components/dashboard/ui/label";
import { cn } from "@/lib/utils";

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
  const clearColor = (e: MouseEvent<HTMLButtonElement>) => {
    if (!color) return;
    e.preventDefault();
    editor.chain().focus().unsetColor().run();
  };
  return (
    <div className="relative">
      <input
        className="sr-only"
        id="textColorPicker"
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
        onClick={clearColor}
      >
        <Label
          htmlFor="textColorPicker"
          className={cn("cursor-pointer", {
            "hover:[&_.clear]:block hover:[&_.baseLine]:hidden": !!color,
          })}
        >
          <SquareX className="clear hidden" />
          <BaselineIcon className="baseLine" />
        </Label>
      </Button>
    </div>
  );
};

export const BackGroundColorPicker = () => {
  const { editor } = useTiptap();
  const color = useTiptapState((ctx) => {
    const nodeColor = ctx.editor.getAttributes("highlight").color;

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
  const clearColor = (e: MouseEvent<HTMLButtonElement>) => {
    if (!color) return;
    e.preventDefault();
    editor.chain().focus().unsetHighlight().run();
  };
  return (
    <div className="relative">
      <input
        className="sr-only"
        id="highlightColorPicker"
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
        onClick={clearColor}
      >
        <Label
          htmlFor="highlightColorPicker"
          className={cn("cursor-pointer", {
            "hover:[&_.clear]:block hover:[&_.bucket]:hidden": !!color,
          })}
        >
          <PaintBucketIcon className="size-4 bucket" />
          <SquareX className="clear hidden" />
        </Label>
      </Button>
    </div>
  );
};
export default ColorPicker;
