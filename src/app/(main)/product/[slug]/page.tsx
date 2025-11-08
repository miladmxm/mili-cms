import { cacheLife, cacheTag } from "next/cache";
import { Suspense } from "react";

import { getProductBySlug } from "@/features/products/dal/queries";

import RenderProduct from "./product";

const Product = async ({ params }: PageProps<"/product/[slug]">) => {
  "use cache";
  cacheLife("days");
  const { slug } = await params;
  cacheTag(`product-${slug}`);
  const product = getProductBySlug(slug);
  return <RenderProduct product={product} />;
};
export const PRWrapper = (props: PageProps<"/product/[slug]">) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Product {...props} />
  </Suspense>
);
export default PRWrapper;
