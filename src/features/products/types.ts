export interface Category {
  count: number;
  description: string;
  id: number;
  image: string;
  name: string;
  parent: number;
  slug: string;
}

// قیمت محصول
interface ProductPrice {
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

// تصویر محصول
interface ProductImage {
  id: number;
  src: string;
  thumbnail: string;
  srcset: string;
  sizes: string;
  name: string;
  alt: string;
}

// دسته‌بندی
interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  link: string;
}

// ویژگی‌ها
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

// وارییشن‌ها
interface ProductVariation {
  id: number;
  attributes: {
    name: string;
    value: string;
  }[];
}

// وضعیت موجودی
interface StockAvailability {
  text: string;
  class: string;
}

// قابلیت افزودن به سبد خرید
interface AddToCart {
  text: string;
  description: string;
  url: string;
  single_text: string;
  minimum: number;
  maximum: number;
  multiple_of: number;
}

// محصول اصلی
export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  parent: number;
  type: "external" | "grouped" | "simple" | "variable";
  variation: string;
  permalink: string;
  sku: string;
  short_description: string;
  description: string;
  on_sale: boolean;
  prices: ProductPrice;
  price_html: string;
  average_rating: string;
  review_count: number;
  images: ProductImage[];
  categories: ProductCategory[];
  tags: any[];
  brands: any[];
  attributes: ProductAttribute[];
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
