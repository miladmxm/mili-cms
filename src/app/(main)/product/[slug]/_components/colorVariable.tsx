"use client";

import type { CSSProperties } from "react";

import type { OptionItem } from "@/services/product/type";

import { useSelectVariableContext } from "../_store/variableSelectionStore";

const ColorVariableItem = ({ id, label, optionId, value }: OptionItem) => {
  const selectedVariables = useSelectVariableContext(
    (store) => store.selectedVariables,
  );
  const setSelectedVariables = useSelectVariableContext(
    (store) => store.setSelectedVariables,
  );
  return (
    <div key={value}>
      <input
        onChange={() => {
          setSelectedVariables({ [optionId]: id });
        }}
        checked={selectedVariables[optionId] === id}
        type="radio"
        className="sr-only peer"
        id={value}
        name={optionId}
      />
      <label
        htmlFor={value}
        title={label}
        className="rounded-full block bg-(--variable-color) transition-all size-8 peer-checked:ring-2 cursor-pointer ring-gray-500"
        style={{ "--variable-color": value } as CSSProperties}
      >
        {" "}
      </label>
    </div>
  );
};

export default ColorVariableItem;
