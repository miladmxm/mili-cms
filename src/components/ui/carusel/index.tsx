import type { PropsWithChildren } from "react";

import ComingArrowRight from "@/assets/icons/comingArrowRight.svg";
import { cn } from "@/lib/utils";

import CaruselContextProvider from "./context";
import { useCarusel, useToNext, useToPrev } from "./useCarusel";

const ToNext = () => {
  const { canNext, scrollNext } = useToNext();

  return (
    <button
      type="button"
      disabled={!canNext}
      onClick={scrollNext}
      className="size-10 md:size-12 *:size-full p-2.5 border border-primary-600 rounded-full"
    >
      <ComingArrowRight className="rotate-180" />
    </button>
  );
};

const ToPrev = () => {
  const { canPrev, scrollPrev } = useToPrev();
  return (
    <button
      type="button"
      onClick={scrollPrev}
      disabled={!canPrev}
      className="size-10 md:size-12 *:size-full p-2.5 border border-primary-600 rounded-full"
    >
      <ComingArrowRight />
    </button>
  );
};

export const Controllers = () => {
  return (
    <div className="flex *:disabled:opacity-40 items-center gap-2">
      <ToPrev />
      <div className="border-b border-primary-600 w-full" />
      <ToNext />
    </div>
  );
};

const Carusel = ({
  children,
  containerClassName,
  viewportClassName,
}: PropsWithChildren<{
  containerClassName?: string;
  viewportClassName?: string;
}>) => {
  const { emblaApi, emblaRef } = useCarusel();
  return (
    <CaruselContextProvider emblaApi={emblaApi}>
      <div className={cn("embla__viewport", viewportClassName)} ref={emblaRef}>
        <div
          className={cn(
            "embla__container gap-1 items-stretch",
            containerClassName,
          )}
        >
          {children}
        </div>
      </div>
    </CaruselContextProvider>
  );
};

export default Carusel;
