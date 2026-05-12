import type { PropsWithChildren } from "react";

import type { Product } from "@/services/product/type";

import Rectanglebg from "@/assets/images/rectangleBG.svg";
import Carusel, {
  CaruselContent,
  CaruselControllers,
} from "@/components/ui/carusel";
import GradientProductCard from "@/components/ui/gradientProductCard";

const GoodPriceCarusel = ({
  products,
  children,
}: PropsWithChildren<{ products: Product[] }>) => {
  if (products.length <= 0) return;
  return (
    <Carusel>
      <div className="py-8 md:py-18 bg-primary-500 clip-path-url-[#pillow-mobile] xl:clip-path-url-[#pillow-desktop] relative isolate overflow-hidden px-10">
        <Rectanglebg className="w-2/3 md:w-1/2 absolute -z-10 left-0 top-0 -translate-x-1/3 -translate-y-1/4" />
        <Rectanglebg className="w-2/3 md:w-1/2 absolute -z-10 right-0 bottom-0 translate-x-1/3 translate-y-1/3" />
        {children}
        <CaruselContent>
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-size-100 sm:flex-size-70 md:flex-size-50 lg:flex-size-33 xl:flex-size-25 px-4"
            >
              <GradientProductCard {...product} />
            </div>
          ))}
        </CaruselContent>
      </div>
      <CaruselControllers className="my-4" />
    </Carusel>
  );
};

export default GoodPriceCarusel;
