"use client";

import type { PropsWithChildren } from "react";

import ComingArrowRight from "@/assets/icons/comingArrowRight.svg";
import { cn } from "@/lib/utils";

import type { CaruselInitParams } from "./useCarusel";

import CaruselContextProvider, { useCaruselContext } from "./context";
import { useCarusel, useControllers, useToNext, useToPrev } from "./useCarusel";

export const ToNext = ({ className }: { className?: string }) => {
  const { canNext, scrollNext } = useToNext();

  return (
    <button
      type="button"
      disabled={!canNext}
      onClick={scrollNext}
      className={cn(
        "size-10 aspect-square md:size-12 *:size-full p-2.5 border border-primary-600 rounded-full",
        className,
      )}
    >
      <ComingArrowRight className="rotate-180" />
    </button>
  );
};

export const ToPrev = ({ className }: { className?: string }) => {
  const { canPrev, scrollPrev } = useToPrev();
  return (
    <button
      type="button"
      onClick={scrollPrev}
      disabled={!canPrev}
      className={cn(
        "size-10 aspect-square md:size-12 *:size-full p-2.5 border border-primary-600 rounded-full",
        className,
      )}
    >
      <ComingArrowRight />
    </button>
  );
};

export const CaruselControllers = ({
  className,
  dynamicHidden = true,
}: {
  className?: string;
  dynamicHidden?: boolean;
}) => {
  const canScroll = useCaruselContext((state) => state.canScroll);
  if (!canScroll && dynamicHidden) return null;
  return (
    <div
      className={cn("flex *:disabled:opacity-40 items-center gap-2", className)}
    >
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
      <div className={cn("embla__container items-stretch", containerClassName)}>
        {children}
      </div>
    </div>
  );
};

const Carusel = ({
  children,
  config,
  plugin,
}: PropsWithChildren<CaruselInitParams>) => {
  const { emblaApi, emblaRef } = useCarusel({ config, plugin });
  return (
    <CaruselContextProvider emblaRef={emblaRef} emblaApi={emblaApi}>
      {children}
    </CaruselContextProvider>
  );
};

export default Carusel;
