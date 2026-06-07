import type { Product } from "@/services/product/type";

import { ProseMirrorRenderer } from "@/components/ui/proseMirrorRenderer";
import SeparatorLine from "@/components/ui/separatorLine";

const Contents = ({ content }: { content: Product["content"] }) => {
  return (
    <section className="container">
      <div className="bg-white rounded-6xl p-12">
        <div className="flex justify-between text-thready-800 [&>button.active]:text-secondary-500">
          <button type="button" className="active">
            مشخصات محصول
          </button>
          <button type="button">نظر کاربران</button>
          <button type="button">پرسش و پاسخ</button>
        </div>
        <SeparatorLine size="4" className="my-6" />
        <ProseMirrorRenderer content={content} />
      </div>
    </section>
  );
};

export default Contents;
