import Button from "@/components/ui/button";

const GoToCartToast = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col gap-2 flex-auto w-full">
      <span>{title}</span>
      <Button href="/cart" size="sm" variant="secondary" className="w-full">
        مشاهده سبد خرید
      </Button>
    </div>
  );
};

export default GoToCartToast;
