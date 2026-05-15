"use client";

import type { Article } from "@/services/article/types";

import Carusel, {
  CaruselContent,
  CaruselControllers,
  ToNext,
} from "@/components/ui/carusel";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import CaruselArticleCard from "./caruselArticleCard";

const BlogCarusel = ({
  articles,
  dir = "rtl",
}: {
  articles: Article[];
  dir?: "ltr" | "rtl";
}) => {
  return (
    <div
      className={cn("relative flex flex-col gap-6 md:flex-row", {
        "dir-ltr": dir === "ltr",
      })}
    >
      <Carusel config={{ loop: true, direction: dir }}>
        <ToNext
          className={cn("absolute z-20 end-0 top-1/4 max-md:hidden", {
            "rotate-180": dir === "ltr",
          })}
        />
        <div className="max-md:hidden absolute z-0 inset-0 flex flex-col gap-6 items-end justify-center">
          <div className="-z-10 h-22 border-primary-600 border-y w-11/12" />
        </div>
        <div className="w-full z-10">
          <CaruselContent>
            {articles.map((article) => (
              <div key={article.id} className="flex-size-100 p-4">
                <CaruselArticleCard key={article.slug} {...article} />
              </div>
            ))}
          </CaruselContent>
        </div>
        <CaruselControllers className="md:hidden" />
      </Carusel>
    </div>
  );
};

const BlogCaruselProvider = ({ articles }: { articles: Article[] }) => {
  const isMobile = useIsMobile();
  const ArticlesSectionOne = articles.slice(0, Math.round(articles.length / 2));
  const ArticlesSectionTwo = articles.slice(
    Math.round(articles.length / 2),
    articles.length,
  );
  return (
    <>
      {!isMobile && <BlogCarusel dir="ltr" articles={ArticlesSectionTwo} />}
      <BlogCarusel articles={isMobile ? articles : ArticlesSectionOne} />
    </>
  );
};

export default BlogCaruselProvider;
