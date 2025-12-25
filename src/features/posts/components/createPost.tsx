"use client";
import { Controller, useForm } from "react-hook-form";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/dashboard/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/dashboard/ui/field";
import { Input } from "@/components/dashboard/ui/input";

const CreatePost = () => {
  const form = useForm();
  return (
    <Card className="mx-auto max-w-3xl w-full">
      <CardHeader>
        <CardTitle>ایجاد پست جدید</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field aria-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">عنوان پست</FieldLabel>
                  <Input id="title" placeholder="مقاله در مورد" {...field} />
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePost;
