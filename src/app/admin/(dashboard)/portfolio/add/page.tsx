import CreatePortfolio from "@/features/portfolio/containers/createPortfolio";

const AddPortFolioPage = async ({
  searchParams,
}: PageProps<"/admin/portfolio/add">) => {
  return <CreatePortfolio searchParams={await searchParams} />;
};

export default AddPortFolioPage;
