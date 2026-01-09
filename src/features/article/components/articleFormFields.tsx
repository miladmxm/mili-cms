"use client";
import type { ComponentProps } from "react";
import type {
  Control,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { Suspense, useState } from "react";
import { Controller } from "react-hook-form";

import type { Category } from "@/services/article/types";
import type { Media } from "@/services/media/type";

import { Button } from "@/components/dashboard/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/dashboard/ui/field";
import { Input } from "@/components/dashboard/ui/input";
import { Textarea } from "@/components/dashboard/ui/textarea";
import MediaPickerSheet from "@/features/media/components/mediaPickerSheet";
import { convertToSlug } from "@/lib/slug";
import { StatusDictionary } from "@/services/article/types";

import type { CreateArticleOutput } from "../validations/createSchema";

import SelectMultipleCategories, {
  SelectMultipleCategoriesSkeleton,
} from "./selectMultipleCategories";
import StatusDropdown from "./statusDropdown";

interface ArticleFieldProps<
  T extends CreateArticleOutput = CreateArticleOutput,
> {
  control: Control<T>;
}
interface ArticleSetValue {
  setValue: UseFormSetValue<CreateArticleOutput>;
}
interface ArticleGetValues {
  getValues: UseFormGetValues<CreateArticleOutput>;
}
export const ArticleTitle = ({
  control,
  ...props
}: ArticleFieldProps & ComponentProps<typeof Input>) => {
  return (
    <Controller
      name="title"
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="title">عنوان مقاله</FieldLabel>
          <Input id="title" placeholder="مقاله در مورد" {...field} {...props} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export const ArticleSlug = ({
  control,
  setValue,
  getValues,
}: ArticleFieldProps & ArticleGetValues & ArticleSetValue) => {
  return (
    <Controller
      name="slug"
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="slug">Slug</FieldLabel>
          <Input
            dir="ltr"
            id="slug"
            placeholder="article-about"
            {...field}
            onFocus={(e) => {
              if (!e.target.value) {
                setValue("slug", convertToSlug(getValues("title")));
              }
            }}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export const ArticleExcerpt = ({ control }: ArticleFieldProps) => {
  return (
    <Controller
      name="excerpt"
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="excerpt">خلاصه از مقاله</FieldLabel>
          <Textarea id="excerpt" {...field} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export const ArticleCategories = ({
  control,
  getValues,
  setValue,
  categories,
}: ArticleFieldProps &
  ArticleGetValues &
  ArticleSetValue & { categories: Promise<Category[]> }) => {
  return (
    <Controller
      name="categoryIds"
      control={control}
      render={({ fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="categories">انتخاب دسته بندی ها</FieldLabel>
          <Suspense fallback={<SelectMultipleCategoriesSkeleton />}>
            <SelectMultipleCategories
              selectedItems={getValues("categoryIds")}
              triggerId="categories"
              categories={categories}
              onSelect={({ id }) => {
                const currentCategoriesValues = getValues("categoryIds");
                console.log(currentCategoriesValues);
                if (currentCategoriesValues.includes(id)) {
                  setValue(
                    "categoryIds",
                    currentCategoriesValues.filter((i) => i !== id),
                  );
                } else {
                  setValue("categoryIds", [...currentCategoriesValues, id]);
                }
              }}
            />
          </Suspense>
        </Field>
      )}
    />
  );
};

export const ArticleThumbnail = ({
  control,
  medias,
  setValue,
  setPreviewImageUrl,
  previewImageUrl,
}: ArticleFieldProps &
  ArticleSetValue & {
    medias: Promise<Media[]>;
    previewImageUrl: string;
    setPreviewImageUrl: (d: string) => void;
  }) => {
  const [open, setOpen] = useState(false);
  return (
    <Controller
      name="thumbnail"
      control={control}
      render={({ fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="thumbnail">انتخاب تصویر شاخص</FieldLabel>
          <Suspense fallback={null}>
            <MediaPickerSheet
              medias={medias}
              onOpenChange={setOpen}
              onSelect={({ id, url }) => {
                setValue("thumbnail", id);
                setPreviewImageUrl(url);
                setOpen(false);
              }}
              open={open}
            />
          </Suspense>
          <Button
            className="w-full h-32"
            variant="outline"
            onClick={() => setOpen(true)}
          >
            {previewImageUrl && (
              <Image
                alt="image preview"
                className="size-full object-contain"
                src={{
                  src: previewImageUrl,
                  width: 128,
                  height: 128,
                }}
              />
            )}
          </Button>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export const ArticleStatus = ({
  control,
  getValues,
  setValue,
  isPending,
}: ArticleFieldProps &
  ArticleGetValues &
  ArticleSetValue & { isPending: boolean }) => {
  return (
    <Controller
      name="status"
      control={control}
      render={({ fieldState }) => {
        const status = getValues("status");
        return (
          <Field aria-invalid={fieldState.invalid} className="w-max">
            <StatusDropdown
              value={status}
              onChange={(v) => setValue("status", v)}
            >
              <Button disabled={isPending} variant="outline">
                <span>{StatusDictionary[status]}</span>
                <ChevronDown />
              </Button>
            </StatusDropdown>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};
