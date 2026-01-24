import { useCurrentEditor } from "@tiptap/react";
import { Code2 } from "lucide-react";

import { SelectItem } from "@/components/dashboard/ui/select";

const Code = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return;
  return (
    <SelectItem
      value="code"
      onPointerDown={() => {
        editor.chain().focus().run();
        editor.chain().focus().toggleCode().run();
      }}
    >
      <Code2 />
      بلاک کد
    </SelectItem>
  );
};

export default Code;
