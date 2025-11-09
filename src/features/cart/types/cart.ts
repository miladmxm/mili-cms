export interface Variation {
  attribute: string;
  value: string;
}
export interface AddToCart {
  id: number;
  quantity: number;
  variation: Variation[];
}
