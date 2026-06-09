import { Suspense } from "react";

import UserFastLinks from "@/app/(main)/_components/headerFastLinks";
import PhoneNumber from "@/components/ui/headerPhoneNumber";

const BeforeHeader = () => {
  return (
    <div className="flex justify-between gap-4 items-center py-2">
      <PhoneNumber />
      <Suspense>
        <UserFastLinks />
      </Suspense>
    </div>
  );
};

export default BeforeHeader;
