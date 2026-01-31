import { useTiptap } from "@tiptap/react";
import { Table } from "lucide-react";

import { Button } from "../../ui/button";

const AddTable = () => {
  const { editor, isReady } = useTiptap();

  if (!editor || !isReady) return;
  const onClickHandler = () => {
    editor
      .chain()
      .focus()
      .insertTable({ cols: 4, rows: 4, withHeaderRow: true })
      .run();
  };
  return (
    <Button size="sm" variant="ghost" onClick={onClickHandler}>
      <Table />
      افزودن جدول
    </Button>
  );
};

export default AddTable;
