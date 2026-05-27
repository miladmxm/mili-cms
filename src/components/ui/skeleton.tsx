import { cn } from "@/lib/utils";

const Skeleton = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("bg-gray-100/90 animate-pulse rounded-md", className)}
      data-slot="skeleton"
      {...props}
    />
  );
};

export default Skeleton;
