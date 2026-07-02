"use client";

import { AnimatePresence, motion } from "motion/react";

import { useGetMetadata } from "../_hooks/useGetMetadata";

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
              <motion.span
                key={stock}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", duration: 0.4 }}
              >
                {stock.toLocaleString("fa")}
              </motion.span>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Stock;
