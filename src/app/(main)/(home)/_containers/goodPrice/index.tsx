import H3 from "@/components/ui/h2";
import { getLowPriceProducts } from "@/features/product/dal/query";

import GoodPriceCarusel from "./goodPriceCarusel";

const GoodPriceProducts = async () => {
  const products = await getLowPriceProducts();
  return (
    <section className="container @container mt-26">
      <GoodPriceCarusel products={products}>
        <H3 className="mt-8 mb-12">کالاهای قیمت مناسب</H3>
      </GoodPriceCarusel>
    </section>
  );
};

export default GoodPriceProducts;
