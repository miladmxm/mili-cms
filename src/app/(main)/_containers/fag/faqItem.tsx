"use client";

import { motion } from "motion/react";

import Accordion, {
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";

import type { FAQ } from "./faq";

const AccordionIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <motion.div
      animate={{ rotate: isOpen ? "90deg" : "0" }}
      className="size-4 center relative"
    >
      <motion.span
        animate={{ width: isOpen ? 0 : "100%" }}
        className="rounded-full w-full h-0.5 bg-primary-900"
        transition={{ delay: isOpen ? 0.2 : 0 }}
      />
      <motion.span className="rounded-full absolute h-full w-0.5 bg-primary-900" />
    </motion.div>
  );
};

const FaqItem = ({ q, a }: FAQ) => {
  return (
    <Accordion className="has-[.opened]:bg-white has-[.opened]:shadow-lg-gray transition-all bg-primary-200 rounded-4xl px-6">
      <AccordionTrigger className="py-6 w-full text-start text-sm font-bold md:text-lg flex gap-2 items-center">
        {({ isOpen }) => (
          <>
            <AccordionIcon isOpen={isOpen} />
            {q}
          </>
        )}
      </AccordionTrigger>
      <AccordionContent className="ps-6 pe-6 pb-6 text-justify text-thready-800 font-semibold">
        {a}
      </AccordionContent>
    </Accordion>
  );
};

export default FaqItem;
