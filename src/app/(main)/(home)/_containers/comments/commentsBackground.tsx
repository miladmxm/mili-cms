import type { PropsWithChildren } from "react";

import Image from "next/image";

import commentBgFather1 from "@/assets/images/commentBgFather-1.png";
import commentBgFather2 from "@/assets/images/commentBgFather-2.png";
import commentBgFather3 from "@/assets/images/commentBgFather-3.png";
import SectionCurveInside from "@/components/ui/sectionCurveInside";

const CommentsBackground = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-primary-200 relative isolate py-24 md:py-32">
      <SectionCurveInside />
      <SectionCurveInside position="bottom" />
      <div className="absolute -z-10 inset-0 w-full overflow-hidden md:flex-row flex-col flex py-16 px-10 justify-between *:w-fit *:h-1/3 md:*:h-2/3 *:object-contain">
        <Image
          src={commentBgFather1}
          alt="comment bg feather"
          className="self-end md:self-center"
        />
        <Image
          src={commentBgFather2}
          alt="comment bg feather"
          className="self-start md:self-end"
        />
        <Image
          src={commentBgFather3}
          alt="comment bg feather"
          className="self-center md:self-start"
        />
      </div>
      {children}
    </div>
  );
};

export default CommentsBackground;
