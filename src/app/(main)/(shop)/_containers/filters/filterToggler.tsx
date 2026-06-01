"use client";

import { cn } from "@/lib/utils";

import { toggleFilterBox, useFilterMenuStore } from "./store";

const FilterToggler = () => {
  const isOpen = useFilterMenuStore((state) => state.open);
  return (
    <button
      className={cn(
        "text-thready-800 transition-all w-fit text-xl font-bold px-6 py-1.5 block rounded-full bg-white",
        {
          "shadow-blur-sm": isOpen,
        },
      )}
      type="button"
      onClick={toggleFilterBox}
    >
      فیلتر ها
    </button>
  );
};

export default FilterToggler;
