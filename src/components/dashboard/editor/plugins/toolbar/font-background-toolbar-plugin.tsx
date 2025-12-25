"use client";

import type { BaseSelection } from "lexical";

import {
  $getSelectionStyleValueForProperty,
  $patchStyleText,
} from "@lexical/selection";
import { $getSelection, $isRangeSelection } from "lexical";
import { PaintBucketIcon } from "lucide-react";
import { useCallback, useState } from "react";

import { useToolbarContext } from "@/components/dashboard/editor/context/toolbar-context";
import { useUpdateToolbarHandler } from "@/components/dashboard/editor/editor-hooks/use-update-toolbar";
import {
  ColorPicker,
  ColorPickerAlphaSlider,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerEyeDropper,
  ColorPickerFormatSelect,
  ColorPickerHueSlider,
  ColorPickerInput,
  ColorPickerTrigger,
} from "@/components/dashboard/editor/editor-ui/color-picker";
import { Button } from "@/components/dashboard/ui/button";

export function FontBackgroundToolbarPlugin() {
  const { activeEditor } = useToolbarContext();

  const [bgColor, setBgColor] = useState("#fff");

  const $updateToolbar = (selection: BaseSelection) => {
    if ($isRangeSelection(selection)) {
      setBgColor(
        $getSelectionStyleValueForProperty(
          selection,
          "background-color",
          "#fff",
        ),
      );
    }
  };

  useUpdateToolbarHandler($updateToolbar);

  const applyStyleText = useCallback(
    (styles: Record<string, string>, skipHistoryStack?: boolean) => {
      activeEditor.update(
        () => {
          const selection = $getSelection();
          activeEditor.setEditable(false);
          if (selection !== null) {
            $patchStyleText(selection, styles);
          }
        },
        { tag: "historic" },
      );
    },
    [activeEditor],
  );

  const onBgColorSelect = useCallback(
    (value: string) => {
      applyStyleText({ "background-color": value }, true);
    },
    [applyStyleText],
  );

  return (
    <ColorPicker
      defaultValue={bgColor}
      defaultFormat="hex"
      modal
      onOpenChange={(open) => {
        if (!open) {
          activeEditor.setEditable(true);
          activeEditor.focus();
        }
      }}
      onValueChange={onBgColorSelect}
    >
      <ColorPickerTrigger asChild>
        <Button size="icon-sm" variant="outline">
          <PaintBucketIcon className="size-4" />
        </Button>
      </ColorPickerTrigger>
      <ColorPickerContent>
        <ColorPickerArea />
        <div className="flex items-center gap-2">
          <ColorPickerEyeDropper />
          <div className="flex flex-1 flex-col gap-2">
            <ColorPickerHueSlider />
            <ColorPickerAlphaSlider />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ColorPickerFormatSelect />
          <ColorPickerInput />
        </div>
      </ColorPickerContent>
    </ColorPicker>
  );
}
