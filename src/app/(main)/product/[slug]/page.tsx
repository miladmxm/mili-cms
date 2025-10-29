import { cacheLife, cacheTag } from "next/cache";

import { getProductBySlug } from "@/features/products/dal/queries";

import RenderProduct from "./product";

const Product = async ({ params }: PageProps<"/product/[slug]">) => {
  "use cache";
  cacheLife("days");
  const { slug } = await params;
  console.log(decodeURI(slug));
  cacheTag(`product-${slug}`);
  const product = getProductBySlug(slug);
  return <RenderProduct product={product} />;
};

export default Product;
