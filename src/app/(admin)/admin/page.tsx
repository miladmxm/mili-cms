"use client";
import dynamic from "next/dynamic";

const ThemeSwitch = dynamic(() => import("@/components/ThemeSwitch"), {
  ssr: false,
});

const Admin = () => {
  return (
    <div className="text-chart-3">
      <ThemeSwitch />
    </div>
  );
};

export default Admin;
