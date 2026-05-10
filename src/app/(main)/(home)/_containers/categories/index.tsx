import H3 from "@/components/ui/h2";

import BackgroundSection from "./backgroundSection";
import CategoryList from "./categoryList";

const Categories = () => {
  return (
    <section className="py-8 mt-8 md:py-16 md:mt-24 z-10 isolate container flex flex-col gap-8 md:gap-16 relative">
      <BackgroundSection />
      <H3>دستـه بنـدی</H3>
      <CategoryList />
    </section>
  );
};

export default Categories;
