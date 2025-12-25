"use client";

import type { BaseSelection } from "lexical";

import { $isTableSelection } from "@lexical/table";
import { $isRangeSelection, FORMAT_TEXT_COMMAND } from "lexical";
import { SubscriptIcon, SuperscriptIcon } from "lucide-react";
import { useState } from "react";

import { useToolbarContext } from "@/components/dashboard/editor/context/toolbar-context";
import { useUpdateToolbarHandler } from "@/components/dashboard/editor/editor-hooks/use-update-toolbar";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/dashboard/ui/toggle-group";

export function SubSuperToolbarPlugin() {
  const { activeEditor } = useToolbarContext();
  const [isSubscript, setIsSubscript] = useState(false);
  const [isSuperscript, setIsSuperscript] = useState(false);

  const $updateToolbar = (selection: BaseSelection) => {
    if ($isRangeSelection(selection) || $isTableSelection(selection)) {
      setIsSubscript(selection.hasFormat("subscript"));
      setIsSuperscript(selection.hasFormat("superscript"));
    }
  };

  useUpdateToolbarHandler($updateToolbar);

  return (
    <ToggleGroup
      className="rtl:flex-row-reverse"
      type="single"
      defaultValue={
        isSubscript ? "subscript" : isSuperscript ? "superscript" : ""
      }
    >
      <ToggleGroupItem
        size="sm"
        aria-label="Toggle subscript"
        value="subscript"
        variant="outline"
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript");
        }}
      >
        <SubscriptIcon className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        size="sm"
        aria-label="Toggle superscript"
        value="superscript"
        variant="outline"
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript");
        }}
      >
        <SuperscriptIcon className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
