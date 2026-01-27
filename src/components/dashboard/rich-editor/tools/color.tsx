import { useCurrentEditor } from "@tiptap/react";
import { BaselineIcon, PaintBucketIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/dashboard/ui/button";
import { Label } from "@/components/dashboard/ui/label";

const ColorPicker = () => {
  const [color, setColor] = useState<string>("");
  const { editor } = useCurrentEditor();
  useEffect(() => {
    if (!editor) return;
    const update = () => {
      const nodeColor = editor.getAttributes("textStyle").color;
      if (nodeColor) {
        setColor(nodeColor);
      } else {
        setColor("");
      }
    };
    editor.on("selectionUpdate", update);
    editor.on("transaction", update);

    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor]);
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  if (!editor) return;
  const handleChangeColor = (value: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      editor.chain().focus().setColor(value).run();
      setColor(value);
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
          {/* <PaletteIcon /> */}
          <BaselineIcon />
        </Label>
      </Button>
    </div>
  );
};
// todo fix background
export const BackGroundColorPicker = () => {
  const [color, setColor] = useState<string>("");
  const { editor } = useCurrentEditor();
  useEffect(() => {
    if (!editor) return;
    const update = () => {
      const nodeColor = editor.getAttributes("textStyle").color;
      if (nodeColor) {
        setColor(nodeColor);
      } else {
        setColor("");
      }
    };
    editor.on("selectionUpdate", update);
    editor.on("transaction", update);

    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor]);
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  if (!editor) return;
  const handleChangeColor = (value: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      editor.chain().focus().setHighlight({ color: "#330000" }).run();

      setColor(value);
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
