import type { Route } from "next";

import Link from "next/link";

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
  const productLink: Route = `/product/${slug}`;
  return (
    <div
      className={cn(
        "rounded-7xl bg-primary-500 overflow-hidden flex flex-col",
        className,
      )}
    >
      <Link href={productLink}>
        <DefaultImage
          image={thumbnail}
          className="rounded-7xl w-full aspect-300/214"
        />
      </Link>
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
          href={productLink}
        >
          مشاهده
        </ButtonWithArrow>
      </div>
    </div>
  );
};

export default SimpleProductCard;
