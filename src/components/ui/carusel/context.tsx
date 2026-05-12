import type { UseEmblaCarouselType } from "embla-carousel-react";
import type { PropsWithChildren } from "react";

import { createContext, use, useMemo } from "react";
import { createStore, useStore } from "zustand";

interface CaruselContextState {
  emblaApi: UseEmblaCarouselType["1"];
  emblaRef: UseEmblaCarouselType["0"];
}

interface CaruselStore extends CaruselContextState {
  canScroll?: boolean;
  actions: {
    setCanScroll: (canScroll: boolean) => void;
  };
}

const createCaruselStore = (init: Omit<CaruselStore, "actions">) => {
  return createStore<CaruselStore>((set) => ({
    canScroll: true,
    actions: { setCanScroll: (canScroll) => set({ canScroll }) },
    ...init,
  }));
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

export function useCaruselContext<T>(selector: (state: CaruselStore) => T): T {
  const store = use(CaruselContext);
  if (!store) throw new Error("Missing Provider in the tree");
  return useStore(store, selector);
}
