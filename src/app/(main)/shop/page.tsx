import ShopOptions from "@/components/ui/shopOptions";

import FAQsection from "../_containers/fag";
import HeroShop from "./_containers/hero";
import MainContent from "./_containers/mainContent";

const ShopPage = ({ searchParams }: PageProps<"/shop">) => {
  return (
    <main>
      <HeroShop />
      <MainContent searchParams={searchParams} />
      <section className="py-20 container">
        <ShopOptions />
      </section>
      <FAQsection />
    </main>
  );
};

export default ShopPage;
