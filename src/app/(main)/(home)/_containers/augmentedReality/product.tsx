"use client";

import type { Variants } from "motion/react";

import { motion, useAnimate, useInView } from "motion/react";
import Image from "next/image";
import { useEffect } from "react";

import arProduct from "@/assets/images/arProduct.png";

const ARproduct = () => {
  const [productRef, animate] = useAnimate<HTMLDivElement>();
  const isInView = useInView(productRef, {
    once: true,
    amount: 0.8,
  });
  useEffect(() => {
    if (isInView) {
      animate([
        [
          productRef.current,
          { y: ["40%", 0], opacity: 1, scale: 0.7 },
          { type: "spring" },
        ],
        [productRef.current, { scale: 0.6 }, { type: "spring" }],
        [productRef.current, { x: ["20%", 0] }, { type: "spring" }],
        [
          productRef.current,
          { scale: 0.8, y: [0, "-10%"] },
          { type: "spring" },
        ],
      ]);
    }
  }, [animate, isInView, productRef]);

  const variants: Variants = {
    initial: { opacity: 0, y: 100 },
  };
  return (
    <motion.div
      ref={productRef}
      whileInView="inview"
      initial="initial"
      variants={variants}
      className="max-md:mx-auto w-1/3 md:w-full origin-bottom relative group"
    >
      <Image src={arProduct} alt="ar product" className="size-full" />
      <div className="absolute w-0 opacity-0 max-md:hidden md:group-hover:w-[84%] group-hover:opacity-100 transition-all right-[8%] top-0 -z-10 h-[120%] perspective-normal">
        <div className="size-full border-4 rotate-x-[55deg] rounded-6xl border-secondary-500" />
      </div>
    </motion.div>
  );
};

export default ARproduct;
