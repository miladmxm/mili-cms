import { useTiptap } from "@tiptap/react";
import { Trash } from "lucide-react";

import { Button } from "@/components/dashboard/ui/button";

const Clear = () => {
  const { editor, isReady } = useTiptap();
  if (!editor || !isReady) return;
  return (
    <Button
      size="icon-sm"
      type="button"
      variant="outline"
      onClick={() => editor.commands.clearContent(true)}
    >
      <Trash />
    </Button>
  );
};

export default Clear;
