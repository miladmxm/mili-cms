import type { Editor } from "@tiptap/core";

import { Badge } from "@/components/dashboard/ui/badge";
import { ScrollArea } from "@/components/dashboard/ui/scroll-area";

interface TagListProps {
  tags: { name: string; id: string }[];
  editor: Editor;
}

const TagList = ({ editor, tags }: TagListProps) => {
  const addTag = (name: string) => {
    editor
      .chain()
      .focus()
      .insertContent({
        type: "tag",
        attrs: { tagName: `${name}` },
      })
      .run();
  };
  return (
    <ScrollArea dir="rtl" className="min-w-0 w-full">
      <div className="flex flex-nowrap gap-2">
        {tags.map(({ id, name }) => (
          <Badge
            className="cursor-pointer"
            key={id}
            variant="secondary"
            onClick={() => addTag(name)}
          >
            {name}
          </Badge>
        ))}
      </div>
    </ScrollArea>
  );
};

export default TagList;
