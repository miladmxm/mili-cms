import EditProduct from "@/features/product/containers/editProduct";

const EditProductPage = async ({ params }: PageProps<"/admin/blog/[id]">) => {
  const { id } = await params;
  return <EditProduct id={id} />;
};

export default EditProductPage;
