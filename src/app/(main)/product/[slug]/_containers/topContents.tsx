"use client";

import type { Product } from "@/services/product/type";

import RateStars from "@/components/ui/rateStars";

import ColorVariables from "../_components/colorVariables";
import ShortDescription from "../_components/shortDescription";
import Variables from "../_components/variables";

const TopContents = ({ name, variables, excerpt }: Product) => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-gray-500 md:text-xl font-bold">{name}</h1>
      <RateStars rate={12} className="w-44" />
      <ColorVariables variables={variables} />
      <ShortDescription description={excerpt} />
      <Variables variables={variables} />
    </div>
  );
};

export default TopContents;
