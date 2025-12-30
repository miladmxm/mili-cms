import CreateArticleForm from "@/features/article/components/createArticleForm";
import { getMediasByType } from "@/features/media/dal/queries";

const AddNewArticle = () => {
  const medias = getMediasByType(["video", "image"]);
  return <CreateArticleForm medias={medias} />;
};

export default AddNewArticle;
