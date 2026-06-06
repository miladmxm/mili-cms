"use client";

import type { Option, Product } from "@/services/product/type";

import RateStars from "@/components/ui/rateStars";

import ColorVariables from "../_components/colorVariables";
import Options from "../_components/options";
import ShortDescription from "../_components/shortDescription";
import Variables from "../_components/variables";

const TopContents = ({
  name,
  variables,
  excerpt,
  optionItems,
  options,
}: Product & { options: Option[] }) => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-gray-500 md:text-xl font-bold">{name}</h1>
      <RateStars rate={12} className="w-44" />
      <ColorVariables variables={variables} options={options} />
      <ShortDescription description={excerpt} />
      <Variables variables={variables} options={options} />
      <Options optionItems={optionItems} options={options} />
    </div>
  );
};

export default TopContents;
