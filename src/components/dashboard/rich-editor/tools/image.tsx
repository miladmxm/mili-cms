import { useTiptap } from "@tiptap/react";
import { Image } from "lucide-react";
import { useRef } from "react";

import type { SheetController } from "@/features/media/components/mediaPickerSheet";

import MediaPickerSheet from "@/features/media/components/mediaPickerSheet";

import { Button } from "../../ui/button";

const AddImage = () => {
  const { editor, isReady } = useTiptap();
  const sheetControllerRef = useRef<SheetController>(null);

  if (!editor || !isReady) return;
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
        type="button"
        variant="ghost"
        onClick={() => {
          sheetControllerRef.current?.open();
        }}
      >
        <Image />
        افزودن تصویر
      </Button>
      <MediaPickerSheet
        mediaKey="image"
        controllerRef={sheetControllerRef}
        onSelect={onClickHandler}
      />
    </>
  );
};

export default AddImage;
