import H3 from "@/components/ui/h2";
import { getPaginationPublicPortfolio } from "@/features/portfolio/dal/query";

import BannerAndTitle from "./bannerAndTitle";
import Catalog from "./catalog";

const Portfolio = async () => {
  const portfolio = await getPaginationPublicPortfolio({ limit: 5 });
  return (
    <section className="py-16 container flex flex-col gap-16">
      <H3>کاتالوگ</H3>
      <div className="flex flex-col md:flex-row gap-4">
        <BannerAndTitle />
        <Catalog className="flex-4/5" portfolio={portfolio} />
      </div>
    </section>
  );
};

export default Portfolio;
