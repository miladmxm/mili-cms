import CategoryLinks from "./categories";
import ShopFilters from "./filters";
import FilterAndSort from "./filters/filterAndSortWrapper";
import Products from "./products";
import ProductsWrapper from "./productsWrapper";

const MainContent = () => {
  return (
    <ProductsWrapper>
      <CategoryLinks />
      <FilterAndSort />
      <div className="flex gap-4">
        <ShopFilters />
        <div className="@container flex-auto">
          <Products />
        </div>
      </div>
    </ProductsWrapper>
  );
};

export default MainContent;
