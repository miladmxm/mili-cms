import { Controller } from "react-hook-form";

import Button from "@/components/ui/button";
import { RateStarsInput } from "@/components/ui/rateStars";
import Spiner from "@/components/ui/spiner";
import { cn } from "@/lib/utils";

import { useAddComment } from "../../hooks/useAddComment";

const CommentForm = ({ productId }: { productId: string }) => {
  const { control, handleSubmit, isPending } = useAddComment({ productId });
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
      <Controller
        control={control}
        name="rate"
        render={({ field, fieldState }) => (
          <div>
            <div className="flex gap-4 items-center">
              <strong className="text-sm font-bold flex-1">امتیاز:</strong>
              <RateStarsInput
                value={field.value}
                onChange={field.onChange}
                className="flex-auto justify-center"
              />
              <span className="flex-1" />
            </div>
            {fieldState.invalid && (
              <small className="text-error">{fieldState.error?.message}</small>
            )}
          </div>
        )}
      />
      <Button
        disabled={isPending}
        type="submit"
        variant="secondary"
        className="flex items-center justify-center gap-2 flex-row"
      >
        <span>ثبت نظر</span>
        {isPending && <Spiner />}
      </Button>
    </form>
  );
};

export default CommentForm;
