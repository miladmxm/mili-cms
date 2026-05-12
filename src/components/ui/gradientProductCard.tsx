import type { Product } from "@/services/product/type";

import { DiscountedPrice } from "@/features/product/components/ui/finalPrice";

import ButtonWithArrow from "./buttonWithArrow";
import DefaultImage from "./defaultImage";

const GradientProductCard = ({ name, slug, thumbnail, metadata }: Product) => {
  return (
    <div className="rounded-8xl aspect-[256/348] overflow-hidden isolate p-8 relative flex flex-col gap-4 justify-end">
      <DefaultImage
        image={thumbnail}
        alt={name}
        className="absolute inset-0 size-full object-cover -z-20"
      />
      <div className="bg-gradient-to-t from-20% from-primary-900 to-transparent inset-0 absolute -z-10" />
      <h5 className="text-white font-bold">{name}</h5>
      <div className="flex justify-between text-white font-bold">
        <strong>قیمت:</strong>
        <strong>
          <DiscountedPrice metadata={metadata} />
        </strong>
      </div>
      <ButtonWithArrow href={`#${slug}`} variant="light">
        خرید
      </ButtonWithArrow>
    </div>
  );
};

export default GradientProductCard;
