import { useTiptap } from "@tiptap/react";
import { Table } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Switch } from "../../ui/switch";

const VisualTableSelector = ({
  onSelect,
}: {
  onSelect: (selected: { rows: number; cols: number }) => void;
}) => {
  const rows = Array.from({ length: 10 }, (_, i) => i);
  const [selected, setSelected] = useState<[number, number]>([0, 0]);
  return (
    <div className="flex flex-col gap-4 items-center">
      <table className="border-collapse border border-border w-max mx-auto">
        <tbody>
          {rows.map((row) => (
            <tr
              className="flex"
              key={row}
              onPointerLeave={() => setSelected([0, 0])}
            >
              {rows.map((col) => (
                <td
                  key={col}
                  onClick={() =>
                    onSelect({ rows: selected[0] + 1, cols: selected[1] + 1 })
                  }
                  onPointerEnter={() => setSelected([row, col])}
                  className={cn(
                    "size-5 border border-border hover:bg-primary/60",
                    {
                      "bg-primary/60": row <= selected[0] && col <= selected[1],
                    },
                  )}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <small>
        {selected[0] + 1} ستون و {selected[1] + 1} ردیف انتخاب شده است
      </small>
    </div>
  );
};

const AddTable = () => {
  const { editor, isReady } = useTiptap();
  const [open, setOpen] = useState(false);
  const [hasHeader, setHasHeader] = useState<boolean>(true);
  if (!editor || !isReady) return;
  const onClickHandler = ({ cols, rows }: { rows: number; cols: number }) => {
    editor
      .chain()
      .focus()
      .insertTable({ cols, rows, withHeaderRow: hasHeader })
      .run();
    setOpen(false);
  };
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          <Table />
          افزودن جدول
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>لطفا مشخصات جدول را انتخاب کنید</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Label htmlFor="hasHeader">جدول دارای سرستون باشد</Label>
          <Switch
            defaultChecked
            size="sm"
            checked={hasHeader}
            className="dir-ltr"
            id="hasHeader"
            onCheckedChange={setHasHeader}
          />
        </div>
        <VisualTableSelector onSelect={onClickHandler} />
      </DialogContent>
    </Dialog>
  );
};

export default AddTable;
