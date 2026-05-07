import DragHandle from "@tiptap/extension-drag-handle-react";
import { useTiptap } from "@tiptap/react";
import { GripVertical } from "lucide-react";

const NESTED_CONFIG = { edgeDetection: { threshold: -16 } };

const Drag = () => {
  const { editor, isReady } = useTiptap();
  if (!editor || !isReady) return;
  return (
    <DragHandle
      nested={NESTED_CONFIG}
      computePositionConfig={{ placement: "left" }}
      editor={editor}
    >
      <div className="size-5 pointer-events-auto cursor-grab">
        <GripVertical className="size-full" />
      </div>
    </DragHandle>
  );
};

export default Drag;
