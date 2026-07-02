"use client";

import type { Product } from "@/services/product/type";

import Radio from "@/components/ui/radio";

import { useSelectVariableContext } from "../store/variableSelectionStore";

const VariableItem = ({
  id,
  label,
  optionId,
}: Product["variables"][number]) => {
  const selectedVariables = useSelectVariableContext(
    (store) => store.selectedVariables,
  );
  const setSelectedVariables = useSelectVariableContext(
    (store) => store.setSelectedVariables,
  );
  return (
    <Radio
      onChange={() => {
        setSelectedVariables({ [optionId]: id });
      }}
      checked={selectedVariables[optionId] === id}
      className="flex items-center gap-2"
      id={id}
      name={optionId}
    >
      <label className="cursor-pointer text-gray-500 text-sm" htmlFor={id}>
        {label}
      </label>
    </Radio>
  );
};

export default VariableItem;
