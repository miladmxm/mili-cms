import type { Product } from "@/services/product/type";

import { DiscountedPrice } from "@/features/product/components/ui/finalPrice";
import { cn } from "@/lib/utils";

import ButtonWithArrow from "./buttonWithArrow";
import DefaultImage from "./defaultImage";

const SimpleProductCard = ({
  metadata,
  name,
  slug,
  thumbnail,
  className,
}: Product & { className?: string }) => {
  return (
    <div
      className={cn(
        "rounded-7xl bg-primary-500 overflow-hidden flex flex-col",
        className,
      )}
    >
      <DefaultImage
        image={thumbnail}
        className="rounded-7xl w-full aspect-[300/214]"
      />
      <div className="p-6 flex-auto flex flex-col gap-4">
        <h6 className="text-gray-500">{name}</h6>
        <div className="flex gap-1 justify-between items-center">
          <strong className="text-lg text-gray-500 font-bold">قیمت:</strong>
          <strong className="text-lg text-gray-500 font-bold">
            <DiscountedPrice metadata={metadata} />
          </strong>
        </div>
        <ButtonWithArrow
          containerClassName="mt-auto"
          variant="light"
          href={`#${slug}`}
        >
          مشاهده
        </ButtonWithArrow>
      </div>
    </div>
  );
};

export default SimpleProductCard;
