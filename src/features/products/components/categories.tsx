import { cacheLife } from "next/cache";
import Image from "next/image";
import Link from "next/link";

import { getAllParentCategories } from "../dal/queries";

const Categories = async () => {
  "use cache";
  cacheLife("hours");
  const allCategories = await getAllParentCategories();
  if (!allCategories.success) return null;
  return (
    <div className="flex justify-center items-center gap-5 flex-col">
      {allCategories.data.map((category) => (
        <div key={category.id}>
          {category.image && (
            <Image
              height={100}
              width={100}
              alt={category.image.alt}
              src={category.image?.src}
            />
          )}
          <Link href={`/shop/${category.slug}`}>{category.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Categories;
