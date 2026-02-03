"use client";

import type { Media } from "@/services/media/type";

import { Button } from "@/components/dashboard/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/dashboard/ui/card";
import { Field, FieldGroup } from "@/components/dashboard/ui/field";
import { Spinner } from "@/components/dashboard/ui/spinner";

import type { Article, Category } from "../../../services/article/types";

import { useEditArticle } from "../hooks/useEditArticle";
import {
  ArticleCategories,
  ArticleContent,
  ArticleExcerpt,
  ArticleSlug,
  ArticleStatus,
  ArticleThumbnail,
  ArticleTitle,
} from "./articleFormFields";

const EditArticleForm = ({
  medias,
  categories,
  article,
}: {
  medias: Promise<Media[]>;
  article: Article;
  categories: Promise<Category[]>;
}) => {
  const { control, getValues, isPending, submit, setValue } =
    useEditArticle(article);
  return (
    <form onSubmit={submit}>
      <div className="grid grid-cols-1 auto-rows-auto lg:grid-cols-12 gap-4">
        <div className="lg:col-span-4">
          <Card className="w-full lg:sticky lg:top-2">
            <CardHeader>
              <CardTitle>ایجاد مقاله جدید</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <ArticleTitle control={control} />
                <ArticleSlug
                  getValues={getValues}
                  setValue={setValue}
                  control={control}
                />
                <ArticleExcerpt control={control} />
                <ArticleCategories
                  setValue={setValue}
                  categories={categories}
                  control={control}
                />
                <ArticleThumbnail
                  medias={medias}
                  setValue={setValue}
                  control={control}
                />

                <div className="flex gap-2">
                  <ArticleStatus
                    isPending={isPending}
                    setValue={setValue}
                    control={control}
                  />

                  <Field>
                    <Button
                      className="flex-auto"
                      disabled={isPending}
                      type="submit"
                    >
                      ذخیره
                      {isPending && <Spinner />}
                    </Button>
                  </Field>
                </div>
              </FieldGroup>
            </CardContent>
          </Card>
        </div>
        <ArticleContent
          key={article.id}
          setValue={setValue}
          control={control}
        />
      </div>
    </form>
  );
};

export default EditArticleForm;
