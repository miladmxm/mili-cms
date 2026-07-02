import type { Product } from "@/services/product/type";

import ColorVariableItem from "./colorVariable";
import ErrorMessage from "./errorMessage";

const ColorVariables = ({ variables }: { variables: Product["variables"] }) => {
  const findColorVariable = variables.find(({ slug }) => slug === "color");
  if (!findColorVariable) return;
  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {findColorVariable.items.map((item) => (
          <ColorVariableItem key={item.value} {...item} />
        ))}
      </div>
      <ErrorMessage optionId={findColorVariable.id} />
    </div>
  );
};

export default ColorVariables;
