"use client";

import { motion } from "motion/react";

import { useSelectVariableContext } from "../_store/variableSelectionStore";

const ErrorMessage = ({ optionId }: { optionId: string }) => {
  const showError = useSelectVariableContext((store) => store.showError);
  const selectedVariables = useSelectVariableContext(
    (store) => store.selectedVariables,
  );

  if (!showError || selectedVariables[optionId]) return null;
  return (
    <motion.p
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-sm font-medium py-2 ps-4 text-error"
    >
      انتخاب یک مورد اجباری است
    </motion.p>
  );
};

export default ErrorMessage;
