import { useCurrentEditor } from "@tiptap/react";
import { Eraser } from "lucide-react";

import { Button } from "../../ui/button";

const UnsetAll = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return;
  const handleUnset = () => {
    editor.chain().focus().unsetAllMarks().run();
  };
  return (
    <Button size="icon" variant="outline" onClick={handleUnset}>
      <Eraser />
    </Button>
  );
};

export default UnsetAll;
