"use client";

import { Columns3Icon } from "lucide-react";

import { useToolbarContext } from "@/components/dashboard/editor/context/toolbar-context";
import { InsertLayoutDialog } from "@/components/dashboard/editor/plugins/layout-plugin";
import { SelectItem } from "@/components/dashboard/ui/select";

export function InsertColumnsLayout() {
  const { activeEditor, showModal } = useToolbarContext();

  return (
    <SelectItem
      className=""
      value="columns"
      onPointerUp={() =>
        showModal("Insert Columns Layout", (onClose) => (
          <InsertLayoutDialog activeEditor={activeEditor} onClose={onClose} />
        ))
      }
    >
      <div className="flex items-center gap-1">
        <Columns3Icon className="size-4" />
        <span>ستون</span>
      </div>
    </SelectItem>
  );
}
