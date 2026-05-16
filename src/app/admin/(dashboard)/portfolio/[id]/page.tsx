import EditPortfolio from "@/features/portfolio/containers/editPortfolio";

const EditPortfolioPage = async ({
  params,
  searchParams,
}: PageProps<"/admin/portfolio/[id]">) => {
  const { id } = await params;
  return <EditPortfolio id={id} searchParams={await searchParams} />;
};

export default EditPortfolioPage;
