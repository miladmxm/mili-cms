"use client";

import type { SubmitEvent } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useTransition } from "react";

import Search from "@/assets/icons/search.svg";

import { searchAction } from "../../_action/search";
import ResetButton from "./resetButton";
import { setProductsAndArticles } from "./store";

const SearchInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    if (!inputRef.current || pending) return;
    const value = inputRef.current.value.trim();
    if (!value || value === "") return;
    startTransition(async () => {
      router.push(`?q=${value.trim()}`);
      const result = await searchAction({ q: value });
      console.log(result);
      setProductsAndArticles(result);
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full gap-4 flex rounded-full items-stretch bg-white shadow-lg-gray p-3 z-10"
    >
      <ResetButton />
      <input
        autoFocus
        type="text"
        name="q"
        defaultValue={query}
        ref={inputRef}
        placeholder="جست و جو..."
        autoComplete="off"
        className="md:h-12 outline-none flex-auto"
      />
      <button
        disabled={pending}
        type="submit"
        className="rounded-full disabled:opacity-40 aspect-square md:h-12 ring-1 md:ring-2 ring-primary-900/50 center p-1.5 md:p-3"
      >
        <Search className="h-full aspect-square" />
      </button>
    </form>
  );
};

export default SearchInput;
