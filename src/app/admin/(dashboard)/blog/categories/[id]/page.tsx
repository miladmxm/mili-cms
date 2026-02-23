import Categories from "@/features/article/containers/categories";

const EditCategory = async ({
  params,
  searchParams,
}: PageProps<"/admin/blog/categories/[id]">) => {
  const { id } = await params;
  return <Categories searchParams={await searchParams} editCategoryId={id} />;
};

export default EditCategory;
