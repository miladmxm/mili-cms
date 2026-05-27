"use client";

import { use } from "react";

import type { Product } from "@/services/product/type";

import Button from "@/components/ui/button";
import Spiner from "@/components/ui/spiner";
import { UI_SETTING } from "@/constant/uiSetting";
import { useSetParams } from "@/hooks/useSetParams";

const Loadmore = ({
  productsPromise,
}: {
  productsPromise: Promise<Product[]>;
}) => {
  const products = use(productsPromise);
  const { applyParams, searchParams, isPendding } = useSetParams();
  const page = +(searchParams.get("page") || 1);

  const nextpage = () => {
    applyParams({ page: String(page + 1) }, { scroll: false });
  };

  if (page * UI_SETTING.shop_products_limit > products.length) return null;
  return (
    <div className="w-max mx-auto my-10">
      <Button
        disabled={isPendding}
        shadow="sm"
        onClick={nextpage}
        variant="secondary"
        className="flex gap-2 items-center"
      >
        بارگذاری بیشتر
        {isPendding && <Spiner />}
      </Button>
    </div>
  );
};

export default Loadmore;
