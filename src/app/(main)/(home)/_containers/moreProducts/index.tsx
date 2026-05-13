import H3 from "@/components/ui/h2";
import { getPublishedProducts } from "@/features/product/dal/query";

const MoreProducts = async () => {
  const products = await getPublishedProducts();
  console.log("publish", products);
  return (
    <section className="container z-20 relative">
      <H3>دیگر محصولات</H3>
    </section>
  );
};

export default MoreProducts;
