import type { Editor } from "@tiptap/react";

import { useEditorState, useTiptap } from "@tiptap/react";
import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";

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
  const { editor, isReady } = useTiptap();
  const editorState = useEditorState({
    editor,
    selector: ({ editor: selectorEditor }) => {
      if (!selectorEditor) return [];
      return getCurrentBlock(selectorEditor);
    },
  });

  if (!editor || !isReady) return;

  return (
    <ToggleGroup
      dir="rtl"
      className="rtl:flex-row-reverse"
      type="multiple"
      value={editorState ?? []}
      variant="outline"
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
