import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";

import { useCaruselContext } from "./context";

export const useCarusel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    direction: "rtl",
  });
  return { emblaApi, emblaRef };
};

export const useControllers = () => {
  const emblaApi = useCaruselContext((state) => state.emblaApi);
  const [canScroll, setCanScroll] = useState(true);

  useEffect(() => {
    const calcCanScroll = () => {
      const isActive =
        emblaApi?.containerNode().scrollWidth !==
        emblaApi?.containerNode().offsetWidth;
      if (isActive) emblaApi?.emit("reInit");
      else emblaApi?.emit("destroy");
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
  return { canScroll };
};

export const useToNext = () => {
  const emblaApi = useCaruselContext((state) => state.emblaApi);
  const [canNext, setCanNext] = useState<boolean>(
    emblaApi?.canScrollNext() || true,
  );

  useEffect(() => {
    if (emblaApi) {
      const setStatus = () => {
        setCanNext(emblaApi.canScrollNext());
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

  return { scrollNext, canNext };
};

export const useToPrev = () => {
  const emblaApi = useCaruselContext((state) => state.emblaApi);
  const [canPrev, setCanPrev] = useState<boolean>(
    emblaApi?.canScrollPrev() || true,
  );
  useEffect(() => {
    if (emblaApi) {
      const setStatus = () => {
        setCanPrev(emblaApi.canScrollPrev());
      };

      emblaApi.on("select", setStatus);

      setStatus();

      return () => {
        emblaApi.off("select", setStatus);
      };
    }
  }, [emblaApi]);

  const scrollPrev = () => {
    if (emblaApi?.canScrollPrev()) {
      emblaApi.scrollPrev();
    }
  };

  return { canPrev, scrollPrev };
};
