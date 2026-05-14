import AugmentedReality from "./_containers/augmentedReality";
import Categories from "./_containers/categories";
import CropSVG from "./_containers/cropSVG";
import GoodPriceProducts from "./_containers/goodPrice";
import Hero from "./_containers/hero";
import InstallmentTerms from "./_containers/installmentTerms";
import MoreProducts from "./_containers/moreProducts";
import ProductDetails from "./_containers/productDetails";
import SpecialOffer from "./_containers/specialOffer";

const Home = async () => {
  return (
    <main>
      <Hero />
      <Categories />
      <SpecialOffer />
      <GoodPriceProducts />
      <AugmentedReality />
      <MoreProducts />
      <ProductDetails />
      <InstallmentTerms />
      <CropSVG />
    </main>
  );
};

export default Home;
