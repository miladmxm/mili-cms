export type JsonValue =
  | boolean
  | number
  | string
  | JsonArray
  | JsonObject
  | null
  | undefined;
export interface JsonObject {
  [key: string]: JsonValue;
}

export interface JsonArray extends Array<JsonValue> {}

export type SearchParams = Record<string, string | string[] | undefined>;
