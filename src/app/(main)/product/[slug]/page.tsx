import React from "react";

const Product = async ({ params }: PageProps<"/product/[slug]">) => {
  const { slug } = await params;
  console.log(slug);
  return <div>product</div>;
};

export default Product;
