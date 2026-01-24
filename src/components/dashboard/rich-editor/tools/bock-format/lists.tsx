import { useCurrentEditor } from "@tiptap/react";
import { ListIcon, ListOrderedIcon, ListTodoIcon } from "lucide-react";

import { SelectItem } from "@/components/dashboard/ui/select";

const AllListItems = [
  {
    name: "orderedList",
    label: "لیست عددی",
    format: "toggleOrderedList",
    Icon: ListOrderedIcon,
  },
  {
    name: "bulletList",
    label: "لیست معمولی",
    format: "toggleBulletList",
    Icon: ListIcon,
  },
  {
    name: "taskList",
    label: "چک لیست",
    format: "toggleTaskList",
    Icon: ListTodoIcon,
  },
] as const;
const Lists = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return;
  return (
    <>
      {AllListItems.map(({ format, label, name, Icon }) => (
        <SelectItem
          key={name}
          value={name}
          onPointerDown={() => editor.chain().focus()[format]().run()}
        >
          <Icon />
          {label}
        </SelectItem>
      ))}
    </>
  );
};

export default Lists;
