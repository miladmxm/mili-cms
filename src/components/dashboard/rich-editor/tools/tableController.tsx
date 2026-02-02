import { useTiptap, useTiptapState } from "@tiptap/react";
import {
  BetweenHorizontalEnd,
  BetweenHorizontalStart,
  BetweenVerticalEnd,
  BetweenVerticalStart,
  TableCellsMerge,
  TableColumnsSplit,
  TableRowsSplit,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "../../ui/button";
import { ButtonGroup } from "../../ui/button-group";

const TableController = () => {
  const { editor, isReady } = useTiptap();
  const { isTable } = useTiptapState((ctx) => ({
    isTable: ctx.editor.isActive("table"),
  }));
  if (!isReady || !editor) return;
  return (
    <div
      className={cn("h-0 overflow-hidden sticky start-0 transition-all w-fit", {
        "h-12": isTable,
      })}
    >
      {isTable && (
        <div className=" flex gap-2 pt-3">
          <ButtonGroup className="rtl:flex-row-reverse">
            <Button
              size="sm"
              title="افزودن ستون به قبل"
              variant="outline"
              onClick={() => editor.chain().focus().addColumnBefore().run()}
            >
              <BetweenVerticalStart />
            </Button>
            <Button
              size="sm"
              title="افزودن ستون"
              variant="outline"
              onClick={() => editor.chain().focus().addColumnAfter().run()}
            >
              <BetweenVerticalEnd />
            </Button>
            <Button
              size="sm"
              title="افزودن ردیف به بعدی"
              variant="outline"
              onClick={() => editor.chain().focus().addRowAfter().run()}
            >
              <BetweenHorizontalEnd />
            </Button>
            <Button
              size="sm"
              title="افزودن ردیف به قبلی"
              variant="outline"
              onClick={() => editor.chain().focus().addRowBefore().run()}
            >
              <BetweenHorizontalStart />
            </Button>
            <Button
              size="sm"
              title="حذف ردیف"
              variant="outline"
              onClick={() => editor.chain().focus().deleteRow().run()}
            >
              <TableRowsSplit />
            </Button>
            <Button
              size="sm"
              title="حذف ستون"
              variant="outline"
              onClick={() => editor.chain().focus().deleteColumn().run()}
            >
              <TableColumnsSplit />
            </Button>
            <Button
              size="sm"
              title="ترکیب کردن ستون ها"
              variant="outline"
              onClick={() => editor.chain().focus().mergeOrSplit().run()}
            >
              <TableCellsMerge />
            </Button>
          </ButtonGroup>
        </div>
      )}
    </div>
  );
};

export default TableController;
