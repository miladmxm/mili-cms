import EditArticle from "@/features/article/containers/editArticle";

const EditArticlePage = async ({ params }: PageProps<"/admin/blog/[id]">) => {
  const { id } = await params;
  return <EditArticle id={id} />;
};

export default EditArticlePage;
