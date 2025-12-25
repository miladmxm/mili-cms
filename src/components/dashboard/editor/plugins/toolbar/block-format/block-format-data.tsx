import {
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  QuoteIcon,
  TextIcon,
} from "lucide-react";

export const blockTypeToBlockName: Record<
  string,
  { label: string; icon: React.ReactNode }
> = {
  paragraph: {
    label: "بند",
    icon: <TextIcon className="size-4" />,
  },
  h1: {
    label: "عنوان 1",
    icon: <Heading1Icon className="size-4" />,
  },
  h2: {
    label: "عنوان 2",
    icon: <Heading2Icon className="size-4" />,
  },
  h3: {
    label: "عنوان 3",
    icon: <Heading3Icon className="size-4" />,
  },
  number: {
    label: "لیست عددی",
    icon: <ListOrderedIcon className="size-4" />,
  },
  bullet: {
    label: "لیست معمولی",
    icon: <ListIcon className="size-4" />,
  },
  check: {
    label: "چک لیست",
    icon: <ListTodoIcon className="size-4" />,
  },
  code: {
    label: "بلاک کد",
    icon: <CodeIcon className="size-4" />,
  },
  quote: {
    label: "نقل قول",
    icon: <QuoteIcon className="size-4" />,
  },
};
