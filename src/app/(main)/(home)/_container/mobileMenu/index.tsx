"use client";

import type { ComponentProps, PropsWithChildren } from "react";

import Link from "next/link";

import type { CategoryTree } from "@/services/product/type";

import ArrowDown from "@/assets/icons/arrowToDown.svg";
import Accordion, {
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SeparatorLine from "@/components/ui/separatorLine";
import { cn } from "@/lib/utils";

import { useHomePageContext } from "../../_context";

export const MenuItemLink = ({
  className,
  ...props
}: ComponentProps<typeof Link>) => {
  return (
    <li>
      <Link className={cn("p-4 block", className)} {...props} />
      <SeparatorLine />
    </li>
  );
};

const MenuItemAccordion = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => {
  return (
    <li>
      <Accordion>
        <AccordionTrigger className="[.opened]:via-thready-400 w-full p-4 text-start transition-all bg-gradient-to-r from-transparent to-transparent via-transparent flex justify-between">
          {title}
          <ArrowDown className="size-3 group-[.opened]:text-secondary-500 group-[.opened]:rotate-180 transition-transform duration-300 text-primary-900" />
        </AccordionTrigger>
        <SeparatorLine />
        <AccordionContent className="p-4">
          {children}
          <SeparatorLine className="h-2" />
        </AccordionContent>
      </Accordion>
    </li>
  );
};

const MenuItems = ({
  productCategories,
}: {
  productCategories: CategoryTree[];
}) => {
  return (
    <ul>
      {productCategories.map(({ children, name, slug }) => {
        if (!children || children.length === 0) {
          return (
            <MenuItemLink key={slug} href={`#${slug}`}>
              {name}
            </MenuItemLink>
          );
        }

        return (
          <MenuItemAccordion key={slug} title={name}>
            <MenuItems productCategories={children} />
          </MenuItemAccordion>
        );
      })}
    </ul>
  );
};

// const CloseMenuButton = ()=>
const MobileMenu = ({ children }: PropsWithChildren) => {
  const { productCategories } = useHomePageContext();
  return (
    <nav className="fixed bg-white inset-0">
      <ul className="flex gap-4 flex-col">
        <MenuItemAccordion title="دسته بندی محصولات">
          <MenuItems productCategories={productCategories} />
        </MenuItemAccordion>
        {children}
      </ul>
    </nav>
  );
};

export default MobileMenu;
