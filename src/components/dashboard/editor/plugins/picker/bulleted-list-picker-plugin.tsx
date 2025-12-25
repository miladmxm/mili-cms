import { INSERT_UNORDERED_LIST_COMMAND } from "@lexical/list";
import { ListIcon } from "lucide-react";

import { ComponentPickerOption } from "@/components/dashboard/editor/plugins/picker/component-picker-option";

export function BulletedListPickerPlugin() {
  return new ComponentPickerOption("لیست معمولی", {
    icon: <ListIcon className="size-4" />,
    keywords: ["bulleted list", "unordered list", "ul"],
    onSelect: (_, editor) =>
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined),
  });
}
