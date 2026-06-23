import type { CSSProperties } from "react";

import type { Option, Product } from "@/services/product/type";

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

  const colorOptionId = variableOptions[colorIndex]?.id;
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
