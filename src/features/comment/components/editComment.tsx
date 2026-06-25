import { FormProvider } from "react-hook-form";

import type { CommentAdminAccess } from "@/services/comment/type";

import { Button } from "@/components/dashboard/ui/button";
import { FieldGroup } from "@/components/dashboard/ui/field";

import { useEditComment } from "../hooks/useEditComment";
import { CommentContent, CommentStatus, CommentType } from "./commentFormField";

const EditComment = ({ comment }: { comment?: CommentAdminAccess }) => {
  const { form, handleSubmit, isPending } = useEditComment(comment);
  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <CommentContent />
          <div className="flex gap-4">
            <CommentStatus />
            <CommentType />
          </div>
          <Button type="submit" disabled={isPending || !form.formState.isDirty}>
            ذخیره
          </Button>
        </FieldGroup>
      </form>
    </FormProvider>
  );
};

export default EditComment;
