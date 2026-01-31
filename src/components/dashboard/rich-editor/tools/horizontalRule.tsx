import { useTiptap } from "@tiptap/react";
import { Minus } from "lucide-react";

import { Button } from "../../ui/button";

const HorizontalRule = () => {
  const { editor, isReady } = useTiptap();
  if (!editor || !isReady) return;
  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => editor.chain().focus().setHorizontalRule().run()}
    >
      <Minus />
    </Button>
  );
};

export default HorizontalRule;
