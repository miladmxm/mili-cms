"use client";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";
import { Controller } from "react-hook-form";

import type { Media } from "@/features/type";

import { Button } from "@/components/dashboard/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/dashboard/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/dashboard/ui/field";
import { Input } from "@/components/dashboard/ui/input";
import { Spinner } from "@/components/dashboard/ui/spinner";
import { Textarea } from "@/components/dashboard/ui/textarea";
import MediaPickerSheet from "@/features/media/components/mediaPickerSheet";
import { convertToSlug } from "@/lib/slug";

import {
  useCreateArticle,
  useHandleImagePicker,
} from "../hooks/useCreateArticle";
import { StatusDictionary } from "../types";
import RichEditor from "./richEditor";
import StatusDropdown from "./statusDropdown";

// eslint-disable-next-line max-lines-per-function
const CreateArticleForm = ({ medias }: { medias: Promise<Media[]> }) => {
  const {
    control,
    getValue,
    isPending,
    submit,
    setValue,
    defaultContentValue,
  } = useCreateArticle();
  const {
    previewImageUrl,
    setPreviewImageUrl,
    setShowMediaPicker,
    showMediaPicker,
  } = useHandleImagePicker();
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
                <Controller
                  name="title"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field aria-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="title">عنوان مقاله</FieldLabel>
                      <Input
                        id="title"
                        placeholder="مقاله در مورد"
                        {...field}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="slug"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field aria-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="slug">Slug</FieldLabel>
                      <Input
                        dir="ltr"
                        id="slug"
                        onFocus={(e) => {
                          if (!e.target.value) {
                            setValue("slug", convertToSlug(getValue("title")));
                          }
                        }}
                        placeholder="article-about"
                        {...field}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="excerpt"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field aria-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="excerpt">خلاصه از مقاله</FieldLabel>
                      <Textarea id="excerpt" {...field} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="thumbnail"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field aria-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="thumbnail">
                        انتخاب تصویر شاخص
                      </FieldLabel>
                      <input {...field} className="sr-only" type="hidden" />
                      <Suspense fallback={null}>
                        <MediaPickerSheet
                          medias={medias}
                          onOpenChange={setShowMediaPicker}
                          onSelect={({ id, url }) => {
                            setValue("thumbnail", id);
                            setPreviewImageUrl(url);
                            setShowMediaPicker(false);
                          }}
                          open={showMediaPicker}
                        />
                      </Suspense>
                      <Button
                        className="w-full h-32"
                        variant="outline"
                        onClick={() => setShowMediaPicker(true)}
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
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <div className="flex gap-2">
                  <Controller
                    name="status"
                    control={control}
                    render={({ fieldState }) => {
                      const status = getValue("status");
                      return (
                        <Field
                          aria-invalid={fieldState.invalid}
                          className="w-max"
                        >
                          <StatusDropdown
                            value={status}
                            onChange={(v) => setValue("status", v)}
                          >
                            <Button disabled={isPending} variant="outline">
                              <span>{StatusDictionary[status]}</span>
                              <ChevronDown />
                            </Button>
                          </StatusDropdown>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      );
                    }}
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
                    defaultValue={defaultContentValue}
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
