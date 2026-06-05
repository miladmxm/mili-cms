"use client";

import type { Product } from "@/services/product/type";

import Carusel, {
  CaruselContent,
  ToNext,
  ToPrev,
} from "@/components/ui/carusel";
import DefaultImage from "@/components/ui/defaultImage";

import GallerySidebar from "./gallerySidebar";

const GallerySlider = ({ gallery }: { gallery: Product["gallery"] }) => {
  return (
    <div className="flex rounded-4xl bg-primary-50">
      <GallerySidebar />
      <Carusel
        config={{ loop: true, align: "center" }}
        plugin={{ classNames: true }}
      >
        <div className="w-full isolate aspect-640/582 py-8 overflow-hidden flex-col bg-primary-500/50 rounded-4xl center relative">
          <div className="inset-s-0 w-1/10 inset-y-0 z-10 to-transparent from-primary-300 bg-linear-to-l absolute " />
          <div className="inset-e-0 w-1/10 inset-y-0 z-10 to-transparent from-primary-300 bg-linear-to-r absolute " />
          <CaruselContent viewportClassName="flex-auto center">
            {gallery.map((media) => (
              <div
                key={media.id}
                className="flex-size-50 [&.is-snapped>div]:scale-110"
              >
                <div className="scale-50 transition-all ">
                  <DefaultImage key={media.id} image={media} />
                </div>
              </div>
            ))}
          </CaruselContent>
          <div className="w-2/3 aspect-420/175 -z-10 bg-linear-to-b bottom-1/5 from-[#EBE9E8] to-primary-500 absolute rounded-[100%]" />
          <div className="flex justify-between absolute inset-x-2/12 bottom-1/12">
            <ToPrev />
            <ToNext />
          </div>
        </div>
      </Carusel>
    </div>
  );
};

export default GallerySlider;
