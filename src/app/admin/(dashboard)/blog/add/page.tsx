import CreateArticle from "@/features/article/containers/createArticle";

const AddNewArticle = async ({
  searchParams,
}: PageProps<"/admin/blog/add">) => {
  return <CreateArticle searchParams={await searchParams} />;
};

export default AddNewArticle;
