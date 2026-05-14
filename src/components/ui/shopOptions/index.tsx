import type { ComponentProps } from "react";

import ImmediateShipping from "@/assets/icons/immediateShipping.svg";
import RereturnGoods from "@/assets/icons/returnGoods.svg";
import Support from "@/assets/icons/support.svg";
import Warranty from "@/assets/icons/warranty.svg";

import OptionsCard from "./optionsCard";

const shopOptionItems: ComponentProps<typeof OptionsCard>[] = [
  {
    icon: Warranty,
    subTitle: "ضمانت 18 ماهه کالای یاتاک",
    title: "گارانتی",
  },
  {
    icon: ImmediateShipping,
    title: "ارسال فوی",
    subTitle: "تحویل فوری (برای هر تهران)",
  },
  { icon: RereturnGoods, subTitle: "ضمانت برگشت کالا", title: "برگشت کالا" },
  {
    icon: Support,
    subTitle: "مشاوره ی خرید و پشتیبانی",
    title: "پشتیبانی",
  },
];

const ShopOptions = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 @container gap-10 px-4 ld:px-22">
      {shopOptionItems.map(({ icon, subTitle, title }) => (
        <OptionsCard
          key={title}
          icon={icon}
          subTitle={subTitle}
          title={title}
        />
      ))}
    </div>
  );
};

export default ShopOptions;
