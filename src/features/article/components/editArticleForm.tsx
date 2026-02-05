"use client";

import { FormProvider } from "react-hook-form";

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
  const { isPending, submit, form } = useEditArticle(article);
  return (
    <FormProvider {...form}>
      <form onSubmit={submit}>
        <div className="grid grid-cols-1 auto-rows-auto lg:grid-cols-12 gap-4">
          <div className="lg:col-span-4">
            <Card className="w-full lg:sticky lg:top-2">
              <CardHeader>
                <CardTitle>ایجاد مقاله جدید</CardTitle>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <ArticleTitle />
                  <ArticleSlug />
                  <ArticleExcerpt />
                  <ArticleCategories categories={categories} />
                  <ArticleThumbnail medias={medias} />

                  <div className="flex gap-2">
                    <ArticleStatus isPending={isPending} />

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
          <ArticleContent key={article.id} />
        </div>
      </form>
    </FormProvider>
  );
};

export default EditArticleForm;
