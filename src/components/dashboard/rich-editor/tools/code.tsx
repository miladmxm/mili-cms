import type { Editor } from "@tiptap/core";

import { Code } from "lucide-react";

import { Button } from "@/components/dashboard/ui/button";

const CodeText = ({ editor }: { editor: Editor }) => {
  return (
    <Button
      size="icon-sm"
      type="button"
      variant="outline"
      onClick={() => editor.chain().focus().toggleCode().run()}
    >
      <Code />
    </Button>
  );
};

export default CodeText;
