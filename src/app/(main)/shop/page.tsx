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
    </main>
  );
};

export default ShopPage;
