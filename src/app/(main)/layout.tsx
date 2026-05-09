import type { Metadata } from "next";

import "@/app/globals.css";
import { getPublicCategories } from "@/features/product/dal/query";
import { buildCategoryTree } from "@/features/product/utils/buildCategoryTree";
import { FontMain } from "@/lib/fonts";

import Header from "./_containers/header";
import MainLayoutContextProvider from "./_context";

export const metadata: Metadata = {
  title: "یاتاک مد",
  description: "فروش سرویس خواب و صنایع چوب",
};

export default async function RootLayout({
  children,
}: Readonly<LayoutProps<"/">>) {
  const productCategories = buildCategoryTree(await getPublicCategories());
  return (
    <html dir="rtl" lang="fa">
      <MainLayoutContextProvider productCategories={productCategories}>
        <body className={FontMain.variable}>
          <Header />
          {children}
        </body>
      </MainLayoutContextProvider>
    </html>
  );
}
