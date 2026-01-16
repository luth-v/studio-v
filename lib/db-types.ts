// Database types for Studio-V
// Generated from Supabase schema

// ============================================
// ENUMS
// ============================================

export type ProductStatus = "pending" | "in_progress" | "completed";
export type MediaType = "original" | "generated";

// ============================================
// BASE ENTITIES
// ============================================

export interface Seller {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  seller_id: string | null;
  name: string;
  description: string | null;
  status: ProductStatus;
  created_at: string;
  updated_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  sku: string | null;
  created_at: string;
}

export interface Media {
  id: string;
  product_id: string;
  variant_id: string | null;
  type: MediaType;
  url: string;
  json_prompt: Record<string, unknown> | null;
  created_at: string;
}

// ============================================
// INSERT TYPES (without auto-generated fields)
// ============================================

export type SellerInsert = Omit<Seller, "id" | "created_at" | "updated_at">;
export type SellerUpdate = Partial<SellerInsert>;

export type ProductInsert = Omit<Product, "id" | "created_at" | "updated_at">;
export type ProductUpdate = Partial<ProductInsert>;

export type ProductVariantInsert = Omit<ProductVariant, "id" | "created_at">;
export type ProductVariantUpdate = Partial<
  Omit<ProductVariantInsert, "product_id">
>;

export type MediaInsert = Omit<Media, "id" | "created_at">;

// ============================================
// EXTENDED TYPES (with relations)
// ============================================

export interface ProductWithDetails extends Product {
  seller_name: string | null;
  seller_company: string | null;
  variant_count: number;
  original_count: number;
  generated_count: number;
}

export interface ProductWithVariants extends Product {
  seller?: Seller;
  variants: ProductVariant[];
}

export interface MediaWithProduct extends Media {
  product?: Product;
  variant?: ProductVariant;
}

// ============================================
// DASHBOARD STATS
// ============================================

export interface DashboardStats {
  total_sellers: number;
  total_products: number;
  total_media: number;
  generated_today: number;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code?: string;
}
