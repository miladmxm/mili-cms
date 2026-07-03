"use client";

import { motion } from "motion/react";

import { useQuantityContext } from "@/app/(main)/product/[slug]/_store/quantityStore";
import Negative from "@/assets/icons/negative.svg";
import Positive from "@/assets/icons/positive.svg";
import { cn } from "@/lib/utils";

const Counter = ({ className }: { className?: string }) => {
  const quantity = useQuantityContext((s) => s.quantity);
  const increment = useQuantityContext((s) => s.increment);
  const decrement = useQuantityContext((s) => s.decrement);
  return (
    <motion.div
      layout
      className={cn(
        "flex divide-x divide-primary-200 px-2 rounded-full max-w-fit bg-white py-4 text-gray-500",
        className,
      )}
    >
      <button className="px-3" type="button" onClick={increment}>
        <Positive className="size-2" />
      </button>
      <div className="flex flex-col gap-2 overflow-hidden size-6 center">
        <motion.span key={quantity} animate={{ y: [-20, 0] }}>
          {quantity.toLocaleString("fa")}
        </motion.span>
      </div>
      <button className="px-3" type="button" onClick={decrement}>
        <Negative className="size-2" />
      </button>
    </motion.div>
  );
};

export default Counter;
