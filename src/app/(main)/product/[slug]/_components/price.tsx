"use client";

import type { Variants } from "motion/react";

import { AnimatePresence, motion } from "motion/react";

import type { Product } from "@/services/product/type";

import {
  DiscountedPrice,
  FormatedPrice,
} from "@/features/product/components/ui/finalPrice";
import { cn } from "@/lib/utils";

import { useGetMetadata } from "../_hooks/useGetMetadata";

const DiscountedPriceVariants: Variants = {
  hide: { scale: 0.5, opacity: 0 },
  show: { scale: 1, opacity: 1 },
};

const DiscountPrice = ({
  metadata,
}: {
  metadata: Product["metadata"][number];
}) => {
  return (
    <AnimatePresence mode="sync">
      {metadata.discount > 0 && (
        <motion.del
          exit="hide"
          initial="hide"
          animate="show"
          variants={DiscountedPriceVariants}
          className="font-light text-sm absolute inset-e-0 bottom-full"
          transition={{ type: "spring", duration: 0.6 }}
        >
          <FormatedPrice metadata={[metadata]} />
          تومان
        </motion.del>
      )}
    </AnimatePresence>
  );
};

const Price = ({ className }: { className?: string }) => {
  const metadata = useGetMetadata();
  return (
    <div
      className={cn(
        "text-xl font-bold text-gray-500 flex gap-4 relative",
        className,
      )}
    >
      <div className="w-fit relative">
        <DiscountPrice metadata={metadata} />
        <div>
          <span>قیمت:</span>
          <DiscountedPrice metadata={[metadata]} />
        </div>
      </div>
    </div>
  );
};

export default Price;
