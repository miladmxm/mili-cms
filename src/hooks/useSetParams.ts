import type { Route } from "next";
import type { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { ReadonlyURLSearchParams } from "next/navigation";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useEffectEvent, useRef, useState } from "react";

const concatPathnameAndSearchParams = (
  pathname: string | Route,
  searchParams: ReadonlyURLSearchParams,
) => pathname.toString() + searchParams.toString();

export const useSetParams = () => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname() as Route;
  const prevPathRef = useRef<string>(
    concatPathnameAndSearchParams(pathname, searchParams),
  );
  const [isPendding, setIsPendding] = useState<boolean>(false);

  const falsePendign = useEffectEvent(() => {
    setIsPendding(false);
  });
  useEffect(() => {
    const fullPath = concatPathnameAndSearchParams(pathname, searchParams);

    if (fullPath !== prevPathRef.current) {
      falsePendign();
      prevPathRef.current = fullPath;
    }
  }, [searchParams, pathname]);

  const applyParams = (
    newParams: Record<string, string>,
    config?: NavigateOptions,
  ) => {
    setIsPendding(true);
    const params = new URLSearchParams(searchParams);

    for (const newParam of Object.keys(newParams)) {
      params.set(newParam, newParams[newParam]);
    }

    replace(`${pathname}?${params.toString()}`, config);
  };

  return { applyParams, searchParams, isPendding };
};
