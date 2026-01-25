import type { Editor } from "@tiptap/react";

import { useCurrentEditor } from "@tiptap/react";
import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/dashboard/ui/toggle-group";

const FORMATS = [
  { name: "bold", format: "toggleBold", icon: BoldIcon, label: "Bold" },
  { name: "italic", format: "toggleItalic", icon: ItalicIcon, label: "Italic" },
  {
    name: "underline",
    format: "toggleUnderline",
    icon: UnderlineIcon,
    label: "Underline",
  },
  {
    name: "strike",
    format: "toggleStrike",
    icon: StrikethroughIcon,
    label: "Strikethrough",
  },
] as const;

const getCurrentBlock = (editor: Editor) => {
  const activedFormats: string[] = [];
  FORMATS.forEach(({ name }) => {
    if (editor.isActive(name)) {
      activedFormats.push(name);
    }
  });
  return activedFormats;
};
const FontFormat = () => {
  const { editor } = useCurrentEditor();
  const [activeFormats, setActiveFormats] = useState<string[]>([]);

  useEffect(() => {
    if (!editor) return;
    const update = () => {
      setActiveFormats(getCurrentBlock(editor));
    };
    editor.on("selectionUpdate", update);
    editor.on("transaction", update);

    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor]);
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
      {FORMATS.map(({ format, icon: Icon, label, name }) => (
        <ToggleGroupItem
          aria-label={label}
          key={format}
          value={name}
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
