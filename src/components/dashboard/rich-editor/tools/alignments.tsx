import type { Editor } from "@tiptap/react";

import { useTiptap, useTiptapState } from "@tiptap/react";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";

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
  const { editor, isReady } = useTiptap();
  const activeAlign = useTiptapState((ctx) => getActiveTextAlign(ctx.editor));

  if (!editor || !isReady) return;
  const handleSetAlign = (align: string) => {
    editor.chain().focus().setTextAlign(align).run();
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
