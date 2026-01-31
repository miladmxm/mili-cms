import RichEditor from "@/components/dashboard/rich-editor";
import RichEditorContextProvider from "@/components/dashboard/rich-editor/context";
import { getMediasByType } from "@/features/media/dal/queries";

const page = () => {
  const medias = getMediasByType(["image"]);
  return (
    <div>
      <RichEditorContextProvider media={medias}>
        <RichEditor />
      </RichEditorContextProvider>
    </div>
  );
};

export default page;
