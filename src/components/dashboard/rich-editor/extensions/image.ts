// extensions/imageAlign.ts
import Image from "@tiptap/extension-image";

export const ImageWithAlign = Image.configure({
  resize: {
    enabled: true,
    directions: ["bottom-left", "bottom-right"],
    minWidth: 50,
    minHeight: 50,
    alwaysPreserveAspectRatio: true,
  },
}).extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      align: {
        default: "center",
        parseHTML: (element) => element.getAttribute("data-align"),
        renderHTML: (attributes) => {
          return {
            "data-align": attributes.align,
            class: `img-align-${attributes.align}`,
          };
        },
      },
    };
  },
});
