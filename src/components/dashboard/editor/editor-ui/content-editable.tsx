import type { JSX } from "react";

import { ContentEditable as LexicalContentEditable } from "@lexical/react/LexicalContentEditable";

interface Props {
  placeholder: string;
  className?: string;
  placeholderClassName?: string;
}

export function ContentEditable({
  placeholder,
  className,
  placeholderClassName,
}: Props): JSX.Element {
  return (
    <LexicalContentEditable
      aria-placeholder={placeholder}
      placeholder={
        <div
          className={
            placeholderClassName ??
            `text-muted-foreground pointer-events-none absolute top-0 start-0 overflow-hidden px-8 py-[18px] text-ellipsis select-none`
          }
        >
          {placeholder}
        </div>
      }
      className={
        className ??
        `ContentEditable__root relative block min-h-72 overflow-auto px-8 py-4 focus:outline-none`
      }
    />
  );
}
