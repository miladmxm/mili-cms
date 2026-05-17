import type { ReactNode } from "react";

import SeparatorLine from "@/components/ui/separatorLine";
import { cn } from "@/lib/utils";

const FooterContentItem = ({
  title,
  content,
  className,
}: {
  title: ReactNode;
  content: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(className)}>
      <h6>{title}</h6>
      <SeparatorLine size="4" />
      <div>{content}</div>
    </div>
  );
};

const FooterMainContent = () => {
  return (
    <div className="grid grid-cols-4 ">
      <FooterContentItem
        title="درباره یاتاک"
        content="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،"
      />
    </div>
  );
};

export default FooterMainContent;
