import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import Image from "next/image";
import React from "react";

import { getNewProducts } from "../dal/queries";

const NewProducts = async () => {
  const products = await getNewProducts();
  if (!products.success) return null;
  return (
    <div className="my-10 p-5">
      {products.data.map((prod) => {
        const sanitizedPriceHtml = DOMPurify(new JSDOM("").window).sanitize(
          prod.price_html,
        );

        return (
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
                __html: sanitizedPriceHtml,
              }}
            ></span>
          </div>
        );
      })}
    </div>
  );
};

export default NewProducts;
