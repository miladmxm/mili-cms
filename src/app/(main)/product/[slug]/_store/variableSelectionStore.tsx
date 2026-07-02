/* eslint-disable react-hooks/refs */
"use client";

import type { PropsWithChildren } from "react";
import type { StoreApi } from "zustand";

import { createContext, use, useRef } from "react";
import { createStore, useStore } from "zustand";

interface SelectVariableAction {
  setSelectedVariables: (variable: Record<string, string>) => void;
}

interface SelectVariableStates extends SelectVariableAction {
  selectedVariables: Record<string, string>;
}

const SelectVariableContext =
  createContext<StoreApi<SelectVariableStates> | null>(null);
SelectVariableContext.displayName = "SelectVariableContext";

const SelectVariableProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<StoreApi<SelectVariableStates>>(null);

  if (storeRef.current === null) {
    storeRef.current = createStore<SelectVariableStates>((set) => ({
      selectedVariables: {},
      setSelectedVariables: (variable) =>
        set((state) => ({
          selectedVariables: { ...state.selectedVariables, ...variable },
        })),
    }));
  }

  return (
    <SelectVariableContext value={storeRef.current}>
      {children}
    </SelectVariableContext>
  );
};

export default SelectVariableProvider;

export function useSelectVariableContext<T>(
  selector: (state: SelectVariableStates) => T,
): T {
  const store = use(SelectVariableContext);
  if (!store) throw new Error("Missing Provider in the tree");
  return useStore(store, selector);
}
