"use client";

import { AnimatePresence, motion } from "motion/react";

import { useGetMetadata } from "../_hooks/useGetMetadata";

const StockContent = () => {
  const { stock } = useGetMetadata();

  if (stock === -1) {
    return null;
  }

  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4 }}
      className="flex gap-2"
    >
      {stock === 0 ? (
        <span>ناموجود</span>
      ) : (
        <>
          <span>تعداد موجودی</span>
          {stock}
        </>
      )}
    </motion.div>
  );
};

const Stock = () => {
  const { stock } = useGetMetadata();

  return (
    <AnimatePresence mode="sync">
      {stock !== -1 && (
        <motion.div
          exit={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [0.5, 1], opacity: 1 }}
          transition={{ duration: 0.4, type: "spring" }}
          className="flex gap-2"
        >
          {stock === 0 ? (
            <span>ناموجود</span>
          ) : (
            <>
              <span>تعداد موجودی</span>
              {stock}
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Stock;
