import type { CSSProperties } from "react";

import type { Product } from "@/services/product/type";

const ColorVariables = ({ variables }: { variables: Product["variables"] }) => {
  const byOptionId = Object.groupBy(variables, ({ optionId }) => optionId);
  const variableOptions = variables.map(({ option }) => option);
  const colorIndex = variableOptions.findIndex(({ slug }) =>
    slug.includes("color"),
  );
  const colorOptionId = variableOptions[colorIndex].id;
  return (
    <div>
      {colorIndex !== -1 && (
        <div className="flex flex-wrap gap-3">
          {byOptionId[colorOptionId]?.map(({ label, value }) => (
            <div key={value}>
              <input
                type="radio"
                className="sr-only peer"
                id={value}
                name={colorOptionId}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorVariables;
