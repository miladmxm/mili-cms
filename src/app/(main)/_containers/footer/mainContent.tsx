"use client";

import type { PropsWithChildren, ReactNode } from "react";

import Link from "next/link";

import Accordion, {
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SeparatorLine from "@/components/ui/separatorLine";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const FooterContentTitle = ({ children }: PropsWithChildren) => (
  <h6 className="font-bold text-sm md:text-lg">{children}</h6>
);
const FooterContentContent = ({ children }: PropsWithChildren) => (
  <div className="max-md:text-xs">{children}</div>
);

const FooterContentItem = ({
  title,
  content,
  className,
}: {
  title: ReactNode;
  content: ReactNode;
  className?: string;
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Accordion>
        <AccordionTrigger>
          <FooterContentTitle>{title}</FooterContentTitle>
        </AccordionTrigger>
        <SeparatorLine className="my-2" />
        <AccordionContent>
          <FooterContentContent>{content}</FooterContentContent>
        </AccordionContent>
      </Accordion>
    );
  }

  return (
    <div className={cn(className)}>
      <FooterContentTitle>{title}</FooterContentTitle>
      <SeparatorLine className="my-2" />
      <FooterContentContent>{content}</FooterContentContent>
    </div>
  );
};

const FooterMainContent = () => {
  return (
    <div className="grid md:grid-cols-4 gap-6">
      <FooterContentItem
        title="درباره یاتاک"
        content="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،"
      />
      <FooterContentItem
        title="دسترسی آسان"
        content={
          <ul>
            <li>
              <Link href="#">صفحه اصلی</Link>
            </li>
            <li>
              <Link href="#">مقالات</Link>
            </li>
            <li>
              <Link href="#">فروشگاه</Link>
            </li>
            <li>
              <Link href="#">تماس با ما</Link>
            </li>
          </ul>
        }
      />
    </div>
  );
};

export default FooterMainContent;
