import type { Editor } from "@tiptap/core";

import { List, ListOrdered } from "lucide-react";

import { Button } from "@/components/dashboard/ui/button";

const Lists = ({ editor }: { editor: Editor }) => {
  return (
    <>
      <Button
        size="icon-sm"
        type="button"
        variant="outline"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List />
      </Button>
      <Button
        size="icon-sm"
        type="button"
        variant="outline"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered />
      </Button>
    </>
  );
};

export default Lists;
