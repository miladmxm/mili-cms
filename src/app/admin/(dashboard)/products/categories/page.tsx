import Categories from "@/features/product/containers/categories";

const CategoriesPage = async ({
  searchParams,
}: PageProps<"/admin/blog/categories">) => {
  return <Categories searchParams={await searchParams} />;
};

export default CategoriesPage;
