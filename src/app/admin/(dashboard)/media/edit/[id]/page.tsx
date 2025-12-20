import EditFileData from "@/features/media/components/editFileData";

const EditMediaPage = async ({
  params,
}: PageProps<"/admin/media/edit/[id]">) => {
  const { id } = await params;
  return <EditFileData id={id} />;
};

export default EditMediaPage;
