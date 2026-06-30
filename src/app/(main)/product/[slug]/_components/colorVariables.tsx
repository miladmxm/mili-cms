import type { Option, Product } from "@/services/product/type";

import ColorVariableItem from "./colorVariable";

const ColorVariables = ({
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
    <div>
      {colorIndex !== -1 && (
        <div className="flex flex-wrap gap-3">
          {byOptionId[colorOptionId]?.map((variable) => (
            <ColorVariableItem key={variable.value} {...variable} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorVariables;
