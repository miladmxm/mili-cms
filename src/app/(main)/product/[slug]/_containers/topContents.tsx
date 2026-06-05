import type { Product } from "@/services/product/type";

const TopContents = ({ name }: Product) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-gray-500 md:text-xl font-bold">{name}</h1>
    </div>
  );
};

export default TopContents;
