"use client";

import Button from "@/components/ui/button";
import SearchResultCard from "@/components/ui/searchResultCard";
import SeparatorLine from "@/components/ui/separatorLine";

import { useSearchResult } from "./hooks/useSearchResult";
import { useSearchbarStore } from "./store";

const ProductsResult = () => {
  const products = useSearchbarStore((store) => store.products);
  if (!products.length) return;
  return (
    <div className="flex items-start justify-center">
      <div className="flex max-w-md flex-col gap-4">
        <h5 className="font-bold text-xl">محصولات</h5>
        <SeparatorLine size="4" />
        {products.map(({ slug, thumbnail, name, createdAt }) => (
          <SearchResultCard
            key={slug}
            createdAt={createdAt}
            more=""
            link={`#${slug}`}
            title={name}
            thumbnail={thumbnail}
          />
        ))}
      </div>
    </div>
  );
};

const ArticlesResult = () => {
  const articles = useSearchbarStore((store) => store.articles);

  if (!articles.length) return;
  return (
    <div className="flex items-start justify-center">
      <div className="flex max-w-md flex-col gap-4">
        <h5 className="font-bold text-xl">مقالات</h5>
        <SeparatorLine size="4" />
        {articles.map(({ slug, thumbnail, title, createdAt }) => (
          <SearchResultCard
            key={slug}
            createdAt={createdAt}
            more=""
            link={`#${slug}`}
            title={title}
            thumbnail={thumbnail}
          />
        ))}
      </div>
    </div>
  );
};

const SearchResult = () => {
  const { handleScroll, inViewRef, pending, isLoadEnded } = useSearchResult();
  return (
    <div
      onScrollEnd={handleScroll}
      className="flex-auto overflow-y-auto relative pb-10"
    >
      <SeparatorLine
        className="absolute inset-y-0 left-1/2 max-md:hidden -z-10"
        variant="horizontal"
        size="2"
      />
      <div className="flex max-md:flex-col *:flex-1 gap-8">
        <ProductsResult />
        <SeparatorLine
          className="!flex-auto md:hidden"
          variant="vertical"
          size="2"
        />
        <ArticlesResult />
      </div>
      <span ref={inViewRef} />
      {!isLoadEnded && (
        <Button
          type="button"
          variant="secondary"
          className="max-w-fit mx-auto mt-10"
          shadow="sm"
          onClick={handleScroll}
          disabled={pending}
        >
          {pending ? (
            <span className="block animate-spin h-6 mx-auto aspect-square rounded-full border-2 border-dashed" />
          ) : (
            <span>بارگذاری</span>
          )}
        </Button>
      )}
    </div>
  );
};

export default SearchResult;
