"use client";
import RichEditor from "@/components/dashboard/rich-editor";
import RichEditorContextProvider from "@/components/dashboard/rich-editor/context";
import { getMediasByType } from "@/features/media/dal/queries";

const page = () => {
  const imageMedias = getMediasByType(["image"]);
  const audioMedias = getMediasByType(["audio"]);
  return (
    <div>
      <RichEditorContextProvider
        imageMedia={imageMedias}
        audioMedia={audioMedias}
      >
        <RichEditor onUpdate={console.log} />
      </RichEditorContextProvider>
    </div>
  );
};

export default page;
