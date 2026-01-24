import type { Editor } from "@tiptap/core";

import { Italic } from "lucide-react";

import { Button } from "@/components/dashboard/ui/button";

const ItalicText = ({ editor }: { editor: Editor }) => {
  return (
    <Button
      size="icon-sm"
      className="italic"
      type="button"
      variant="outline"
      onClick={() => editor.chain().focus().toggleItalic().run()}
    >
      <Italic />
    </Button>
  );
};

export default ItalicText;
