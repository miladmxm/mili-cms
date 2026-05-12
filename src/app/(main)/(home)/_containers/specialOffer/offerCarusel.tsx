"use client";

import type { UseEmblaCarouselType } from "embla-carousel-react";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";

import type { Product } from "@/services/product/type";

import ComingArrowRight from "@/assets/icons/comingArrowRight.svg";
import ProductCard from "@/components/ui/productCard";

const Controllers = ({
  emblaApi,
}: {
  emblaApi?: UseEmblaCarouselType["1"];
}) => {
  const [canNext, setCanNext] = useState<boolean>(
    emblaApi?.canScrollNext() || true,
  );
  const [canPrev, setCanPrev] = useState<boolean>(
    emblaApi?.canScrollPrev() || true,
  );
  useEffect(() => {
    if (emblaApi) {
      const setStatus = () => {
        setCanNext(emblaApi.canScrollNext());
        setCanPrev(emblaApi.canScrollPrev());
      };

      emblaApi.on("select", setStatus);

      setStatus();

      return () => {
        emblaApi.off("select", setStatus);
      };
    }
  }, [emblaApi]);

  const scrollNext = () => {
    if (emblaApi?.canScrollNext()) {
      emblaApi.scrollNext();
    }
  };

  const scrollPrev = () => {
    if (emblaApi?.canScrollPrev()) {
      emblaApi.scrollPrev();
    }
  };

  return (
    <div className="flex *:disabled:opacity-40 items-center gap-2">
      <button
        type="button"
        onClick={scrollPrev}
        disabled={!canPrev}
        className="size-10 md:size-12 *:size-full p-2.5 border border-primary-600 rounded-full"
      >
        <ComingArrowRight />
      </button>
      <div className="border-b border-primary-600 w-full" />
      <button
        type="button"
        disabled={!canNext}
        onClick={scrollNext}
        className="size-10 md:size-12 *:size-full p-2.5 border border-primary-600 rounded-full"
      >
        <ComingArrowRight className="rotate-180" />
      </button>
    </div>
  );
};

const OfferCarusel = ({ products }: { products: Product[] }) => {
  const [canScroll, setCanScroll] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    direction: "rtl",
    active: canScroll,
  });
  useEffect(() => {
    const calcCanScroll = () => {
      const isActive =
        emblaApi?.containerNode().scrollWidth !==
        emblaApi?.containerNode().offsetWidth;

      setCanScroll(isActive);
    };

    calcCanScroll();
    emblaApi?.on("reInit", calcCanScroll);
    emblaApi?.on("resize", calcCanScroll);
    window.addEventListener("resize", calcCanScroll);

    return () => {
      emblaApi?.off("reInit", calcCanScroll);
      window.removeEventListener("resize", calcCanScroll);
      emblaApi?.off("resize", calcCanScroll);
    };
  }, [emblaApi]);
  return (
    <div className="w-full @container">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container gap-1 items-stretch">
          {products.map((product) => {
            return (
              <div
                key={product.id}
                className="flex-size-100 md:flex-size-65 lg:flex-size-45 xl:flex-size-33 p-4"
              >
                <ProductCard {...product} />
              </div>
            );
          })}
        </div>
      </div>
      {canScroll && <Controllers emblaApi={emblaApi} />}
    </div>
  );
};

export default OfferCarusel;
