import H3 from "@/components/ui/h2";
import { getPublishedProducts } from "@/features/product/dal/query";

import MoreProductCarusels from "./moreProductCarusel";

const MoreProducts = async () => {
  const products = await getPublishedProducts({ limit: 12, offset: 0 });

  return (
    <section className="container z-20 relative flex flex-col gap-22">
      <H3>دیگر محصولات</H3>

      <MoreProductCarusels products={products} />
    </section>
  );
};

export default MoreProducts;
