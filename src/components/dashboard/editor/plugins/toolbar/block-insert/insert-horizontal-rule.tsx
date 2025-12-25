"use client";

import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";
import { ScissorsIcon } from "lucide-react";

import { useToolbarContext } from "@/components/dashboard/editor/context/toolbar-context";
import { SelectItem } from "@/components/dashboard/ui/select";

export function InsertHorizontalRule() {
  const { activeEditor } = useToolbarContext();

  return (
    <SelectItem
      className=""
      value="horizontal-rule"
      onPointerUp={() =>
        activeEditor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined)
      }
    >
      <div className="flex items-center flex-row-reverse gap-1">
        <ScissorsIcon className="size-4" />
        <span>جداکننده افقی</span>
      </div>
    </SelectItem>
  );
}
