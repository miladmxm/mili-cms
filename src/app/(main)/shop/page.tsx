import ShopOptions from "@/components/ui/shopOptions";

import FAQsection from "../_containers/fag";
import CategoryLinks from "./_containers/categories";
import HeroShop from "./_containers/hero";
import Products from "./_containers/products";
import ProductsWrapper from "./_containers/productsWrapper";

const ShopPage = () => {
  return (
    <main>
      <HeroShop />
      <ProductsWrapper>
        <CategoryLinks />
        <Products />
      </ProductsWrapper>
      <section className="py-20 container">
        <ShopOptions />
      </section>
      <FAQsection />
    </main>
  );
};

export default ShopPage;
