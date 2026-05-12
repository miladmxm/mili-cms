import type { UseEmblaCarouselType } from "embla-carousel-react";
import type { PropsWithChildren } from "react";

import { createContext, use, useMemo } from "react";
import { createStore, useStore } from "zustand";

interface CaruselContextState {
  emblaApi: UseEmblaCarouselType["1"];
}

const createCaruselStore = (init: CaruselContextState) => {
  return createStore<CaruselContextState>(() => ({ ...init }));
};

type CreateCaruselStore = ReturnType<typeof createCaruselStore>;

const CaruselContext = createContext<CreateCaruselStore | undefined>(undefined);
CaruselContext.displayName = "CaruselContext";

type CampaignCardProviderProps = PropsWithChildren<CaruselContextState>;

const CaruselContextProvider = ({
  children,
  ...props
}: CampaignCardProviderProps) => {
  const store = useMemo(() => createCaruselStore(props), [props]);
  return <CaruselContext value={store}> {children}</CaruselContext>;
};

export default CaruselContextProvider;

export function useCaruselContext<T>(
  selector: (state: CaruselContextState) => T,
): T {
  const store = use(CaruselContext);
  if (!store) throw new Error("Missing Provider in the tree");
  return useStore(store, selector);
}
