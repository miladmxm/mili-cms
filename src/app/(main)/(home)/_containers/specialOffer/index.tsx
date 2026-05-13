import H3 from "@/components/ui/h2";
import SectionCurveInside from "@/components/ui/sectionCurveInside";
import { getDiscountedProducts } from "@/features/product/dal/query";

import OfferCarusel from "./offerCarusel";

const SpecialOffer = async () => {
  const products = await getDiscountedProducts();
  if (!products || products.length === 0) return;
  return (
    <section className="bg-gradient-to-b isolate from-thready-200 relative to-primary-25 pt-28 md:pt-40">
      <SectionCurveInside />
      <div className="container flex flex-col gap-8">
        <H3>پیشنهاد ویژه</H3>
        <OfferCarusel products={products} />
      </div>
    </section>
  );
};

export default SpecialOffer;
