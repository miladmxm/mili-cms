import type { Option, Product } from "@/services/product/type";

import ColorVariableItem from "./colorVariable";
import ErrorMessage from "./errorMessage";

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
  if (colorIndex === -1) return null;
  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {byOptionId[colorOptionId]?.map((variable) => (
          <ColorVariableItem key={variable.value} {...variable} />
        ))}
      </div>
      <ErrorMessage optionId={colorOptionId} />
    </div>
  );
};

export default ColorVariables;
