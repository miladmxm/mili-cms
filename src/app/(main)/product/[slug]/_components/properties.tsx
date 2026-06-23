/* eslint-disable @eslint-react/no-array-index-key */
import type { ProductProperties } from "@/services/product/type";

const Properties = ({ properties }: { properties: ProductProperties }) => {
  if (!Array.isArray(properties)) return;
  return (
    <div className="grid grid-cols-4 gap-6">
      {properties.map(({ key, value }, i) => (
        <div
          className="bg-white rounded-4xl p-3 gap-3 center flex-col"
          key={`${i}+${key}+${value}`}
        >
          <strong className="text-gray-500">{key}</strong>
          <small className="text-primary-800">{value}</small>
        </div>
      ))}
    </div>
  );
};

export default Properties;
