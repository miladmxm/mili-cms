import RichEditorContextProvider from "@/components/dashboard/rich-editor/context";
import { getMediasByType } from "@/features/media/dal/queries";

import CreateArticleForm from "../components/createArticleForm";
import { getCategories } from "../dal/query";

const CreateArticle = () => {
  const images = getMediasByType(["image"]);
  const audios = getMediasByType(["audio"]);
  const categories = getCategories();
  return (
    <RichEditorContextProvider imageMedia={images} audioMedia={audios}>
      <CreateArticleForm medias={images} categories={categories} />;
    </RichEditorContextProvider>
  );
};

export default CreateArticle;
