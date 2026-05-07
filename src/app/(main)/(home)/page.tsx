import { getPublicCategories } from "@/features/product/dal/query";
import { buildCategoryTree } from "@/features/product/utils/buildCategoryTree";

import Header from "./_container/header";
import HomePageContextProvider from "./_context";

const Home = async () => {
  const productCategories = buildCategoryTree(await getPublicCategories());
  return (
    <main>
      <HomePageContextProvider productCategories={productCategories}>
        <Header />
      </HomePageContextProvider>
    </main>
  );
};

export default Home;
