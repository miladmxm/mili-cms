const ProductPage = async ({ params }: PageProps<"/product/[slug]">) => {
  console.log(await params);

  return <div>product</div>;
};

export default ProductPage;
