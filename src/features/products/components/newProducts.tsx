import Image from "next/image";
import React from "react";

import purify from "@/utils/purify";

import { getNewProducts } from "../dal/queries";

const NewProducts = async () => {
  const products = await getNewProducts();
  if (!products.success) return null;
  return (
    <div className="my-10 p-5">
      {products.data.map((prod) => (
        <div key={prod.id}>
          <Image
            height={300}
            width={400}
            alt={prod.images[0].alt}
            blurDataURL={prod.images[0].thumbnail}
            src={prod.images[0].src}
            placeholder="blur"
          />
          <h3>{prod.name}</h3>
          <span
            dangerouslySetInnerHTML={{
              __html: purify(prod.price_html),
            }}
          ></span>
        </div>
      ))}
    </div>
  );
};

export default NewProducts;
