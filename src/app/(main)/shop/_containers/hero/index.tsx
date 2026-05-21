import Image from "next/image";

import banner from "@/assets/images/shopPageHero.png";

const HeroShop = () => {
  return (
    <section className="text-gray-500 justify-between gap-4 items-center pt-20 container flex">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl md:text-5xl font-black">محصولات</h1>
        <p className="text-xl md:text-4xl font-extralight text-nowrap">
          تمام محصولات
        </p>
      </div>
      <div className="flex-auto">
        <Image
          className="w-full translate-y-1/12"
          src={banner}
          alt="shop banner"
        />
      </div>
    </section>
  );
};

export default HeroShop;
