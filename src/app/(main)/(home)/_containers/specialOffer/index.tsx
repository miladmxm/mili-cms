"use client";

import useEmblaCarousel from "embla-carousel-react";

import H3 from "@/components/ui/h2";

const ProductOfferCard = () => {
  return null;
};

const SpecialOffer = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    direction: "rtl",
  });
  console.log(emblaApi?.slidesInView().length, emblaApi?.slideNodes().length);
  return (
    <section className="container">
      <H3>پیشنهاد ویژه</H3>
      <div className="w-full @container">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container gap-1">
            <div className="flex-size-100 md:flex-size-33 h-60 bg-gray-500">
              Slide 1
              <ProductOfferCard />
            </div>
            <div className="flex-size-100 md:flex-size-33 h-60 bg-gray-500">
              Slide 2
            </div>
            <div className="flex-size-100 md:flex-size-33 h-60 bg-gray-500">
              Slide 3
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;
