const EditMediaPage = async ({ params }: PageProps<"/admin/media/[id]">) => {
  const { id } = await params;
  return <div>{id}</div>;
};

export default EditMediaPage;
