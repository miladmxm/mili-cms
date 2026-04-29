import EditArticle from "@/features/article/containers/editArticle";

const EditArticlePage = async ({
  params,
  searchParams,
}: PageProps<"/admin/blog/[id]">) => {
  const { id } = await params;
  return <EditArticle id={id} searchParams={await searchParams} />;
};

export default EditArticlePage;
