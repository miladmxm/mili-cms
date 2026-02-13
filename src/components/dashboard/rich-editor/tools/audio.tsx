import { useTiptap } from "@tiptap/react";
import { Music } from "lucide-react";
import { useRef } from "react";

import type { SheetController } from "@/features/media/components/mediaPickerSheet";

import MediaPickerSheet from "@/features/media/components/mediaPickerSheet";

import { Button } from "../../ui/button";

const AddAudio = () => {
  const { editor, isReady } = useTiptap();
  const sheetControllerRef = useRef<SheetController>(null);
  if (!editor || !isReady) return;
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
        mediaKey="audio"
        controllerRef={sheetControllerRef}
        onSelect={handleAddAudio}
      />
    </>
  );
};

export default AddAudio;
