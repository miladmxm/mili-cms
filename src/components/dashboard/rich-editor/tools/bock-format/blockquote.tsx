import { useCurrentEditor } from "@tiptap/react";
import { QuoteIcon } from "lucide-react";

import { SelectItem } from "@/components/dashboard/ui/select";

const Blockquote = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return;
  return (
    <SelectItem
      value="quote"
      onPointerDown={() => editor.chain().focus().toggleBlockquote().run()}
    >
      <QuoteIcon />
      نقل قول
    </SelectItem>
  );
};

export default Blockquote;
