"use client";

import Spiner from "@/components/ui/spiner";
import { useSetParams } from "@/hooks/useSetParams";
import { cn } from "@/lib/utils";

interface Filter {
  title: string;
  amount: { from: string; to: string };
}

const FilterPriceItem = ({ amount, title }: Filter) => {
  const { applyParams, searchParams, isPendding } = useSetParams();
  const priceFrom = searchParams.get("price-from");
  const priceTo = searchParams.get("price-to");
  const isActive = amount.from === priceFrom && amount.to === priceTo;

  const applyFilter = () => {
    applyParams({ "price-from": amount.from, "price-to": amount.to });
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
  { title: "تا ۲۰ میلیون", amount: { from: "0", to: "20" } },
  {
    amount: { from: "20", to: "40" },
    title: "۲۰ تا ۴۰ میلیون",
  },
  { title: "۴۰ تا ۶۰ میلیون", amount: { from: "40", to: "60" } },
  { title: "۶۰ تا ۸۰ میلیون", amount: { from: "60", to: "80" } },
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
