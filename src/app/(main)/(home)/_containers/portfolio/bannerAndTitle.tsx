import Image from "next/image";

import banner from "@/assets/images/catalogBanner.jpg";
import catalog from "@/assets/images/catalogImage.png";
import ButtonWithArrow from "@/components/ui/buttonWithArrow";

const BannerAndTitle = () => {
  return (
    <div className="rounded-4xl md:rounded-7xl flex-1/4 min-w-min md:overflow-hidden shadow-sm-gray relative isolate flex flex-col md:gap-4 p-6">
      <h4 className="text-base xl:w-1/2 md:mx-auto md:text-4xl font-bold md:text-center py-4 leading-[160%]">
        کاتالـــوگ محصـولات
      </h4>
      <ButtonWithArrow
        containerClassName="mt-auto md:w-full w-1/2 sm:w-1/3"
        className="py-2 max-md:text-xs max-md:min-h-10"
      >
        مشاهده
      </ButtonWithArrow>

      <Image
        src={catalog}
        alt="catalog"
        className="absolute -bottom-1/8 end-0 md:bottom-1/4 w-1/3 max-md:object-bottom -z-10 md:-right-1/4 max-md:h-full object-contain md:w-full "
      />
      <Image
        src={banner}
        alt="catalog baner"
        fill
        className="-z-20 object-cover opacity-20 rounded-4xl md:rounded-7xl"
      />
    </div>
  );
};

export default BannerAndTitle;
