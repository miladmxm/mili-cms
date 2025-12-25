import { ImageIcon } from "lucide-react";

import { InsertImageDialog } from "@/components/dashboard/editor/plugins/images-plugin";
import { ComponentPickerOption } from "@/components/dashboard/editor/plugins/picker/component-picker-option";

export function ImagePickerPlugin() {
  return new ComponentPickerOption("تصویر", {
    icon: <ImageIcon className="size-4" />,
    keywords: ["image", "photo", "picture", "file"],
    onSelect: (_, editor, showModal) =>
      showModal("افزودن تصویر", (onClose) => (
        <InsertImageDialog activeEditor={editor} onClose={onClose} />
      )),
  });
}
