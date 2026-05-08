"use client";

import type { PropsWithChildren } from "react";

import { motion } from "motion/react";
import { createContext, use, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

const AccordionContext = createContext<
  { isOpen: boolean; setIsOpen: (o: boolean) => void } | undefined
>(undefined);

AccordionContext.displayName = "AccordionContext";

const useAccordion = () => {
  const v = use(AccordionContext);
  if (!v) throw new Error("Accordion is not provided");
  return v;
};

export const AccordionTrigger = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  const { setIsOpen, isOpen } = useAccordion();
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      type="button"
      className={cn("group", { opened: isOpen }, className)}
    >
      {children}
    </button>
  );
};

export const AccordionContent = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  const { isOpen } = useAccordion();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <motion.div className={cn(className)} layout>
        {children}
      </motion.div>
    </motion.div>
  );
};

const Accordion = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const value = useMemo(() => ({ isOpen, setIsOpen }), [isOpen]);
  return (
    <AccordionContext value={value}>
      <div>{children}</div>
    </AccordionContext>
  );
};

export default Accordion;
