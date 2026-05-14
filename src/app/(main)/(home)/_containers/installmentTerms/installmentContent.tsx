"use client";

import type { Variants } from "motion/react";

import { motion } from "motion/react";

import Conditions from "@/assets/images/conditions.svg";
import Installments from "@/assets/images/installments.svg";
import ButtonWithArrow from "@/components/ui/buttonWithArrow";

const MotionInstallments = motion.create<HTMLOrSVGElement>(Installments);
const MotionConditions = motion.create<HTMLOrSVGElement>(Conditions);

const InstallmentContent = () => {
  const textMotionVariants: Variants = {
    initial: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };
  return (
    <div className="center">
      <div className="flex flex-col gap-8 w-max">
        <div className="flex gap-0 flex-col">
          <MotionConditions
            variants={textMotionVariants}
            initial="initial"
            whileInView="show"
            className="md:w-[287px] md:h-[107px] w-4/5 aspect-[287/107]"
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.4, type: "spring" }}
          />
          <MotionInstallments
            variants={textMotionVariants}
            initial="initial"
            whileInView="show"
            className="md:w-[325px] md:h-[118px] w-4/5 aspect-[325/118]"
            animate={{ x: -60 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.4, type: "spring", delay: 0.2 }}
          />
        </div>
        <ButtonWithArrow>مشاهده</ButtonWithArrow>
      </div>
    </div>
  );
};

export default InstallmentContent;
