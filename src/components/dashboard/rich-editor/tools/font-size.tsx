import { useCurrentEditor } from "@tiptap/react";
import { Minus, Plus } from "lucide-react";
import { useEffect, useEffectEvent, useState } from "react";

import { Button } from "../../ui/button";
import { ButtonGroup } from "../../ui/button-group";
import { Input } from "../../ui/input";

const DEFAULT_FONT_SIZE = 16;
const MIN_FONT_SIZE = 1;
const MAX_FONT_SIZE = 72;
const FontSize = () => {
  const { editor } = useCurrentEditor();
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
  const updateFontSize = (size: number) => {
    if (!editor) return;
    editor.chain().focus().setFontSize(`${size}px`).run();
    setFontSize(size);
  };
  const setSelectedNodeFontSize = useEffectEvent(() => {
    if (!editor) return;
    const nodeFontSize = editor.getAttributes("textStyle")?.fontSize;
    if (nodeFontSize && typeof nodeFontSize === "string") {
      const convertFontSizeToNumberFromPX = Number(
        nodeFontSize.replace("px", ""),
      );
      if (!isNaN(convertFontSizeToNumberFromPX)) {
        setFontSize(convertFontSizeToNumberFromPX);
      }
    } else {
      setFontSize(DEFAULT_FONT_SIZE);
    }
  });
  useEffect(() => {
    if (!editor) return;
    const update = () => {
      setSelectedNodeFontSize();
    };
    editor.on("selectionUpdate", update);
    editor.on("transaction", update);

    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor]);

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
