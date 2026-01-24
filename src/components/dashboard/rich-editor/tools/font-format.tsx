import { useCurrentEditor } from "@tiptap/react";
import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";
import { useState } from "react";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/dashboard/ui/toggle-group";

const FORMATS = [
  { format: "toggleBold", icon: BoldIcon, label: "Bold" },
  { format: "toggleItalic", icon: ItalicIcon, label: "Italic" },
  { format: "toggleUnderline", icon: UnderlineIcon, label: "Underline" },
  { format: "toggleStrike", icon: StrikethroughIcon, label: "Strikethrough" },
] as const;

const FontFormat = () => {
  const { editor } = useCurrentEditor();
  console.log(editor);
  const [activeFormats, setActiveFormats] = useState<string[]>([]);
  if (!editor) return;
  return (
    <ToggleGroup
      dir="rtl"
      className="rtl:flex-row-reverse"
      type="multiple"
      value={activeFormats}
      variant="outline"
      onValueChange={setActiveFormats}
    >
      {FORMATS.map(({ format, icon: Icon, label }) => (
        <ToggleGroupItem
          aria-label={label}
          key={format}
          value={format}
          onClick={() => {
            editor.chain().focus()[format]().run();
          }}
        >
          <Icon className="size-4" />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default FontFormat;
