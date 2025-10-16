import Image from "next/image";
import React from "react";

import { getNewProducts, getProductBySlug } from "../dal/queries";

const NewProducts = async () => {
  const products = await getNewProducts();
  const pr = await getProductBySlug("double-bed-set-natural-wood-acacia-mulch");
  if (pr.success) console.log(pr.data);
  if (!products.success) return null;
  return (
    <div className="my-10 p-5">
      {products.data.map(({ id, images, name, prices }) => (
        <div key={id}>
          {images[0] && (
            <Image
              height={300}
              width={400}
              alt={images[0].alt}
              blurDataURL={images[0].thumbnail}
              src={images[0].src}
              placeholder="blur"
            />
          )}
          <h3>{name}</h3>
          <span>
            {prices.priceRange ? (
              <span>
                {prices.priceRange.minAmount} تا {prices.priceRange.maxAmount}
              </span>
            ) : (
              prices.regularPrice
            )}
          </span>
        </div>
      ))}
    </div>
  );
};

export default NewProducts;
