"use client";

import type { PropsWithChildren, ReactNode } from "react";

import { motion } from "motion/react";
import { useState } from "react";

import { cn } from "@/lib/utils";

const Accordion = ({
  label,
  children,
}: PropsWithChildren<{ label: ReactNode }>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} type="button">
        {label}
      </button>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn("overflow-hidden")}
      >
        <motion.div layout>{children}</motion.div>
      </motion.div>
    </div>
  );
};

const MobileMenu = ({ children }: PropsWithChildren) => {
  return (
    <nav className="fixed bg-white inset-0">
      <ul className="flex gap-4 flex-col">
        <li>
          <Accordion label="acarder">
            helo <br />
            milad
          </Accordion>
        </li>
        {children}
      </ul>
    </nav>
  );
};

export default MobileMenu;
