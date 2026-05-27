"use client";

import Button from "@/components/ui/button";
import Spiner from "@/components/ui/spiner";
import { useSetParams } from "@/hooks/useSetParams";

const Loadmore = () => {
  const { applyParams, searchParams, isPendding } = useSetParams();
  const page = +(searchParams.get("page") || 1);

  const nextpage = () => {
    applyParams({ page: String(page + 1) }, { scroll: false });
  };

  return (
    <div className="w-max mx-auto my-10">
      <Button
        disabled={isPendding}
        shadow="sm"
        onClick={nextpage}
        variant="secondary"
        className="flex gap-2 items-center"
      >
        بارگذاری بیشتر
        {isPendding && <Spiner />}
      </Button>
    </div>
  );
};

export default Loadmore;
