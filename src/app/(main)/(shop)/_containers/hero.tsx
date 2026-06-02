import Image from "next/image";

import type { Media } from "@/services/media/type";

import banner from "@/assets/images/shopPageHero.png";
import DefaultImage from "@/components/ui/defaultImage";

const HeroShop = ({
  categoryName,
  image,
}: {
  image?: Media;
  categoryName?: string;
}) => {
  return (
    <section className="text-gray-500 justify-between gap-4 items-center pt-12 container flex">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl md:text-5xl font-black">محصولات</h1>
        <p className="text-xl md:text-4xl font-extralight text-nowrap">
          {categoryName ? categoryName : "تمام محصولات"}
        </p>
      </div>
      <div className="flex-auto">
        {image ? (
          <DefaultImage
            className="w-full max-h-[38svh] object-contain object-bottom-left translate-y-1/12"
            alt={categoryName || "shop banner"}
          />
        ) : (
          <Image
            src={banner}
            className="w-full max-h-[38svh] object-contain object-bottom-left translate-y-1/12"
            alt={categoryName || "shop banner"}
          />
        )}
      </div>
    </section>
  );
};

export default HeroShop;
