import type { Metadata } from "next";

import "@/app/globals.css";
import { getPublicCategories } from "@/features/product/dal/query";
import { buildCategoryTree } from "@/features/product/utils/buildCategoryTree";
import { FontMain } from "@/lib/fonts";

import Footer from "./_containers/footer";
import Header from "./_containers/header";
import Searchbar from "./_containers/search";
import MainLayoutContextProvider from "./_context";

export const metadata: Metadata = {
  title: "یاتاک مد",
  description: "فروش سرویس خواب و صنایع چوب",
};

export default async function RootLayout({
  children,
}: Readonly<LayoutProps<"/">>) {
  // todo: change to promise and cache function
  const productCategories = buildCategoryTree(await getPublicCategories());
  return (
    <html dir="rtl" lang="fa">
      <MainLayoutContextProvider productCategories={productCategories}>
        <body className={FontMain.variable}>
          <Header />
          {children}
          <Searchbar />
          <Footer />
        </body>
      </MainLayoutContextProvider>
    </html>
  );
}
