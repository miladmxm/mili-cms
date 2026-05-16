"use client";

import Image from "next/image";
import { useState } from "react";

import type { Portfolio } from "@/services/portfolio/type";

import { cn } from "@/lib/utils";

const Catalog = ({
  portfolio,
  className,
}: {
  portfolio: Portfolio[];
  className?: string;
}) => {
  const [activeId, setActiveId] = useState("");

  const handleClickToEachItem = (id: string) => {
    if (activeId === id) setActiveId("");
    else setActiveId(id);
  };

  return (
    <div
      className={cn(
        "md:flex-row flex flex-col gap-2 md:h-[600px] md:max-h-[70svh]",
        className,
      )}
    >
      {portfolio.map(({ id, thumbnail, title }) => (
        <div
          onPointerDown={() => handleClickToEachItem(id)}
          key={id}
          className={cn(
            "cursor-pointer shadow-sm-gray max-md:h-20 rounded-4xl md:rounded-7xl overflow-hidden md:flex-1/5 transition-all",
            {
              "md:flex-3/5 lg:flex-2/5 max-md:h-60": activeId === id,
            },
          )}
        >
          <Image
            className="size-full object-cover"
            src={{ src: thumbnail.url, width: 400, height: 800 }}
            alt={title}
            title={title}
          />
        </div>
      ))}
    </div>
  );
};

export default Catalog;
