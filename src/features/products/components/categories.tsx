import { getAllParentCategories } from "../dal/queries";

const Categories = async () => {
  const allCategories = await getAllParentCategories();
  console.log(allCategories);
  return <div></div>;
};

export default Categories;
