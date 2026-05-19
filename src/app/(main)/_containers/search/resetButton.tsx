"use client";

import { motion } from "motion/react";
import { useShallow } from "zustand/react/shallow";

import Close from "@/assets/icons/close.svg";

import { setProductsAndArticles, useSearchbarStore } from "./store";

const ResetButton = () => {
  const { articles, products } = useSearchbarStore(
    useShallow((store) => ({
      products: store.products,
      articles: store.articles,
    })),
  );
  const isHaveResult = articles.length > 0 || products.length > 0;

  const handleReset = () => {
    setProductsAndArticles({ articles: [], products: [] });
  };

  return (
    <motion.button
      animate={{ width: isHaveResult ? "10px" : 0 }}
      onClick={handleReset}
      type="reset"
      className="text-error w-0"
    >
      <Close />
    </motion.button>
  );
};

export default ResetButton;
