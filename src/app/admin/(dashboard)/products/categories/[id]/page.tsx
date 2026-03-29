import Categories from "@/features/product/containers/categories";

const EditCategory = async ({
  params,
  searchParams,
}: PageProps<"/admin/blog/categories/[id]">) => {
  const { id } = await params;
  return <Categories searchParams={await searchParams} editCategoryId={id} />;
};

export default EditCategory;
