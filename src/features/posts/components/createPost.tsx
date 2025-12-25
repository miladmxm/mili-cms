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

import RichEditor from "./richEditor";

const CreatePost = () => {
  const form = useForm();
  return (
    <form>
      <div className="grid grid-cols-8 gap-4">
        <Card className="col-span-3">
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
                  </Field>
                )}
              />
            </FieldGroup>
          </CardContent>
        </Card>
        <RichEditor className="col-span-5" />
      </div>
    </form>
  );
};

export default CreatePost;
