import { mergeAttributes, Node, nodeInputRule } from "@tiptap/core";

export const normilizeHtmlWhenUsingTagNode = (html: string) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(html, "text/html");
  dom.querySelectorAll<HTMLSpanElement>("span[tagname]").forEach((tag) => {
    tag.innerHTML = tag.dataset.tag || tag.innerHTML;
  });
  return dom;
};

export const TagNode = (list: string[] = []) => {
  const allowed = list.map((v) => v.replace(/[$(-+.?[-^{|}]/g, "\\$&"));
  return Node.create({
    name: "tag",
    inline: true,
    group: "inline",
    atom: true,
    addAttributes() {
      return { tagName: { default: "" }, text: { default: "milad" } };
    },
    parseHTML() {
      return [{ tag: "span[data-tag]" }];
    },
    renderHTML({ HTMLAttributes }) {
      return [
        "span",
        mergeAttributes(HTMLAttributes, {
          "data-tag": `{{${HTMLAttributes.tagName}}}`,
          class: "bg-primary rounded-md px-1.5 py-0.5",
          contenteditable: "false",
        }),
        HTMLAttributes.tagName,
      ];
    },
    addInputRules() {
      if (!allowed || allowed.length === 0) {
        return [
          nodeInputRule({
            find: /(\{\{([\s\w\u0600-\u06ff]+)\}\})$/,
            type: this.type,
            getAttributes: (match) => ({ tagName: match[2].trim() }),
          }),
        ];
      } else {
        return [
          nodeInputRule({
            find: RegExp(`(\\{\\{(${allowed.join("|")})\\}\\})$`),
            type: this.type,
            getAttributes: (match) => ({ tagName: match[2].trim() }),
          }),
        ];
      }
    },
  });
};
