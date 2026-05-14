"use client";

import { motion } from "motion/react";
import Image from "next/image";

import installmentImagePng from "@/assets/images/installmentImage.png";

const InstallmentImage = () => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, type: "spring" }}
      className="center"
      viewport={{ once: true, amount: 0.6 }}
    >
      <Image src={installmentImagePng} alt="installment image" />
    </motion.div>
  );
};

export default InstallmentImage;
