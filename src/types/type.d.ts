export type SearchParams = Record<string, string | string[] | undefined>;
export type Currency = "IRR";
export interface ProseMirror {
  type?: string;
  attrs?: Record<string, any> | undefined;
  content?: ProseMirror[];
  marks?: {
    type: string;
    attrs?: Record<string, any>;
    [key: string]: any;
  }[];
  text?: string;
  [key: string]: any;
}
