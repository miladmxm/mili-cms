import BackgroundSection from "./backgroundSection";
import CategoryList from "./categoryList";

const Categories = () => {
  return (
    <section className="py-8 mt-8 md:py-16 md:mt-24 z-10 isolate container flex flex-col gap-8 md:gap-16 relative">
      <BackgroundSection />
      <h2 className="text-lg md:text-3xl font-bold text-primary-900 text-center">
        دستـه بنـدی
      </h2>
      <CategoryList />
    </section>
  );
};

export default Categories;
