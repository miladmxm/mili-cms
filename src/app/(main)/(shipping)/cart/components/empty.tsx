import Button from "@/components/ui/button";

const Empty = () => {
  return (
    <div className="w-full h-96 rounded-6xl border gap-4 center flex-col border-dashed border-primary-500">
      <h3 className="text-primary-800 font-bold text-3xl">
        هیچ موردی انتخاب نشده است
      </h3>
      <Button shadow="sm" variant="outline" className="max-w-1/3" href="/shop">
        ورود به فروشگاه
      </Button>
    </div>
  );
};

export default Empty;
