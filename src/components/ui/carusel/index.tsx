"use client";

import type { PropsWithChildren } from "react";

import ComingArrowRight from "@/assets/icons/comingArrowRight.svg";
import { cn } from "@/lib/utils";

import CaruselContextProvider, { useCaruselContext } from "./context";
import { useCarusel, useControllers, useToNext, useToPrev } from "./useCarusel";

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

export const CaruselControllers = ({
  dynamicHidden = true,
}: {
  dynamicHidden?: boolean;
}) => {
  const canScroll = useCaruselContext((state) => state.canScroll);
  if (!canScroll && dynamicHidden) return null;
  return (
    <div className="flex *:disabled:opacity-40 items-center gap-2">
      <ToPrev />
      <div className="border-b border-primary-600 w-full" />
      <ToNext />
    </div>
  );
};

export const CaruselContent = ({
  children,
  containerClassName,
  viewportClassName,
}: PropsWithChildren<{
  containerClassName?: string;
  viewportClassName?: string;
}>) => {
  const emblaRef = useCaruselContext((state) => state.emblaRef);
  useControllers();
  return (
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
  );
};

const Carusel = ({ children }: PropsWithChildren) => {
  const { emblaApi, emblaRef } = useCarusel();
  return (
    <CaruselContextProvider emblaRef={emblaRef} emblaApi={emblaApi}>
      {children}
    </CaruselContextProvider>
  );
};

export default Carusel;
