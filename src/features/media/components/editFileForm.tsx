"use client";
import { filesize } from "filesize";
import { Activity } from "react";
import { Controller } from "react-hook-form";

import type { Media } from "@/services/media/type";

import CopyToClipboard from "@/components/dashboard/copy-to-clipboard";
import { Badge } from "@/components/dashboard/ui/badge";
import { Button } from "@/components/dashboard/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/dashboard/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/dashboard/ui/field";
import { Input } from "@/components/dashboard/ui/input";
import { Spinner } from "@/components/dashboard/ui/spinner";
import { isEqualDatesWithOffset } from "@/utils/compareTwoDate";
import { fullDateWithFormat } from "@/utils/fullDateWithFormat";

import { useEditFileData } from "../hooks/useEditFileData";
import FilePreview from "./filePreview";

const EditFileForm = ({
  createdAt,
  id,
  meta,
  size,
  type,
  updatedAt,
  url,
}: Media) => {
  const { control, isPending, submit, isDirty } = useEditFileData(id, meta);
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap flex-col sm:flex-row gap-4 items-center">
          <FilePreview
            className="size-full sm:max-w-60 max-h-32"
            type={type}
            url={url}
          />
          <div className="flex flex-col gap-1.5">
            <CardDescription className="max-w-40 truncate">
              {url}
            </CardDescription>
            <CardDescription>
              زمان بارگذاری:
              <time>{fullDateWithFormat(createdAt, "fa")}</time>
            </CardDescription>
            {!isEqualDatesWithOffset(createdAt, updatedAt, {
              offsetBySecconds: 1,
            }) && (
              <CardDescription>
                آخرین ویرایش:
                <time>{fullDateWithFormat(updatedAt, "fa")}</time>
              </CardDescription>
            )}
            <Badge dir="ltr">{filesize(size, { standard: "jedec" })}</Badge>
          </div>
        </div>
        <CardAction>
          <CopyToClipboard value={url} />
        </CardAction>
      </CardHeader>
      <form onSubmit={submit}>
        <CardContent>
          <FieldGroup>
            <Controller
              name="alt"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="alt">متن جایگزین</FieldLabel>
                  <Input
                    dir="ltr"
                    id="alt"
                    type="text"
                    autoComplete="alt"
                    placeholder="تصویر ساده"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">نام تصویر</FieldLabel>
                  <Input
                    dir="ltr"
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="تصویر ساده"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">عنوان تصویر</FieldLabel>
                  <Input
                    dir="ltr"
                    id="title"
                    type="text"
                    autoComplete="title"
                    placeholder="تصویر ساده"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Field className="sm:max-w-fit sm:ms-auto">
              <Button disabled={isPending || !isDirty} type="submit">
                <Activity mode={isPending ? "visible" : "hidden"}>
                  <Spinner />
                </Activity>
                ذخیره تغییرات
              </Button>
            </Field>
          </FieldGroup>
        </CardContent>
      </form>
    </Card>
  );
};

export default EditFileForm;
