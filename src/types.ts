export interface ProductVariant {
  id?: string;
  title?: string;
  sku?: string;
  price?: number;
  inventory_qty?: number | null;
  [key: string]: unknown;
}

export interface Product {
  id: string;
  handle: string;
  name: string;
  price: number;
  sku?: string;
  product_type?: string;
  images?: string[];
  tags?: string[];
  variants?: ProductVariant[];
  [key: string]: unknown;
}
