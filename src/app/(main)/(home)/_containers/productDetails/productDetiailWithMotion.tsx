"use client";

import { motion } from "motion/react";
import Image from "next/image";

import productDetails from "@/assets/images/productdetails.png";

const ProductDetiailWithMotion = () => {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
      viewport={{ once: true, amount: 0.6 }}
    >
      <Image className="size-full" src={productDetails} alt="Product details" />
    </motion.div>
  );
};

export default ProductDetiailWithMotion;
