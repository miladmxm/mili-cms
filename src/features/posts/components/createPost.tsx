"use client";
import { Controller, useForm } from "react-hook-form";

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

import RichEditor from "./richEditor";

const CreatePost = () => {
  const form = useForm();
  return (
    <form>
      <div className="grid grid-cols-1 auto-rows-auto lg:grid-cols-12 gap-4">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>ایجاد پست جدید</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field aria-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="title">عنوان پست</FieldLabel>
                    <Input id="title" placeholder="مقاله در مورد" {...field} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </CardContent>
        </Card>
        <Controller
          name="content"
          control={form.control}
          render={({ fieldState }) => {
            return (
              <div className="lg:col-span-8">
                <Field aria-invalid={fieldState.invalid}>
                  <FieldLabel>محتوا</FieldLabel>
                  <RichEditor
                    onChange={(value) => form.setValue("content", value)}
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

export default CreatePost;
