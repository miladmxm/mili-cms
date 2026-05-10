import Image from "next/image";

import HomeCategoryBG from "@/assets/images/homeCategoryBG.png";

const BackgroundSection = () => {
  return (
    <>
      <svg
        className="sr-only"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1 1"
      >
        <defs>
          <clipPath id="responsiveClip" clipPathUnits="objectBoundingBox">
            <path d="M0 0.2366C0 0.1027 0.0321 0.0005 0.0675 0.0206C0.1676 0.0775 0.3584 0.1745 0.4968 0.1745C0.6358 0.1745 0.8311 0.0766 0.9327 0.0198C0.968 0 1 0.1021 1 0.2357V0.784C1 0.9033 0.9742 1 0.9423 1H0.5H0.0577C0.0258 1 0 0.9033 0 0.784V0.2366Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="drop-shadow-xl-gray absolute inset-x-0 bottom-0 -top-[8%] xl:-top-[20%] -z-10">
        <div className="w-full aspect-[1248/328] bg-white clip-path-url-[#responsiveClip] masked-element relative">
          <Image
            src={HomeCategoryBG}
            className="opacity-50"
            alt="category bg"
            fill
          />
        </div>
      </div>
    </>
  );
};

export default BackgroundSection;
