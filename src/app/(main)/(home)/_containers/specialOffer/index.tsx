import H3 from "@/components/ui/h2";
import { getDiscountedProducts } from "@/features/product/dal/query";

import OfferCarusel from "./offerCarusel";

const SpecialOffer = async () => {
  const products = await getDiscountedProducts();
  return (
    <section className="container flex flex-col gap-8">
      <H3>پیشنهاد ویژه</H3>
      <OfferCarusel products={products} />
    </section>
  );
};

export default SpecialOffer;
