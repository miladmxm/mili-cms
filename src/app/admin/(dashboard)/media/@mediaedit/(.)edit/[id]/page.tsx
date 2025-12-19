const EditMediaPage = async ({
  params,
}: PageProps<"/admin/media/edit/[id]">) => {
  const { id } = await params;
  return <div>{id}</div>;
};

export default EditMediaPage;
