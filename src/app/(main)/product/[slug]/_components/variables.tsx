import type { PropsWithChildren } from "react";

import type { Option, Product } from "@/services/product/type";

import ErrorMessage from "./errorMessage";
import VariableItem from "./variableItem";

const VariableContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="rounded-full bg-white p-6 flex gap-4 items-center">
      {children}
    </div>
  );
};

const VarableItems = ({
  variableItems,
}: {
  variableItems: Product["variables"];
}) => {
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
  variableOption,
  variableItems,
}: {
  variableOption: Option;
  optionId: string;
  variableItems: Product["variables"];
}) => {
  return (
    <div>
      <VariableContainer>
        <h5 className="text-gray-500 font-bold">{variableOption.name} :</h5>
        <VarableItems variableItems={variableItems} />
      </VariableContainer>
      <ErrorMessage optionId={optionId} />
    </div>
  );
};

const Variables = ({
  variables,
  options,
}: {
  variables: Product["variables"];
  options: Option[];
}) => {
  const byOptionId = Object.groupBy(variables, ({ optionId }) => optionId);
  const variableOptions = options.filter(({ id }) =>
    Object.keys(byOptionId).includes(id),
  );
  const colorIndex = variableOptions.findIndex(({ slug }) =>
    slug.includes("color"),
  );
  const colorOptionId = variableOptions[colorIndex].id;
  return (
    <div className="flex flex-col gap-6">
      {Object.keys(byOptionId).map((optionId) => {
        const variableOption = variableOptions.find(
          ({ id }) => id === optionId,
        );
        const variableItems = byOptionId[optionId];
        if (!variableOption || !variableItems || optionId === colorOptionId)
          return null;
        return (
          <EachVariableItem
            key={optionId}
            optionId={optionId}
            variableOption={variableOption}
            variableItems={variableItems}
          />
        );
      })}
    </div>
  );
};

export default Variables;
