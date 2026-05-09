import Image from "next/image";

import DesktopBG1 from "@/assets/images/heroDesktopBG1.svg";
import DesktopBG2 from "@/assets/images/heroDesktopBG2.svg";
import HeroImage from "@/assets/images/heroSectionImage.png";
import Button from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="container relative isolate flex py-20">
      <div className="flex justify-between absolute w-full inset-0 -z-10">
        <DesktopBG1 />
        <DesktopBG2 className="mt-auto" />
      </div>
      <div className="w-max flex flex-col gap-6">
        <h1 className="font-black text-5xl text-gray-500 leading-[160%]">
          یاتاک <br /> رویای شیرین <br /> خوابی آرام
        </h1>
        <p className="text-3xl font-light text-gray-500">سرویس خواب مینیمال</p>
        <Button shadow="sm" className="max-w-full w-full" variant="secondary">
          خرید
        </Button>
      </div>
      <div className="w-2/3 ms-auto flex items-end">
        <Image
          src={HeroImage}
          className="size-full object-contain"
          alt="hero image"
        />
      </div>
    </section>
  );
};

export default Hero;
