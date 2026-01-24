import { useCurrentEditor } from "@tiptap/react";
import { TextAlignStart } from "lucide-react";

import { SelectItem } from "@/components/dashboard/ui/select";

const ParagraphItem = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return;
  return (
    <SelectItem
      value="paragraph"
      onPointerDown={() => editor.chain().focus().setParagraph().run()}
    >
      <TextAlignStart />
      بند
    </SelectItem>
  );
};

export default ParagraphItem;
