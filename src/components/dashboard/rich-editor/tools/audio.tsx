import { useTiptap } from "@tiptap/react";
import { Music } from "lucide-react";
import { useRef } from "react";

import type { SheetController } from "@/features/media/components/mediaPickerSheet";

import MediaPickerSheet from "@/features/media/components/mediaPickerSheet";

import { Button } from "../../ui/button";
import { useRichEditorContext } from "../context";

const AddAudio = () => {
  const { editor, isReady } = useTiptap();
  const sheetControllerRef = useRef<SheetController>(null);
  const richEditorContext = useRichEditorContext();
  if (!editor || !isReady || !richEditorContext) return;
  const { audioMedia } = richEditorContext;
  const handleAddAudio = ({ url }: { url: string }) => {
    editor.chain().focus().setAudio({ src: url }).run();
    sheetControllerRef.current?.close();
  };
  return (
    <>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => {
          sheetControllerRef.current?.open();
        }}
      >
        <Music />
        افزودن صدا
      </Button>
      <MediaPickerSheet
        media={audioMedia}
        controllerRef={sheetControllerRef}
        onSelect={handleAddAudio}
      />
    </>
  );
};

export default AddAudio;
