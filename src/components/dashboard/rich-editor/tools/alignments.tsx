import type { Editor } from "@tiptap/react";

import { useCurrentEditor } from "@tiptap/react";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";
import { useEffect, useState } from "react";

import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group";

const ALIGNS = [
  {
    name: "left",
    Icon: AlignLeft,
  },
  { name: "center", Icon: AlignCenter },
  { name: "right", Icon: AlignRight },
  { name: "justify", Icon: AlignJustify },
] as const;

const getActiveTextAlign = (edito: Editor) => {
  let align = "";
  ALIGNS.forEach(({ name }) => {
    if (edito.isActive({ textAlign: name })) {
      align = name;
    }
  });
  return align;
};
const Alignments = () => {
  const { editor } = useCurrentEditor();
  const [activeAlign, setActiveAlign] = useState<string>("");
  useEffect(() => {
    if (!editor) return;
    const update = () => {
      setActiveAlign(getActiveTextAlign(editor));
    };
    editor.on("selectionUpdate", update);
    editor.on("transaction", update);

    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor]);
  if (!editor) return;
  const handleSetAlign = (align: string) => {
    editor.chain().focus().setTextAlign(align).run();
    setActiveAlign(align);
  };
  return (
    <ToggleGroup
      type="single"
      value={activeAlign}
      variant="outline"
      onValueChange={handleSetAlign}
    >
      {ALIGNS.map(({ Icon, name }) => (
        <ToggleGroupItem key={name} value={name}>
          <Icon />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default Alignments;
