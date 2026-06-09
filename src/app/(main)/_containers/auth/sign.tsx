"use client";

import { Activity } from "react";

import { useAuthStore } from "../../_store/auth";

const Sign = () => {
  const isOpen = useAuthStore((state) => state.isOpenAuthDialog);

  return (
    <Activity mode={isOpen ? "visible" : "hidden"} name="auth-dialog">
      <div className="fixed z-50 inset-0 center backdrop-blur-xs">auth</div>
    </Activity>
  );
};

export default Sign;
