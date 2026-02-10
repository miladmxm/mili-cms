import Categories from "@/features/article/containers/categories";

const EditCategory = async ({
  params,
}: PageProps<"/admin/blog/categories/[id]">) => {
  const { id } = await params;
  return <Categories editCategoryId={id} />;
};

export default EditCategory;
