import { Controller } from "react-hook-form";

import type { CommentAdminAccess } from "@/services/comment/type";

import { Button } from "@/components/dashboard/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/dashboard/ui/field";
import { Textarea } from "@/components/dashboard/ui/textarea";

import { useReplayComment } from "../hooks/useReplayComment";

const ReplayForm = ({ comment }: { comment?: CommentAdminAccess }) => {
  const { control, handleSubmit, isPending } = useReplayComment(comment);
  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Controller
          control={control}
          name="content"
          render={({ field, fieldState }) => (
            <Field aria-invalid={fieldState.invalid}>
              <Textarea {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={control}
          name="parentId"
          render={({ field }) => (
            <input {...field} className="sr-only" type="hidden" />
          )}
        />
        <Button type="submit" disabled={isPending}>
          ثبت پاسخ
        </Button>
      </FieldGroup>
    </form>
  );
};

export default ReplayForm;
