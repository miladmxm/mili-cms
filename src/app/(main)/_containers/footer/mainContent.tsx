"use client";

import type { PropsWithChildren, ReactNode } from "react";

import Link from "next/link";

import ArrowDown from "@/assets/icons/footerMenuArrowDown.svg";
import Accordion, {
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SeparatorLine from "@/components/ui/separatorLine";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import { useMainLayoutContext } from "../../_context";

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
        <AccordionTrigger className="border-b w-full text-start py-2 border-primary-900">
          {({ isOpen }) => (
            <div className="flex justify-between items-center">
              <FooterContentTitle>{title}</FooterContentTitle>
              <ArrowDown
                className={cn("transition-transform size-3.5", {
                  "rotate-180": isOpen,
                })}
              />
            </div>
          )}
        </AccordionTrigger>
        <AccordionContent className="pt-4">
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

const FooterAboutUs = () => {
  return (
    <FooterContentItem
      title="درباره یاتاک"
      content={
        <p className="text-justify">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است،
        </p>
      }
    />
  );
};

const QuickAccess = () => {
  return (
    <FooterContentItem
      title="دسترسی آسان"
      content={
        <ul className="gap-4 flex flex-col">
          <li>
            <Link href="/">صفحه اصلی</Link>
          </li>
          <li>
            <Link href="#">مقالات</Link>
          </li>
          <li>
            <Link href="/shop">فروشگاه</Link>
          </li>
          <li>
            <Link href="#">تماس با ما</Link>
          </li>
        </ul>
      }
    />
  );
};

const ProductCategories = () => {
  const { productCategories } = useMainLayoutContext();

  return (
    <FooterContentItem
      title="دسته بندی محصولات"
      content={
        <ul className="gap-4 flex flex-col">
          {productCategories.map((productCategory) => (
            <li key={productCategory.slug}>
              <Link href={`/products/${productCategory.slug}`}>
                {productCategory.name}
              </Link>
            </li>
          ))}
        </ul>
      }
    />
  );
};

const ContactUs = () => {
  return (
    <FooterContentItem
      title="تماس با ما"
      content={
        <ul className="gap-4 flex flex-col">
          <li>
            <Link href="#">۰۲۱-۶۶۶-۲۲۳۳</Link>
          </li>
          <li>
            <Link href="#">۰۹۱۲-۱۵۸-۲۴۴۹</Link>
          </li>
          <li>
            <Link href="#">آدرس: تهران نعمت آباد</Link>
          </li>
        </ul>
      }
    />
  );
};

const FooterMainContent = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <FooterAboutUs />
      <QuickAccess />
      <ProductCategories />
      <ContactUs />
    </div>
  );
};

export default FooterMainContent;
