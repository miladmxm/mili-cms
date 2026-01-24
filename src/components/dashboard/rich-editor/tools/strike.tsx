import type { Editor } from "@tiptap/core";

import { Strikethrough } from "lucide-react";

import { Button } from "@/components/dashboard/ui/button";

const Strike = ({ editor }: { editor: Editor }) => {
  return (
    <Button
      size="icon-sm"
      className="line-through"
      type="button"
      variant="outline"
      onClick={() => editor.chain().focus().toggleStrike().run()}
    >
      <Strikethrough />
    </Button>
  );
};

export default Strike;
