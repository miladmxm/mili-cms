"use clinet";

import type { Variants } from "motion/react";

import { motion } from "motion/react";

import Close from "@/assets/icons/close.svg";
import Button from "@/components/ui/button";

import { setCloseSearchbar, useSearchbarStore } from "./store";

const CloseSearchbar = () => {
  const isOpen = useSearchbarStore((store) => store.open);
  const variants: Variants = {
    initial: { scale: 0, rotate: "180deg" },
    show: { scale: 1, rotate: "0deg" },
  };
  return (
    <motion.div
      animate={isOpen ? "show" : ""}
      initial="initial"
      className="w-fit h-fit absolute md:start-10 md:bottom-10 start-4 bottom-4 z-30"
      transition={{ delay: isOpen ? 0.5 : 0, type: "spring", duration: 0.6 }}
      variants={variants}
    >
      <Button
        onClick={setCloseSearchbar}
        variant="secondary"
        shadow="sm"
        className="w-fit"
      >
        <Close className="md:size-4 size-2" />
      </Button>
    </motion.div>
  );
};

export default CloseSearchbar;
