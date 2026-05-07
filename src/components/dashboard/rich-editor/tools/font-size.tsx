import { useCurrentEditor, useTiptapState } from "@tiptap/react";
import { Minus, Plus } from "lucide-react";

import { Button } from "../../ui/button";
import { ButtonGroup } from "../../ui/button-group";
import { Input } from "../../ui/input";

const DEFAULT_FONT_SIZE = 16;
const MIN_FONT_SIZE = 1;
const MAX_FONT_SIZE = 72;

const FontSize = () => {
  const { editor } = useCurrentEditor();
  const fontSize = useTiptapState((ctx) => {
    const nodeFontSize = ctx.editor.getAttributes("textStyle")?.fontSize;

    if (nodeFontSize && typeof nodeFontSize === "string") {
      const convertFontSizeToNumberFromPX = Number(
        nodeFontSize.replace("px", ""),
      );

      if (!isNaN(convertFontSizeToNumberFromPX)) {
        return convertFontSizeToNumberFromPX;
      }
    }

    return DEFAULT_FONT_SIZE;
  });

  const updateFontSize = (size: number) => {
    if (!editor) return;
    editor.chain().focus().setFontSize(`${size}px`).run();
  };

  return (
    <ButtonGroup className="rtl:flex-row-reverse">
      <Button
        size="icon-sm"
        className="h-full w-8"
        disabled={MIN_FONT_SIZE >= fontSize}
        variant="outline"
        onClick={() => updateFontSize(fontSize - 1)}
      >
        <Minus className="size-3" />
      </Button>
      <Input
        className="h-full w-12 text-center"
        max={MAX_FONT_SIZE}
        min={MIN_FONT_SIZE}
        value={fontSize}
        onChange={(e) =>
          updateFontSize(parseInt(e.target.value, 10) || DEFAULT_FONT_SIZE)
        }
      />
      <Button
        size="icon-sm"
        className="w-8 h-full"
        disabled={fontSize >= MAX_FONT_SIZE}
        variant="outline"
        onClick={() => updateFontSize(fontSize + 1)}
      >
        <Plus className="size-3" />
      </Button>
    </ButtonGroup>
  );
};

export default FontSize;
