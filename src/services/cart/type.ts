import type { Media } from "../media/type";

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  metadataId: string | null;
  quantity: number;
  createdAt: Date;
  product: {
    id: string;
    name: string;
    slug: string;
    thumbnail: Media | null;
  } | null;
  metadata: {
    id: string;
    price: number;
    stock: number;
    discount: number;
    optionItemIds: string | null;
  } | null;
}

export interface Cart {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  items: CartItem[];
}

export interface AddToCartPayload {
  productId: string;
  quantity: number;
  userId: string;
  metadataId: string;
}
export interface UpdateCartItemPayload {
  userId: string;
  itemId: string;
  quantity: number;
}
