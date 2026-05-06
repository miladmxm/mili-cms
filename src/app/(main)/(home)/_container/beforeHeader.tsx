import UserFastLinks from "@/components/ui/headerFastLinks";
import PhoneNumber from "@/components/ui/headerPhoneNumber";

const BeforeHeader = () => {
  return (
    <div className="flex justify-between gap-4 items-center container py-2">
      <PhoneNumber />
      <UserFastLinks />
    </div>
  );
};

export default BeforeHeader;
