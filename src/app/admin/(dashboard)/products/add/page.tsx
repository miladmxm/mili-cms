import CreateProduct from "@/features/product/containers/createProduct";

const AddNewProduct = async ({
  searchParams,
}: PageProps<"/admin/blog/add">) => {
  return <CreateProduct searchParams={await searchParams} />;
};

export default AddNewProduct;
