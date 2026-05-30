"use client";

import { motion } from "motion/react";

import type { Option } from "@/services/product/type";

import FilterByOptions from "./filterByOptions";
import FilterByPrice from "./filterByPrice";
import { useFilterMenuStore } from "./store";

const ShopFilters = ({ options }: { options: Option[] }) => {
  const isOpen = useFilterMenuStore((state) => state.open);
  return (
    <motion.aside
      animate={{ width: isOpen ? "30%" : "0" }}
      className="w-0 overflow-hidden"
    >
      <div className="bg-primary-25 rounded-7xl px-8 py-6">
        <FilterByPrice />
        <FilterByOptions options={options} />
      </div>
    </motion.aside>
  );
};

export default ShopFilters;
