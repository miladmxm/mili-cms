import { cacheLife } from "next/cache";
import Image from "next/image";

import { getDicountedProducts } from "../dal/queries";

const SpecialOffers = async () => {
  "use cache";
  cacheLife("hours");
  const products = await getDicountedProducts({ offset: 3 });

  if (!products.success) return null;
  return (
    <div>
      {products.data.map(({ id, images, name, prices }) => {
        return (
          <div key={id}>
            {name}
            <br />
            {images[0] && (
              <Image
                height={100}
                width={100}
                alt={images[0].alt}
                src={images[0].src}
              />
            )}
            <br />
            <span>{prices.regularPrice}</span>
            <br />
            <span>{prices.price}</span>
            <span>{prices.currencySymbol}</span>
          </div>
        );
      })}
    </div>
  );
};

export default SpecialOffers;
