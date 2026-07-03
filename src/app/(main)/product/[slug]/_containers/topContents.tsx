import type { Product } from "@/services/product/type";

import ColorVariables from "../_components/colorVariables";
import Properties from "../_components/properties";
import RateReviews from "../_components/rateReviews";
import ShortDescription from "../_components/shortDescription";
import Variables from "../_components/variables";

const TopContents = ({
  name,
  variables,
  excerpt,
  properties,
  type,
}: Product) => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-gray-500 md:text-xl font-bold">{name}</h1>
      <RateReviews />
      {type === "variable" && <ColorVariables variables={variables} />}
      <ShortDescription description={excerpt} />
      {type === "variable" && <Variables variables={variables} />}
      <Properties properties={properties} />
    </div>
  );
};

export default TopContents;
