import type { CSSProperties, PropsWithChildren } from "react";

import installMentStars from "@/assets/images/installmentStars.png";

const InstallmentBackground = ({ children }: PropsWithChildren) => {
  return (
    <div className="overflow-hidden w-full relative  rounded-8xl bg-gradient-to-br from-secondary-600 to-secondary-800 isolate">
      <div
        style={
          { "--bg-image": `url(${installMentStars.src})` } as CSSProperties
        }
        className="inset-x-0 -z-20 absolute top-0 h-1/2 blur-xs flex items-stretch *:flex-1"
      >
        <div className="bg-[image:var(--bg-image)] rotate-6 scale-110 bg-bottom-right bg-no-repeat bg-cover" />
        <div className="bg-[image:var(--bg-image)] rotate-180 bg-top-left bg-no-repeat bg-cover " />
        <div className="bg-[image:var(--bg-image)] -rotate-12 scale-200 bg-bottom-right bg-no-repeat bg-cover" />
      </div>
      <div className="bg-secondary-500 blur-[100px] rounded-[56%_87%_53%_70%/55%_75%_66%_93%] absolute -left-16 -bottom-12 -z-10 w-1/3 h-1/2" />
      <div className="bg-secondary-500 blur-[100px] rounded-[56%_87%_53%_70%/55%_75%_66%_93%] absolute right-0 scale-110 top-0 -z-10 w-1/3 h-1/2" />
      {children}
    </div>
  );
};

export default InstallmentBackground;
