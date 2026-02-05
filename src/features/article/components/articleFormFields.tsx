"use client";
import type { ComponentProps } from "react";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { Suspense, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

import type { SheetController } from "@/features/media/components/mediaPickerSheet";
import type { Category } from "@/services/article/types";
import type { Media } from "@/services/media/type";

import RichEditor from "@/components/dashboard/rich-editor";
import { Button } from "@/components/dashboard/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/dashboard/ui/field";
import { Input } from "@/components/dashboard/ui/input";
import { Textarea } from "@/components/dashboard/ui/textarea";
import MediaPickerSheet from "@/features/media/components/mediaPickerSheet";
import { convertToSlug } from "@/lib/slug";
import { StatusDictionary } from "@/services/article/types";

import type { CreateArticleOutput } from "../validations/createSchema";

import { useCreateArticleStore } from "../store";
import SelectMultipleCategories, {
  SelectMultipleCategoriesSkeleton,
} from "./selectMultipleCategories";
import StatusDropdown from "./statusDropdown";

const useArticleFormContext = () => useFormContext<CreateArticleOutput>();

export const ArticleTitle = ({ ...props }: ComponentProps<typeof Input>) => {
  const { control } = useArticleFormContext();
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

export const ArticleSlug = () => {
  const { control, setValue, getValues } = useArticleFormContext();
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

export const ArticleExcerpt = () => {
  const { control } = useArticleFormContext();
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
  categories,
}: {
  categories: Promise<Category[]>;
}) => {
  const { control, setValue } = useArticleFormContext();
  return (
    <Controller
      name="categoryIds"
      control={control}
      render={({ fieldState, field: { value } }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="categories">انتخاب دسته بندی ها</FieldLabel>
          <Suspense fallback={<SelectMultipleCategoriesSkeleton />}>
            <SelectMultipleCategories
              selectedItems={value}
              triggerId="categories"
              categories={categories}
              onSelect={({ id }) => {
                if (value.includes(id)) {
                  setValue(
                    "categoryIds",
                    value.filter((i) => i !== id),
                  );
                } else {
                  setValue("categoryIds", [...value, id]);
                }
              }}
            />
          </Suspense>
        </Field>
      )}
    />
  );
};

export const ArticleThumbnail = ({ medias }: { medias: Promise<Media[]> }) => {
  const sheetControllerRef = useRef<SheetController>(null);
  const setPreviewImageUrl = useCreateArticleStore(
    (store) => store.setPreviewImageUrl,
  );
  const previewImageUrl = useCreateArticleStore(
    (store) => store.previewImageUrl,
  );
  const { control, setValue } = useArticleFormContext();
  return (
    <Controller
      name="thumbnail"
      control={control}
      render={({ fieldState }) => {
        return (
          <Field aria-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="thumbnail">انتخاب تصویر شاخص</FieldLabel>
            <Suspense fallback={null}>
              <MediaPickerSheet
                medias={medias}
                controllerRef={sheetControllerRef}
                onSelect={({ id, url }) => {
                  setValue("thumbnail", id);
                  setPreviewImageUrl(url);
                  sheetControllerRef.current?.close();
                }}
              />
            </Suspense>
            <Button
              className="w-full h-32"
              variant="outline"
              onClick={() => sheetControllerRef.current?.open()}
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
        );
      }}
    />
  );
};

export const ArticleStatus = ({ isPending }: { isPending: boolean }) => {
  const { setValue, control } = useArticleFormContext();
  return (
    <Controller
      name="status"
      control={control}
      render={({ fieldState, field: { value } }) => {
        return (
          <Field aria-invalid={fieldState.invalid} className="w-max">
            <StatusDropdown
              value={value}
              onChange={(v) => setValue("status", v)}
            >
              <Button disabled={isPending} variant="outline">
                <span>{StatusDictionary[value]}</span>
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

export const ArticleContent = () => {
  const { control, setValue } = useArticleFormContext();
  return (
    <Controller
      name="content"
      control={control}
      render={({ fieldState, field: { value } }) => {
        return (
          <div className="lg:col-span-8">
            <Field aria-invalid={fieldState.invalid}>
              <RichEditor
                content={value}
                onUpdate={(content) => {
                  setValue("content", content);
                }}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          </div>
        );
      }}
    />
  );
};
