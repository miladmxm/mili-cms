import { useTiptap } from "@tiptap/react";
import { Image } from "lucide-react";
import { useRef } from "react";

import type { SheetController } from "@/features/media/components/mediaPickerSheet";

import MediaPickerSheet from "@/features/media/components/mediaPickerSheet";

import { Button } from "../../ui/button";
import { useRichEditorContext } from "../context";

const AddImage = () => {
  const { editor, isReady } = useTiptap();
  const richEditorContext = useRichEditorContext();
  const sheetControllerRef = useRef<SheetController>(null);

  if (!editor || !richEditorContext || !isReady) return;
  const onClickHandler = ({ url, alt }: { url: string; alt: string }) => {
    editor
      .chain()
      .focus()
      .setImage({
        src: url,
        alt,
        height: 200,
      })
      .run();
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
        <Image />
        افزودن تصویر
      </Button>
      <MediaPickerSheet
        medias={richEditorContext.media}
        controllerRef={sheetControllerRef}
        onSelect={onClickHandler}
      />
    </>
  );
};

export default AddImage;
