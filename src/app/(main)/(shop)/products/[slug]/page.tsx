import { Suspense } from "react";

import ShopOptions from "@/components/ui/shopOptions";

import HeroShop from "../../_containers/hero";
import MainContent from "../../_containers/mainContent";
import FAQsection from "../../../_containers/fag";

const CategoryPage = async ({
  params,
  searchParams,
}: PageProps<"/products/[slug]">) => {
  return (
    <main>
      <HeroShop />
      <Suspense fallback="hleo">
        <MainContent categorySlug={params} searchParams={searchParams} />
      </Suspense>
      <section className="py-20 container">
        <ShopOptions />
      </section>
      <FAQsection />
    </main>
  );
};

export default CategoryPage;
