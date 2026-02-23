import Categories from "@/features/article/containers/categories";

const CategoriesPage = async ({
  searchParams,
}: PageProps<"/admin/blog/categories">) => {
  return <Categories searchParams={await searchParams} />;
};

export default CategoriesPage;
