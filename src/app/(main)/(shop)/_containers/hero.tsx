import Image from "next/image";

import banner from "@/assets/images/shopPageHero.png";
import DefaultImage from "@/components/ui/defaultImage";
import { getProductCategoryBySlug } from "@/features/product/dal/query";

const HeroShop = async ({
  categorySlug,
}: {
  categorySlug?: Promise<{
    slug: string;
  }>;
}) => {
  const slug = categorySlug ? (await categorySlug).slug : "";
  const category = await getProductCategoryBySlug(slug);
  console.log(category);
  return (
    <section className="text-gray-500 justify-between gap-4 items-center pt-12 container flex">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl md:text-5xl font-black">محصولات</h1>
        <p className="text-xl md:text-4xl font-extralight text-nowrap">
          {category?.name || "تمام محصولات"}
        </p>
      </div>
      <div className="flex-auto">
        {category && category.thumbnail ? (
          <DefaultImage
            className="w-full max-h-[38svh] object-contain object-bottom-left translate-y-1/12"
            alt={category.name || "shop banner"}
            image={category.thumbnail}
          />
        ) : (
          <Image
            src={banner}
            className="w-full max-h-[38svh] object-contain object-bottom-left translate-y-1/12"
            alt="shop banner"
          />
        )}
      </div>
    </section>
  );
};

export default HeroShop;
