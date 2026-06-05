"use client";

import type { Product } from "@/services/product/type";

import RateStars from "@/components/ui/rateStars";

import ColorVariables from "../_components/colorVariables";

const TopContents = ({ name, variables }: Product) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-gray-500 md:text-xl font-bold">{name}</h1>
      <RateStars rate={12} className="w-44" />
      <ColorVariables variables={variables} />
    </div>
  );
};

export default TopContents;
