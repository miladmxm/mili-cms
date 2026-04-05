import EditOption from "@/features/product/containers/editOption";

const EditOptionPage = async ({
  params,
}: PageProps<"/admin/products/options/[id]">) => {
  const { id } = await params;
  return <EditOption id={id} />;
};

export default EditOptionPage;
