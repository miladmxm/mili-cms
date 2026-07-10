import SeparatorLine from "@/components/ui/separatorLine";

const info = [
  {
    title: "ضمانت تا 30 روز",
    description:
      "در صورت بروز مشکل، تا 30 روز پس از دریافت سفارش با ما تماس بگیرید",
  },
  {
    title: "اطلاعات تحویل",
    description:
      "بازگشت رایگان کالا ظرف ۱۵ روز، لطفاً مطمئن شوید که اقلام در شرایط سالم هستند. ",
  },
];

const ShippingInformation = () => {
  return (
    <div className="bg-primary-50 rounded-3xl p-4 border border-primary-500 ">
      {info.map((item) => (
        <div key={item.title} className="mb-4 flex flex-col gap-2">
          <h4 className="font-bold text-sm text-center">{item.title}</h4>
          <SeparatorLine size="3" />
          <p className="text-xs">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ShippingInformation;
