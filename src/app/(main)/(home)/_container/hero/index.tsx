import DesktopBG1 from "@/assets/images/heroDesktopBG1.svg";
import DesktopBG2 from "@/assets/images/heroDesktopBG2.svg";

import HeroImageComponent from "./heroImage";
import HeroTextContent from "./heroTextContent";

const Hero = () => {
  return (
    <section className="container min-h-[80svh] relative isolate flex py-20 items-end">
      <div className="flex justify-between absolute w-full inset-x-0 -bottom-[15%] -z-10 h-full items-end ">
        <DesktopBG1 className="translate-x-1/3 flex-2/3" />
        <DesktopBG2 className="flex-1/3" />
      </div>
      <HeroTextContent />
      <HeroImageComponent />
    </section>
  );
};

export default Hero;
