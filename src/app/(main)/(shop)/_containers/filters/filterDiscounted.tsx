"use client";

import { motion } from "motion/react";

import { useSetParams } from "@/hooks/useSetParams";
import { cn } from "@/lib/utils";

const FilterDiscounted = () => {
  const { applyParams, deleteParams, searchParams } = useSetParams();
  const isChecked = !!searchParams.get("discount");
  return (
    <div className="rounded-full p-2 bg-primary-200 flex justify-between">
      <label htmlFor="discount">کالاهای تخفیفی</label>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => {
          if (e.target.checked) {
            applyParams({ discount: "true" }, { scroll: false });
          } else {
            deleteParams("discount", { scroll: false });
          }
        }}
        id="discount"
        name="discount"
        className="sr-only"
      />
      <label
        htmlFor="discount"
        className={cn(
          "w-12 flex items-center justify-start h-6 p-1 cursor-pointer rounded-full bg-secondary-500/20",
          {
            "justify-end": isChecked,
            "bg-primary-50": !isChecked,
          },
        )}
      >
        {" "}
        <motion.span
          layout
          transition={{
            type: "spring",
            visualDuration: 0.2,
            bounce: 0.2,
          }}
          animate={{ backgroundColor: isChecked ? "" : "#D9D9D9" }}
          className="h-full aspect-square block rounded-full bg-secondary-500"
        />
      </label>
    </div>
  );
};

export default FilterDiscounted;
