import Image from "next/image";

import HomeCategoryBG from "@/assets/images/homeCategoryBG.png";

const BackgroundSection = () => {
  return (
    <div className="drop-shadow-xl-gray absolute inset-x-0 bottom-0 -top-[8%] xl:-top-[20%] -z-10">
      <div className="w-full aspect-[1248/328] bg-white clip-path-url-[#home-category] masked-element relative">
        <Image
          src={HomeCategoryBG}
          className="opacity-50"
          alt="category bg"
          fill
        />
      </div>
    </div>
  );
};

export default BackgroundSection;
