import { Controller } from "react-hook-form";

import Button from "@/components/ui/button";
import Spiner from "@/components/ui/spiner";
import { cn } from "@/lib/utils";

import { useAddComment } from "../../hooks/useAddComment";

const CommentForm = ({ productId }: { productId: string }) => {
  const { control, handleSubmit, isPending } = useAddComment(productId);
  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-5">
      <Controller
        control={control}
        name="content"
        render={({ field, fieldState }) => (
          <div className="flex flex-col gap-2">
            <textarea
              className={cn(
                "p-4 rounded-4xl border border-primary-500 max-h-[30svh]",
                { "border-error": fieldState.invalid },
              )}
              rows={6}
              placeholder="نظر خود را وارد کنید..."
              {...field}
            />
            {fieldState.invalid && (
              <small className="text-error">{fieldState.error?.message}</small>
            )}
          </div>
        )}
      />
      <Button disabled={isPending} type="submit" variant="secondary">
        ثبت نظر
        {isPending && <Spiner />}
      </Button>
    </form>
  );
};

export default CommentForm;
