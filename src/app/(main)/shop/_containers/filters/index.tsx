"use client";

import { motion, useAnimate } from "motion/react";
import { useEffect } from "react";

import type { Option } from "@/services/product/type";

import FilterByOptions from "./filterByOptions";
import FilterByPrice from "./filterByPrice";
import FilterDiscounted from "./filterDiscounted";
import { useFilterMenuStore } from "./store";

const ShopFilters = ({ options }: { options: Option[] }) => {
  const isOpen = useFilterMenuStore((state) => state.open);

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
      animate={{ width: isOpen ? "30%" : "0" }}
      transition={{ delay: isOpen ? 0 : 0.2 }}
      className="w-0 overflow-hidden"
    >
      <div
        ref={sidebarRef}
        className="bg-primary-25 *:opacity-0 rounded-7xl px-8 py-6 flex flex-col gap-6"
      >
        <FilterByPrice />
        <FilterByOptions options={options} />
        <FilterDiscounted />
      </div>
    </motion.aside>
  );
};

export default ShopFilters;
