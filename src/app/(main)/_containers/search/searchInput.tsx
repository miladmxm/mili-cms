"use client";

import Search from "@/assets/icons/search.svg";

import { useSearchForm } from "./hooks/useSearchForm";
import ResetButton from "./resetButton";

const SearchInput = () => {
  const { handleSubmit, inputRef, query, pending } = useSearchForm();
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
