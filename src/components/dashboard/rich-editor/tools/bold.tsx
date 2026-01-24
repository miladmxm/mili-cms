import type { Editor } from "@tiptap/core";

import { Bold } from "lucide-react";

import { Button } from "@/components/dashboard/ui/button";

const BoldText = ({ editor }: { editor: Editor }) => {
  return (
    <Button
      size="icon-sm"
      className="font-bold"
      type="button"
      variant="outline"
      onClick={() => editor.chain().focus().toggleBold().run()}
    >
      <Bold />
    </Button>
  );
};

export default BoldText;
