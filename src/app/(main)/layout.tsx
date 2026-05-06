import type { Metadata } from "next";

import { FontMain } from "@/lib/fonts";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "یاتاک مد",
  description: "فروش سرویس خواب و صنایع چوب",
};

export default function RootLayout({ children }: Readonly<LayoutProps<"/">>) {
  return (
    <html dir="rtl" lang="fa">
      <body className={FontMain.variable}>{children}</body>
    </html>
  );
}
