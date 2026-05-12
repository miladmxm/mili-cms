import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useEffectEvent, useState } from "react";

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
  const { setCanScroll } = useCaruselContext((state) => state.actions);

  const setCanScrollEvent = useEffectEvent(
    (state: Parameters<typeof setCanScroll>[0]) => setCanScroll(state),
  );

  useEffect(() => {
    const calcCanScroll = () => {
      const isActive =
        emblaApi?.containerNode().scrollWidth !==
        emblaApi?.containerNode().offsetWidth;
      if (!isActive) emblaApi?.reInit({ active: false });
      else emblaApi?.reInit({ active: true });
      setCanScrollEvent(isActive);
    };

    calcCanScroll();
    const resize = emblaApi?.on("resize", calcCanScroll);

    let timer: NodeJS.Timeout;

    const windowResizeHandler = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(calcCanScroll, 300);
    };

    window.addEventListener("resize", windowResizeHandler);

    return () => {
      resize?.clear();
      window.removeEventListener("resize", windowResizeHandler);
    };
  }, [emblaApi]);
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
