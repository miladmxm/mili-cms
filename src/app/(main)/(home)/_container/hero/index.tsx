import DesktopBG1 from "@/assets/images/heroDesktopBG1.svg";
import DesktopBG2 from "@/assets/images/heroDesktopBG2.svg";

import HeroImageComponent from "./heroImage";
import HeroTextContent from "./heroTextContent";

const Hero = () => {
  return (
    <section className="container min-h-[80svh] max-md:gap-20 relative isolate flex flex-col md:flex-row py-8 md:py-20 items-end">
      <div className="flex justify-between max-md:flex-col absolute w-full inset-x-0 md:-bottom-[25%] -z-10 h-full items-end ">
        <DesktopBG1 className="md:max-h-full flex-2/3 max-md:flex-1 max-md:w-full max-h-1/2" />
        <DesktopBG2 className="md:max-h-full md:flex-2/3 max-md:w-full max-h-1/2" />
      </div>
      <HeroTextContent />
      <HeroImageComponent />
    </section>
  );
};

export default Hero;
