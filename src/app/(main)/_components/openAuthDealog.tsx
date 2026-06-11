"use client";

import Profile from "@/assets/icons/profile.svg";
import { openAuthDialog } from "@/features/auth/customer/store/auth";

const OpenAuthDealog = () => {
  return (
    <button type="button" onClick={openAuthDialog}>
      <Profile />
    </button>
  );
};

export default OpenAuthDealog;
