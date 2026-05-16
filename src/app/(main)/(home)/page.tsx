import AugmentedReality from "./_containers/augmentedReality";
import BlogSection from "./_containers/blog";
import Categories from "./_containers/categories";
import Comments from "./_containers/comments";
import CropSVG from "./_containers/cropSVG";
import GoodPriceProducts from "./_containers/goodPrice";
import Hero from "./_containers/hero";
import InstallmentTerms from "./_containers/installmentTerms";
import MoreProducts from "./_containers/moreProducts";
import Portfolio from "./_containers/portfolio";
import ProductDetails from "./_containers/productDetails";
import SpecialOffer from "./_containers/specialOffer";
import ShopOptionsSection from "./_containers/supOptions";

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
      <ShopOptionsSection />
      <Comments />
      <BlogSection />
      <Portfolio />
      <CropSVG />
    </main>
  );
};

export default Home;
