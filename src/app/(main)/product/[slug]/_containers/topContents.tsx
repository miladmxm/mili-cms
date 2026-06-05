import type { Product } from "@/services/product/type";

import RateStars from "@/components/ui/rateStars";

const TopContents = ({ name, variables }: Product) => {
  console.log(variables);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-gray-500 md:text-xl font-bold">{name}</h1>
      <RateStars rate={12} className="w-44" />
    </div>
  );
};

export default TopContents;
