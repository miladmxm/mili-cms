import type { Editor } from "@tiptap/core";

import { Trash } from "lucide-react";

import { Button } from "@/components/dashboard/ui/button";

const Clear = ({ editor }: { editor: Editor }) => {
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
