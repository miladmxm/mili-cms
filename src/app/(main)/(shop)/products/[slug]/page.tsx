const CategoryPage = async ({
  params,
  searchParams,
}: PageProps<"/products/[slug]">) => {
  console.log(await params);
  return <div>category</div>;
};

export default CategoryPage;
