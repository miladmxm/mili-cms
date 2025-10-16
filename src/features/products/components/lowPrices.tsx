import Image from "next/image";

import { getProductsAtLowPrices } from "../dal/queries";

const LowPrices = async () => {
  const products = await getProductsAtLowPrices({ offset: 4 });
  if (!products.success) return null;
  return (
    <div className="grid border-y grid-cols-4 grid-rows-1">
      <h5>low price</h5>
      {products.data.map(({ id, name, prices, images }) => {
        return (
          <article className="p-4 border" key={id}>
            <h4>{name}</h4>
            <div>
              {prices.priceRange ? (
                <span>
                  {prices.priceRange.minAmount} تا {prices.priceRange.maxAmount}
                </span>
              ) : (
                prices.regularPrice
              )}
            </div>

            <Image
              height={200}
              width={200}
              alt={images[0]?.alt || name}
              blurDataURL={images[0]?.thumbnail}
              src={images[0]?.src}
              placeholder="blur"
            />
          </article>
        );
      })}
    </div>
  );
};

export default LowPrices;
