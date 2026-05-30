"use client";

import Spiner from "@/components/ui/spiner";
import { useSetParams } from "@/hooks/useSetParams";
import { cn } from "@/lib/utils";

interface Filter {
  title: string;
  amount: { min: string; max: string };
}

const FilterPriceItem = ({ amount, title }: Filter) => {
  const { applyParams, searchParams, isPendding } = useSetParams();
  const priceMin = searchParams.get("price-min");
  const priceMax = searchParams.get("price-max");
  const isActive = amount.min === priceMin && amount.max === priceMax;

  const applyFilter = () => {
    applyParams({ "price-min": amount.min, "price-max": amount.max });
  };

  return (
    <button
      onClick={applyFilter}
      disabled={isPendding}
      className={cn(
        "py-3 px-3 rounded-full center items-center gap-1 text-center bg-primary-25 disabled:opacity-50 text-sm transition-colors",
        { "bg-gray-500 text-white": isActive },
      )}
      type="button"
    >
      {title}
      {isPendding && <Spiner />}
    </button>
  );
};

const FILTERS: Filter[] = [
  { title: "تا ۲۰ میلیون", amount: { min: "0", max: "20" } },
  {
    amount: { min: "20", max: "40" },
    title: "۲۰ تا ۴۰ میلیون",
  },
  { title: "۴۰ تا ۶۰ میلیون", amount: { min: "40", max: "60" } },
  { title: "۶۰ تا ۸۰ میلیون", amount: { min: "60", max: "80" } },
];

const FilterPriceItems = () => {
  return (
    <div className="grid grid-cols-2 auto-rows-auto gap-2">
      {FILTERS.map((filterItem) => (
        <FilterPriceItem key={filterItem.title} {...filterItem} />
      ))}
    </div>
  );
};

const FilterByPrice = () => {
  return (
    <div className="bg-white rounded-4xl px-6 pb-8 mt-6">
      <div className="center w-full bg-primary-200 py-2 -translate-y-1/2 rounded-full">
        فیلتر بر اساس قیمت
      </div>
      <FilterPriceItems />
    </div>
  );
};

export default FilterByPrice;
