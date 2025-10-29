import { cacheLife } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { getNewProducts } from "../dal/queries";

const NewProducts = async () => {
  "use cache";
  cacheLife("hours");
  const products = await getNewProducts();
  if (!products.success) return null;
  return (
    <div className="my-10 p-5">
      {products.data.map(({ id, slug, images, name, prices }) => (
        <div key={id}>
          {images[0] && (
            <Link href={`/product/${slug}`}>
              <Image
                height={300}
                width={400}
                alt={images[0].alt}
                blurDataURL={images[0].thumbnail}
                src={images[0].src}
                placeholder="blur"
              />
            </Link>
          )}
          <h3>
            <Link href={`/product/${slug}`}>{name}</Link>
          </h3>
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
