import H3 from "@/components/ui/h2";

import ProductDetiailWithMotion from "./productDetiailWithMotion";

const ProductDetails = () => {
  return (
    <section className="py-12 md:py-22 container flex-col flex gap-12">
      <H3>جزئیات محصول</H3>
      <ProductDetiailWithMotion />
    </section>
  );
};

export default ProductDetails;
