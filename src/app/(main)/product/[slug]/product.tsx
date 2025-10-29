import type { FC } from "react";

import { redirect } from "next/navigation";
import React, { use } from "react";

import type { DalReturn } from "@/dal/types";
import type { Product } from "@/features/products/types/products";

const RenderProduct: FC<{ product: Promise<DalReturn<Product>> }> = ({
  product,
}) => {
  const productData = use(product);
  if (!productData.success) return redirect("/shop");
  return (
    <section>
      <h1>{productData.data.name}</h1>
      <div>{productData.data.description}</div>
    </section>
  );
};

export default RenderProduct;
