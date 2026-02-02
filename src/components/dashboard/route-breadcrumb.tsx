"use client";
import Link from "next/link";
import { Fragment } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/dashboard/ui/breadcrumb";
import { NavDictionary } from "@/constant/adminNavLinks";
import { usePathAsArray } from "@/hooks/usePathAsArray";

const RouteBreadcrumb = () => {
  const arrayOfPaths = usePathAsArray();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {arrayOfPaths.map((item, i) => {
          if (i === arrayOfPaths.length - 1) return null;
          const route = arrayOfPaths.slice(0, i + 1);
          return (
            <Fragment key={item}>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild>
                  <Link href={{ pathname: `/${route.join("/")}` }}>
                    {NavDictionary[item]}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
            </Fragment>
          );
        })}
        <BreadcrumbItem>
          <BreadcrumbPage>
            {NavDictionary[arrayOfPaths[arrayOfPaths.length - 1]] ||
              arrayOfPaths[arrayOfPaths.length - 1]}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default RouteBreadcrumb;
