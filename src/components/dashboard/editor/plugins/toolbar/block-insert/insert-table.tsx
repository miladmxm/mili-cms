"use client";

import { TableIcon } from "lucide-react";

import { useToolbarContext } from "@/components/dashboard/editor/context/toolbar-context";
import { InsertTableDialog } from "@/components/dashboard/editor/plugins/table-plugin";
import { SelectItem } from "@/components/dashboard/ui/select";

export function InsertTable() {
  const { activeEditor, showModal } = useToolbarContext();

  return (
    <SelectItem
      className=""
      value="table"
      onPointerUp={() =>
        showModal("Insert Table", (onClose) => (
          <InsertTableDialog activeEditor={activeEditor} onClose={onClose} />
        ))
      }
    >
      <div className="flex items-center gap-1">
        <TableIcon className="size-4" />
        <span>جدول</span>
      </div>
    </SelectItem>
  );
}
