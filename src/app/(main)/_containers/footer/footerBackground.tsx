import type { PropsWithChildren } from "react";

import Rectanglebg from "@/assets/images/rectangleBG.svg";

const FooterBackground = ({ children }: PropsWithChildren) => {
  return (
    <div className="pt-8 pb-6 md:pt-18 bg-primary-500 clip-path-url-[#pillow-mobile] xl:clip-path-url-[#pillow-desktop] relative isolate overflow-hidden px-10">
      <Rectanglebg className="w-2/3 md:w-1/2 absolute -z-10 left-0 top-0 -translate-x-1/3 -translate-y-1/4" />
      <Rectanglebg className="w-2/3 md:w-1/2 absolute -z-10 right-0 bottom-0 translate-x-1/3 translate-y-1/3" />
      {children}
    </div>
  );
};

export default FooterBackground;
