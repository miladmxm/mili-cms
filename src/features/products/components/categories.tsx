import { getAllParentCategories } from "../dal/queries";

const Categories = async () => {
  const allCategories = await getAllParentCategories([
    "name",
    "id",
    "image",
    "slug",
  ]);

  if (!allCategories.success) return null;

  return (
    <div className="flex justify-center items-center gap-5 flex-col">
      {allCategories.data.map((category) => (
        <div key={category.id}>{category.name}</div>
      ))}
    </div>
  );
};

export default Categories;
