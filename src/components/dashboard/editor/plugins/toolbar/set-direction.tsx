import { Separator } from "@/components/dashboard/ui/separator";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/dashboard/ui/toggle-group";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { setBlockDirection } from "../../shared/set-node-direction";

export function DirectionButtons() {
  const [editor] = useLexicalComposerContext();
  const setChange = (dir: "ltr" | "rtl") => {
    editor.update(() => {
      setBlockDirection(dir);
    });
  };
  return (
    <ToggleGroup
      onValueChange={setChange}
      type="single"
      className="flex rtl:flex-row-reverse"
    >
      <ToggleGroupItem
        value="rtl"
        size="sm"
        aria-label={"rtl"}
        variant="outline"
        title="RTL"
      >
        <ArrowLeft />
      </ToggleGroupItem>
      <Separator className="!h-7" orientation="vertical" />
      <ToggleGroupItem
        value="ltr"
        size="sm"
        title="LTR"
        aria-label={"ltr"}
        variant="outline"
      >
        <ArrowRight />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
