import Categories from "./_containers/categories";
import Hero from "./_containers/hero";
import SpecialOffer from "./_containers/specialOffer";

const Home = async () => {
  return (
    <main>
      <Hero />
      <Categories />
      <SpecialOffer />
    </main>
  );
};

export default Home;
