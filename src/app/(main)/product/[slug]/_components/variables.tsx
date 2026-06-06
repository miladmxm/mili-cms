import type { PropsWithChildren } from "react";

import type { Option, Product } from "@/services/product/type";

import Radio from "@/components/ui/radio";

const VariableContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="rounded-full bg-white p-6 flex gap-4 items-center">
      {children}
    </div>
  );
};

const VariableItem = ({
  id,
  label,
  optionId,
}: Product["variables"][number]) => {
  return (
    <Radio className="flex items-center gap-2" id={id} name={optionId}>
      <label className="cursor-pointer text-gray-500 text-sm" htmlFor={id}>
        {label}
      </label>
    </Radio>
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
          <VariableContainer key={optionId}>
            <h5 className="text-gray-500 font-bold">{variableOption.name} :</h5>
            <VarableItems variableItems={variableItems} />
          </VariableContainer>
        );
      })}
    </div>
  );
};

export default Variables;
