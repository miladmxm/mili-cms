import H3 from "@/components/ui/h2";
import { getPaginationPublicPortfolio } from "@/features/portfolio/dal/query";

import Catalog from "./catalog";

const Portfolio = async () => {
  const portfolio = await getPaginationPublicPortfolio({ limit: 5 });
  console.log(portfolio);
  return (
    <section className="py-16 container">
      <H3>کاتالوگ</H3>
      <Catalog portfolio={portfolio} />
    </section>
  );
};

export default Portfolio;
