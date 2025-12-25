"use client";

import { ImageIcon } from "lucide-react";

import { useToolbarContext } from "@/components/dashboard/editor/context/toolbar-context";
import { InsertImageDialog } from "@/components/dashboard/editor/plugins/images-plugin";
import { SelectItem } from "@/components/dashboard/ui/select";

export function InsertImage() {
  const { activeEditor, showModal } = useToolbarContext();

  return (
    <SelectItem
      className=""
      value="image"
      onPointerUp={() => {
        showModal("افزودن تصویر", (onClose) => (
          <InsertImageDialog activeEditor={activeEditor} onClose={onClose} />
        ));
      }}
    >
      <div className="flex items-center gap-1">
        <ImageIcon className="size-4" />
        <span>تصویر</span>
      </div>
    </SelectItem>
  );
}
