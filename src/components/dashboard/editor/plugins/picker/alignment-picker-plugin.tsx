import { FORMAT_ELEMENT_COMMAND } from "lexical";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";

import { ComponentPickerOption } from "@/components/dashboard/editor/plugins/picker/component-picker-option";

type Alignment = "center" | "justify" | "left" | "right";
const AlignLable: Record<Alignment, string> = {
  center: "وسط چین",
  justify: "هم تراز",
  left: "چپ چین",
  right: "راست چیت",
};
export function AlignmentPickerPlugin({ alignment }: { alignment: Alignment }) {
  return new ComponentPickerOption(` ${AlignLable[alignment]}`, {
    icon: <AlignIcons alignment={alignment} />,
    keywords: ["align", "justify", alignment],
    onSelect: (_, editor) =>
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment),
  });
}

function AlignIcons({ alignment }: { alignment: Alignment }) {
  switch (alignment) {
    case "left":
      return <AlignLeftIcon className="size-4" />;
    case "center":
      return <AlignCenterIcon className="size-4" />;
    case "right":
      return <AlignRightIcon className="size-4" />;
    case "justify":
      return <AlignJustifyIcon className="size-4" />;
  }
}
