"use client";

import type { Product } from "@/services/product/type";

import Carusel, {
  CaruselContent,
  CaruselControllers,
  ToNext,
} from "@/components/ui/carusel";
import SimpleProductCard from "@/components/ui/simpleProductCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const MoreProductCarusel = ({
  products,
  dir = "rtl",
}: {
  products: Product[];
  dir?: "ltr" | "rtl";
}) => {
  return (
    <div
      className={cn("relative flex flex-col gap-6 md:flex-row", {
        "dir-ltr": dir === "ltr",
      })}
    >
      <Carusel config={{ loop: true, direction: dir }}>
        <div className=" max-md:hidden absolute z-0 inset-0 flex flex-col gap-6 items-end justify-center">
          <ToNext className={dir === "ltr" ? "rotate-180" : ""} />
          <div className="-z-10 h-22 border-primary-600 border-y w-11/12" />
        </div>
        <div className="w-full md:w-5/6 z-10">
          <CaruselContent>
            {products.map((product) => (
              <div
                className="flex-size-100 md:flex-size-60 xl:flex-size-33 px-4"
                key={product.id}
              >
                <SimpleProductCard className="h-full dir-rtl" {...product} />
              </div>
            ))}
          </CaruselContent>
        </div>
        <CaruselControllers className="md:hidden" />
      </Carusel>
    </div>
  );
};

const MoreProductCarusels = ({ products }: { products: Product[] }) => {
  const isMobile = useIsMobile();
  const ProductsSectionOne = products.slice(0, Math.round(products.length / 2));
  const ProductsSectionTwo = products.slice(
    Math.round(products.length / 2),
    products.length,
  );
  return (
    <>
      <MoreProductCarusel products={isMobile ? products : ProductsSectionOne} />
      {!isMobile && (
        <MoreProductCarusel dir="ltr" products={ProductsSectionTwo} />
      )}
    </>
  );
};

export default MoreProductCarusels;
