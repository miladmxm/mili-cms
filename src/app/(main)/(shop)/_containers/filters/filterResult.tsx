"use client";

import Close from "@/assets/icons/close.svg";
import { useSetParams } from "@/hooks/useSetParams";

import { useFilterParams } from "../../_context";

const FilterResultItem = ({ slug, value }: { slug: string; value: string }) => {
  const { deleteParams } = useSetParams();
  return (
    <button
      onClick={() => {
        deleteParams(slug);
      }}
      type="button"
      className="text-sm flex items-center gap-2"
    >
      <Close className="size-2" />
      <span>{value}</span>
    </button>
  );
};

const FilterResult = () => {
  const { optionsFilter, options } = useFilterParams();
  const optionsFilterKeyValue = optionsFilter
    ? Object.keys(optionsFilter).map((key) => {
        const option = options.find(({ slug }) => slug === key);
        if (!option) return {};
        const optionItem = option.items.find(
          ({ value }) => value === optionsFilter[key],
        );
        if (!optionItem) return {};
        return { slug: key, label: optionItem.label };
      })
    : [];

  if (!optionsFilterKeyValue || optionsFilterKeyValue.length === 0) return null;
  return (
    <div className="bg-white rounded-full py-3 px-8 overflow-auto shadow-blur-sm">
      <div className="flex items-center gap-6 w-max">
        {optionsFilterKeyValue.map(({ label, slug }) => {
          if (!label || !slug) return null;
          return <FilterResultItem key={slug} value={label} slug={slug} />;
        })}
      </div>
    </div>
  );
};

export default FilterResult;
