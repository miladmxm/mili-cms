import type {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  SerializedEditor,
  SerializedLexicalNode,
  Spread,
} from "lexical";
import type { JSX } from "react";

import { $applyNodeReplacement, createEditor, DecoratorNode } from "lexical";
import * as React from "react";
import { Suspense } from "react";

const ImageComponent = React.lazy(() => import("../editor-ui/image-component"));

export interface ImagePayload {
  altText: string;
  caption?: LexicalEditor;
  height?: number;
  key?: NodeKey;
  maxWidth?: number;
  showCaption?: boolean;
  src: string;
  width?: number;
  captionsEnabled?: boolean;
}

function isGoogleDocCheckboxImg(img: HTMLImageElement): boolean {
  return (
    img.parentElement != null &&
    img.parentElement.tagName === "LI" &&
    img.previousSibling === null &&
    img.getAttribute("aria-roledescription") === "checkbox"
  );
}

function $convertImageElement(domNode: Node): DOMConversionOutput | null {
  const img = domNode as HTMLImageElement;
  if (img.src.startsWith("file:///") || isGoogleDocCheckboxImg(img)) {
    return null;
  }
  const { alt: altText, src, width, height } = img;
  const node = $createImageNode({ altText, height, src, width });
  return { node };
}

export type SerializedImageNode = Spread<
  {
    altText: string;
    caption: SerializedEditor;
    height?: number;
    maxWidth: number;
    showCaption: boolean;
    src: string;
    width?: number;
  },
  SerializedLexicalNode
>;

export class ImageNode extends DecoratorNode<JSX.Element> {
  __altText: string;
  __caption: LexicalEditor;
  // Captions cannot yet be used within editor cells
  __captionsEnabled: boolean;
  __height: number | "inherit";
  __maxWidth: number;
  __showCaption: boolean;
  __src: string;
  __width: number | "inherit";

  constructor(
    src: string,
    altText: string,
    maxWidth: number,
    width?: number | "inherit",
    height?: number | "inherit",
    showCaption?: boolean,
    caption?: LexicalEditor,
    captionsEnabled?: boolean,
    key?: NodeKey,
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__maxWidth = maxWidth;
    this.__width = width || "inherit";
    this.__height = height || "inherit";
    this.__showCaption = showCaption || false;
    this.__caption =
      caption ||
      createEditor({
        nodes: [],
      });
    this.__captionsEnabled = captionsEnabled || captionsEnabled === undefined;
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(
      node.__src,
      node.__altText,
      node.__maxWidth,
      node.__width,
      node.__height,
      node.__showCaption,
      node.__caption,
      node.__captionsEnabled,
      node.__key,
    );
  }

  static getType(): string {
    return "image";
  }

  static importDOM(): DOMConversionMap | null {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      img: (node: Node) => ({
        conversion: $convertImageElement,
        priority: 0,
      }),
    };
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { altText, height, width, maxWidth, caption, src, showCaption } =
      serializedNode;
    const node = $createImageNode({
      altText,
      height,
      maxWidth,
      showCaption,
      src,
      width,
    });
    const nestedEditor = node.__caption;
    const editorState = nestedEditor.parseEditorState(caption.editorState);
    if (!editorState.isEmpty()) {
      nestedEditor.setEditorState(editorState);
    }
    return node;
  }

  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement("span");
    const theme = config.theme;
    const className = theme.image;
    if (className !== undefined) {
      span.className = className;
    }
    return span;
  }

  decorate(): JSX.Element {
    return (
      <Suspense fallback={null}>
        <ImageComponent
          resizable
          height={this.__height}
          width={this.__width}
          altText={this.__altText}
          maxWidth={this.__maxWidth}
          src={this.__src}
          caption={this.__caption}
          captionsEnabled={this.__captionsEnabled}
          nodeKey={this.getKey()}
          showCaption={this.__showCaption}
        />
      </Suspense>
    );
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("img");
    element.setAttribute("src", this.__src);
    element.setAttribute("alt", this.__altText);
    element.setAttribute("width", this.__width.toString());
    element.setAttribute("height", this.__height.toString());
    return { element };
  }

  exportJSON(): SerializedImageNode {
    return {
      altText: this.getAltText(),
      caption: this.__caption.toJSON(),
      height: this.__height === "inherit" ? 0 : this.__height,
      maxWidth: this.__maxWidth,
      showCaption: this.__showCaption,
      src: this.getSrc(),
      type: "image",
      version: 1,
      width: this.__width === "inherit" ? 0 : this.__width,
    };
  }

  // View

  getAltText(): string {
    return this.__altText;
  }

  getSrc(): string {
    return this.__src;
  }

  setShowCaption(showCaption: boolean): void {
    const writable = this.getWritable();
    writable.__showCaption = showCaption;
  }

  setWidthAndHeight(
    width: number | "inherit",
    height: number | "inherit",
  ): void {
    const writable = this.getWritable();
    writable.__width = width;
    writable.__height = height;
  }

  updateDOM(): false {
    return false;
  }
}

export function $createImageNode({
  altText,
  height,
  maxWidth = 500,
  captionsEnabled,
  src,
  width,
  showCaption,
  caption,
  key,
}: ImagePayload): ImageNode {
  return $applyNodeReplacement(
    new ImageNode(
      src,
      altText,
      maxWidth,
      width,
      height,
      showCaption,
      caption,
      captionsEnabled,
      key,
    ),
  );
}

export function $isImageNode(
  node: LexicalNode | null | undefined,
): node is ImageNode {
  return node instanceof ImageNode;
}
