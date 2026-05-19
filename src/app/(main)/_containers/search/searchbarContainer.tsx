"use client";

import type { PropsWithChildren } from "react";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

import CloseSearchbar from "./close";
import { useSearchbarStore } from "./store";

const SearchbarContainer = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  const isOpen = useSearchbarStore((store) => store.open);
  return (
    <motion.div
      animate={{
        height: isOpen ? "100%" : 0,
        top: isOpen ? 0 : "100%",
      }}
      className="fixed inset-x-0 h-0 top-full isolate z-50 max-h-svh flex items-end"
    >
      <div className="md:bg-white md:opacity-90 max-md:backdrop-blur-xs absolute inset-0 -z-10 " />
      <div className="w-full md:h-full h-9/10 max-md:bg-white max-md:rounded-t-7xl">
        {isOpen && (
          <div className={cn("container h-full", className)}>{children}</div>
        )}
        <CloseSearchbar />
      </div>
    </motion.div>
  );
};

export default SearchbarContainer;
