import Categories from "./_containers/categories";
import GoodPriceProducts from "./_containers/goodPrice";
import Hero from "./_containers/hero";
import SpecialOffer from "./_containers/specialOffer";

const Home = async () => {
  return (
    <main>
      <Hero />
      <Categories />
      <SpecialOffer />
      <GoodPriceProducts />
    </main>
  );
};

export default Home;
