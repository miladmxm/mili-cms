"use client";
import { Controller } from "react-hook-form";

import type { Media } from "@/services/media/type";

import { Button } from "@/components/dashboard/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/dashboard/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/dashboard/ui/field";
import { Spinner } from "@/components/dashboard/ui/spinner";

import type { Category } from "../../../services/article/types";

import { useCreateArticle } from "../hooks/useCreateArticle";
import {
  ArticleCategories,
  ArticleExcerpt,
  ArticleSlug,
  ArticleStatus,
  ArticleThumbnail,
  ArticleTitle,
} from "./articleFormFields";
import RichEditor from "./richEditor";

const CreateArticleForm = ({
  medias,
  categories,
}: {
  medias: Promise<Media[]>;
  categories: Promise<Category[]>;
}) => {
  const { control, getValues, isPending, submit, setValue } =
    useCreateArticle();
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
                  getValues={getValues}
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
                    getValues={getValues}
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
        <Controller
          name="content"
          control={control}
          render={({ fieldState }) => {
            return (
              <div className="lg:col-span-8">
                <Field aria-invalid={fieldState.invalid}>
                  <RichEditor
                    onChange={(value) => setValue("content", value)}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              </div>
            );
          }}
        />
      </div>
    </form>
  );
};

export default CreateArticleForm;
