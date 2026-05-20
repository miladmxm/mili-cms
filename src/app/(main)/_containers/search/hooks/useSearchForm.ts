import type { SubmitEvent } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useTransition } from "react";

import { searchAction } from "@/app/(main)/_action/search";

import { setProductsAndArticles } from "../store";

export const useSearchForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputRef.current || pending) return;
    const value = inputRef.current.value.trim();
    if (!value || value === "") return;
    startTransition(async () => {
      router.push(`?q=${value.trim()}`);
      const result = await searchAction({ q: value });
      setProductsAndArticles(result);
    });
  };

  return { query, handleSubmit, inputRef, pending };
};
