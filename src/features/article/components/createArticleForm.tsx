"use client";
import { Controller } from "react-hook-form";

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

import { useCreateArticle } from "../hooks/useCreateArticle";
import RichEditor from "./richEditor";

const CreateArticleForm = () => {
  const { control, isPending, submit, setValue, defaultContentValue } =
    useCreateArticle();
  return (
    <form onSubmit={submit}>
      <div className="grid grid-cols-1 auto-rows-auto lg:grid-cols-12 gap-4">
        <Card className="lg:col-span-4">
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
                    <Input id="title" placeholder="مقاله در مورد" {...field} />
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
                    <FieldLabel htmlFor="title">Slug</FieldLabel>
                    <Input
                      dir="ltr"
                      id="title"
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
                    <Textarea {...field} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Field>
                <Button disabled={isPending} type="submit">
                  ذخیره
                  {isPending && <Spinner />}
                </Button>
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
        <Controller
          name="content"
          control={control}
          render={({ fieldState }) => {
            return (
              <div className="lg:col-span-8">
                <Field aria-invalid={fieldState.invalid}>
                  <FieldLabel>محتوا</FieldLabel>
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
