import type { PropsWithChildren } from "react";

import type { OptionItem, Product } from "@/services/product/type";

import ErrorMessage from "./errorMessage";
import VariableItem from "./variableItem";

const VariableContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="rounded-full bg-white p-6 flex gap-4 items-center">
      {children}
    </div>
  );
};

const VarableItems = ({ variableItems }: { variableItems: OptionItem[] }) => {
  return (
    <div className="flex gap-4 flex-auto justify-around">
      {variableItems.map((item) => (
        <VariableItem key={item.id} {...item} />
      ))}
    </div>
  );
};

const EachVariableItem = ({
  optionId,
  name,
  variableItems,
}: {
  name: string;
  optionId: string;
  variableItems: OptionItem[];
}) => {
  return (
    <div>
      <VariableContainer>
        <h5 className="text-gray-500 font-bold">{name} :</h5>
        <VarableItems variableItems={variableItems} />
      </VariableContainer>
      <ErrorMessage optionId={optionId} />
    </div>
  );
};

const Variables = ({ variables }: { variables: Product["variables"] }) => {
  const colorVariableIndex = variables.findIndex(
    ({ slug }) => slug === "color",
  );
  return (
    <div className="flex flex-col gap-6">
      {variables.map(({ items, id, name }, index) => {
        if (colorVariableIndex === index) return null;
        return (
          <EachVariableItem
            key={id}
            name={name}
            optionId={id}
            variableItems={items}
          />
        );
      })}
    </div>
  );
};

export default Variables;
