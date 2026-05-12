import type { PropsWithChildren } from "react";

import type { Product } from "@/services/product/type";

import Rectanglebg from "@/assets/images/rectangleBG.svg";

const GoodPriceCarusel = ({
  products,
  children,
}: PropsWithChildren<{ products: Product[] }>) => {
  console.log(products);
  return (
    <div className="py-8 md:py-18 bg-primary-500 h-screen clip-path-url-[#pillow-mobile] xl:clip-path-url-[#pillow-desktop] relative">
      <Rectanglebg className="absolute left-0 top-0 -translate-x-1/3 -translate-y-1/4" />
      <Rectanglebg className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3" />
      {children}
    </div>
  );
};

export default GoodPriceCarusel;
