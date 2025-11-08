import type { FC } from "react";

import Image from "next/image";
import { redirect } from "next/navigation";
import { use } from "react";

import type { DalReturn } from "@/dal/types";
import type { Product } from "@/features/products/types/products";

import AddToCart from "@/features/products/components/attToCart";
import purify from "@/utils/purify";

const RenderProduct: FC<{ product: Promise<DalReturn<Product>> }> = ({
  product,
}) => {
  const productData = use(product);
  if (!productData.success) return redirect("/shop");
  const { description, images, name, id } = productData.data;

  return (
    <section>
      <h1>{name}</h1>
      <AddToCart id={id} />
      <Image height={400} width={400} alt={images[0].alt} src={images[0].src} />
      <article
        dangerouslySetInnerHTML={{ __html: purify(description) }}
      ></article>
    </section>
  );
};

export default RenderProduct;
