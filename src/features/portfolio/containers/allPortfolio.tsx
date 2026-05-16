import { BaggageClaim } from "lucide-react";

import EmptyPlaceholder from "@/components/dashboard/empty";

import { PortfolioTable } from "../components/portfolioTable";
import { getPortfolios } from "../dal/query";

const AllPortfolio = async () => {
  const portfolios = await getPortfolios();
  if (!portfolios.length)
    return (
      <EmptyPlaceholder
        link="/admin/portfolio/add"
        title="هیچ نمونه‌کاری نیست"
        type="link"
        actionTitle="افزودن نمونه‌کار"
        description="موردی در پایگاه داده یافت نشد"
        icon={BaggageClaim}
      />
    );
  return <PortfolioTable data={portfolios} />;
};

export default AllPortfolio;
