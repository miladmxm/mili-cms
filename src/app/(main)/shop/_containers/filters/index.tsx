"use client";

import { motion, useAnimate } from "motion/react";
import { useEffect } from "react";

import type { Option } from "@/services/product/type";

import Close from "@/assets/icons/close.svg";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import FilterByOptions from "./filterByOptions";
import FilterByPrice from "./filterByPrice";
import FilterDiscounted from "./filterDiscounted";
import { setCloseFilter, useFilterMenuStore } from "./store";

const ShopFilters = ({ options }: { options: Option[] }) => {
  const isOpen = useFilterMenuStore((state) => state.open);
  const isMobile = useIsMobile();
  const [sidebarRef, animate] = useAnimate<HTMLDivElement>();
  useEffect(() => {
    if (isOpen) {
      animate([["&>*", { opacity: 1, y: [30, 0] }, { delay: 0.3 }]]);
    } else {
      animate([["&>*", { opacity: 0, y: [0, 30] }, { delay: 0 }]]);
    }
  }, [animate, isOpen]);
  return (
    <motion.aside
      animate={{ width: isOpen ? (isMobile ? "100%" : "auto") : "0" }}
      layout
      transition={{ delay: isOpen ? 0 : 0.2 }}
      className={cn(
        "w-0 overflow-hidden max-md:fixed top-0 isolate max-md:z-50 max-md:h-full right-0",
      )}
    >
      {isOpen && isMobile && (
        <button
          type="button"
          className="absolute inset-0 backdrop-blur-xs -z-10"
          onClick={setCloseFilter}
        />
      )}
      <div className="max-md:bg-white flex h-full w-full max-md:w-9/10 flex-col">
        <button
          className="size-4 md:hidden ms-auto my-4 mx-4"
          type="button"
          onClick={setCloseFilter}
        >
          <Close />
        </button>
        <div
          ref={sidebarRef}
          className="bg-primary-25 max-md:overflow-y-auto max-md:h-full *:opacity-0 rounded-7xl px-8 py-6 flex flex-col gap-6"
        >
          <FilterByPrice />
          <FilterByOptions options={options} />
          <FilterDiscounted />
        </div>
      </div>
    </motion.aside>
  );
};

export default ShopFilters;
