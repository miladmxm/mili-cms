"use client";

import { AnimatePresence, motion } from "motion/react";

import Button from "@/components/ui/button";
import ButtonWithArrow from "@/components/ui/buttonWithArrow";
import Counter from "@/components/ui/counter";

import Price from "../_components/price";
import Stock from "../_components/stock";

const PriceAndAddToCart = () => {
  return (
    <section className="container md:ps-12 relative">
      <AnimatePresence>
        <motion.div
          layout="size"
          className="bg-primary-200 rounded-7xl md:rounded-full py-8 px-6 size-full ms-auto before:bg-primary-50 before:absolute before:w-44 before:inset-y-0 before:rounded-full before:inset-s-0 before:-z-10 flex max-md:flex-col items-center gap-6"
        >
          <Price className="flex-auto" />
          <Counter className="max-md:hidden" />
          <Stock />
          <ButtonWithArrow containerClassName="max-w-1/3 max-md:hidden">
            افزودن به سبد خرید
          </ButtonWithArrow>
          <Button className="md:hidden " size="base" variant="secondary">
            افزودن به سبد خرید
          </Button>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default PriceAndAddToCart;
