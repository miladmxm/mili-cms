import { useCurrentEditor } from "@tiptap/react";
import { Heading1, Heading2, Heading3 } from "lucide-react";

import { SelectItem } from "@/components/dashboard/ui/select";

const Headings = [
  { name: "H1", label: "عنوان 1", level: 1, Icon: Heading1 },
  { name: "H2", label: "عنوان 2", level: 2, Icon: Heading2 },
  { name: "H3", label: "عنوان 3", level: 3, Icon: Heading3 },
] as const;
const HeadingItems = () => {
  const { editor } = useCurrentEditor();
  return (
    <>
      {Headings.map(({ name, level, Icon, label }) => (
        <SelectItem
          key={name}
          value={name}
          onPointerDown={() => {
            editor?.chain().focus().setHeading({ level }).run();
          }}
        >
          <Icon />
          {label}
        </SelectItem>
      ))}
    </>
  );
};

export default HeadingItems;
