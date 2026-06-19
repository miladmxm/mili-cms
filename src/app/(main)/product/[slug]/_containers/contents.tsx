"use client";

import { useShallow } from "zustand/react/shallow";

import type { Product } from "@/services/product/type";

import { ProseMirrorRenderer } from "@/components/ui/proseMirrorRenderer";
import SeparatorLine from "@/components/ui/separatorLine";

import type { ProductContentTabKeys } from "../store/tabContent";

import { ProductContentTabs, useTabContext } from "../store/tabContent";
import ProductComments from "./productComments";

const Contents = ({ content }: { content: Product["content"] }) => {
  const { setActiveTab, activeTab } = useTabContext(
    useShallow((state) => ({
      setActiveTab: state.setActiveTab,
      activeTab: state.activeTab,
    })),
  );
  return (
    <section className="container">
      <div className="bg-white rounded-6xl p-12">
        <div className="flex justify-between text-thready-800 [&>button.active]:text-secondary-500">
          {Object.keys(ProductContentTabs).map((key) => {
            const tabKey = key as ProductContentTabKeys;
            return (
              <button
                type="button"
                key={tabKey}
                className={tabKey === activeTab ? "active" : ""}
                onClick={() => setActiveTab(tabKey)}
              >
                {ProductContentTabs[tabKey]}
              </button>
            );
          })}
        </div>
        <SeparatorLine size="4" className="my-6" />
        {activeTab === "content" ? (
          <ProseMirrorRenderer content={content} />
        ) : activeTab === "comments" ? (
          <ProductComments />
        ) : null}
      </div>
    </section>
  );
};

export default Contents;
