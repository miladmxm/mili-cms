interface WooProductPrice {
  price: string;
  regular_price: string;
  sale_price: string;
  price_range: {
    min_amount: string;
    max_amount: string;
  } | null;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
}

interface WooProductImage {
  id: number;
  src: string;
  thumbnail: string;
  srcset: string;
  sizes: string;
  name: string;
  alt: string;
}

interface WooProductCategory {
  id: number;
  name: string;
  slug: string;
  link: string;
}

interface ProductAttributeTerm {
  id: number;
  name: string;
  slug: string;
}

interface ProductAttribute {
  id: number;
  name: string;
  taxonomy: string;
  has_variations: boolean;
  terms: ProductAttributeTerm[];
}

interface ProductVariation {
  id: number;
  attributes: {
    name: string;
    value: string;
  }[];
}

interface StockAvailability {
  text: string;
  class: string;
}

interface AddToCart {
  text: string;
  description: string;
  url: string;
  single_text: string;
  minimum: number;
  maximum: number;
  multiple_of: number;
}

export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  parent: number;
  type: "external" | "grouped" | "simple" | "variable";
  permalink: string;
  sku: string;
  short_description: string;
  description: string;
  on_sale: boolean;
  prices: WooProductPrice;
  price_html: string;
  average_rating: string;
  review_count: number;
  images: WooProductImage[];
  categories: WooProductCategory[];
  tags: any[];
  brands: any[];
  attributes: ProductAttribute[];
  variation: string;
  variations: ProductVariation[];
  grouped_products: any[];
  has_options: boolean;
  is_purchasable: boolean;
  is_in_stock: boolean;
  is_on_backorder: boolean;
  low_stock_remaining: number | null;
  stock_availability: StockAvailability;
  sold_individually: boolean;
  add_to_cart: AddToCart;
  extensions: Record<string, any>;
}

interface BaseWooStoreProductQuery {
  search?: string;
  slug?: string;
  after?: string;
  before?: string;
  date_column?: "date_gmt" | "date" | "modified_gmt" | "modified";
  exclude?: number[];
  include?: number[];
  page?: number;
  per_page?: number;
  order?: "asc" | "desc";
  orderby?:
    | "comment_count"
    | "date"
    | "id"
    | "include"
    | "menu_order"
    | "modified"
    | "popularity"
    | "price"
    | "rating"
    | "slug"
    | "title";

  parent?: number[];
  parent_exclude?: number[];
  type?: string;
  sku?: string;
  featured?: boolean;
  category?: string;
  category_operator?: "and" | "in" | "not_in";
  brand?: string;
  brand_operator?: "and" | "in" | "not_in";
  tag?: string;
  tag_operator?: "and" | "in" | "not_in";
  on_sale?: boolean;
  min_price?: string;
  max_price?: string;
  stock_status?: ("instock" | "onbackorder" | "outofstock")[];
  attributes?: {
    attribute: string;
    term_id?: number;
    slug?: string;
    operator?: "and" | "in" | "not_in";
  }[];
  attribute_relation?: "AND" | "OR";
  catalog_visibility?: "any" | "catalog" | "hidden" | "search" | "visible";
  rating?: number;
}

export type WooStoreProductQuery = BaseWooStoreProductQuery &
  Record<
    `_unstable_tax_${string}_operator`,
    "and" | "in" | "not_in" | undefined
  > &
  Record<`_unstable_tax_${string}`, string | undefined>;

interface ProductPrice {
  price: string;
  regularPrice: string;
  salePrice: string;
  priceRange: {
    minAmount: string;
    maxAmount: string;
  } | null;
  currencyCode: string;
  currencySymbol: string;
  currencyMinorUnit: number;
  currencyDecimalSeparator: string;
  currencyThousandSeparator: string;
  currencyPrefix: string;
  currencySuffix: string;
}

interface ProductImage {
  id: number;
  src: string;
  thumbnail: string;
  name: string;
  alt: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  type: "grouped" | "simple" | "variable";
  shortDescription: string;
  description: string;
  prices: ProductPrice;
  reviewCount: number;
  images: ProductImage[];
  categories: Omit<WooProductCategory, "link">[];
  attributes: Omit<ProductAttribute, "taxonomy">[];
  variations: ProductVariation[];
  isPurchasable: boolean;
  isInStock: boolean;
  stock?: number;
}
