import { $getNearestNodeOfType } from "@lexical/utils";
import { $getSelection, $isRangeSelection, ElementNode } from "lexical";

export function setBlockDirection(direction: "rtl" | "ltr") {
  const selection = $getSelection();

  if (!$isRangeSelection(selection)) return;

  const anchorNode = selection.anchor.getNode();
  const paragraph = $getNearestNodeOfType(anchorNode, ElementNode);

  if (paragraph && paragraph instanceof ElementNode) {
    paragraph.setDirection(direction);
  }
}
