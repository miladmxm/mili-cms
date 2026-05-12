import type { Product } from "@/services/product/type";

export const convertMetadataToIRT = (metadata: Product["metadata"]) =>
  metadata[0].price / 10;
