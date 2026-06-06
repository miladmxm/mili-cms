"use client";

import { motion } from "motion/react";
import { useState } from "react";

import Negative from "@/assets/icons/negative.svg";
import Positive from "@/assets/icons/positive.svg";

const Counter = () => {
  const [count, setCount] = useState(1);
  return (
    <motion.div
      layout
      className="flex divide-x divide-primary-200 px-2 rounded-full max-w-fit bg-white py-4 text-gray-500"
    >
      <button
        className="px-3"
        type="button"
        onClick={() => setCount((prev) => prev + 1)}
      >
        <Positive className="size-2" />
      </button>
      <div className="flex flex-col gap-2 overflow-hidden size-6 center">
        <motion.span key={count} animate={{ y: [-20, 0] }}>
          {count.toLocaleString("fa")}
        </motion.span>
      </div>
      <button
        className="px-3"
        type="button"
        onClick={() => setCount((prev) => prev - 1)}
      >
        <Negative className="size-2" />
      </button>
    </motion.div>
  );
};

export default Counter;
