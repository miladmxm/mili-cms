import Image from "next/image";

import type { Portfolio } from "@/services/portfolio/type";

const Catalog = ({ portfolio }: { portfolio: Portfolio[] }) => {
  return (
    <div className="flex *:flex-1 gap-2 h-[600px] max-h-[70svh]">
      {portfolio.map(({ id, thumbnail, title }) => (
        <div key={id}>
          <Image
            className="size-full rounded-6xl object-cover"
            src={{ src: thumbnail.url, width: 200, height: 800 }}
            alt={title}
            title={title}
          />
        </div>
      ))}
    </div>
  );
};

export default Catalog;
