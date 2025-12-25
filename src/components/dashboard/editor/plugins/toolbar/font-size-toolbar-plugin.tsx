"use client";

import type { BaseSelection } from "lexical";

import {
  $getSelectionStyleValueForProperty,
  $patchStyleText,
} from "@lexical/selection";
import { $getSelection, $isRangeSelection } from "lexical";
import { Minus, Plus } from "lucide-react";
import { useCallback, useState } from "react";

import { useToolbarContext } from "@/components/dashboard/editor/context/toolbar-context";
import { useUpdateToolbarHandler } from "@/components/dashboard/editor/editor-hooks/use-update-toolbar";
import { Button } from "@/components/dashboard/ui/button";
import { ButtonGroup } from "@/components/dashboard/ui/button-group";
import { Input } from "@/components/dashboard/ui/input";

const DEFAULT_FONT_SIZE = 16;
const MIN_FONT_SIZE = 1;
const MAX_FONT_SIZE = 72;

export function FontSizeToolbarPlugin() {
  const style = "font-size";
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);

  const { activeEditor } = useToolbarContext();

  const $updateToolbar = (selection: BaseSelection) => {
    if ($isRangeSelection(selection)) {
      const value = $getSelectionStyleValueForProperty(
        selection,
        "font-size",
        `${DEFAULT_FONT_SIZE}px`,
      );
      setFontSize(parseInt(value, 10) || DEFAULT_FONT_SIZE);
    }
  };

  useUpdateToolbarHandler($updateToolbar);

  const updateFontSize = useCallback(
    (newSize: number) => {
      const size = Math.min(Math.max(newSize, MIN_FONT_SIZE), MAX_FONT_SIZE);
      activeEditor.update(() => {
        const selection = $getSelection();
        if (selection !== null) {
          $patchStyleText(selection, {
            [style]: `${size}px`,
          });
        }
      });
      setFontSize(size);
    },
    [activeEditor, style],
  );
  return (
    <ButtonGroup className="rtl:flex-row-reverse">
      <Button
        size="icon-sm"
        className="!size-8"
        disabled={fontSize <= MIN_FONT_SIZE}
        variant="outline"
        onClick={() => updateFontSize(fontSize - 1)}
      >
        <Minus className="size-3" />
      </Button>
      <Input
        className="!h-8 w-12 text-center"
        max={MAX_FONT_SIZE}
        min={MIN_FONT_SIZE}
        value={fontSize}
        onChange={(e) =>
          updateFontSize(parseInt(e.target.value, 10) || DEFAULT_FONT_SIZE)
        }
      />
      <Button
        size="icon-sm"
        className="!size-8"
        disabled={fontSize >= MAX_FONT_SIZE}
        variant="outline"
        onClick={() => updateFontSize(fontSize + 1)}
      >
        <Plus className="size-3" />
      </Button>
    </ButtonGroup>
  );
}
