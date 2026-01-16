import { supabase } from "./supabase";
import type {
  Seller,
  SellerInsert,
  SellerUpdate,
  Product,
  ProductInsert,
  ProductUpdate,
  ProductWithDetails,
  ProductVariant,
  ProductVariantInsert,
  ProductVariantUpdate,
  Media,
  MediaInsert,
  DashboardStats,
  ProductStatus,
  MediaType,
} from "./db-types";

// ============================================
// SELLERS
// ============================================

export async function getSellers(): Promise<Seller[]> {
  const { data, error } = await supabase
    .from("sellers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getSeller(id: string): Promise<Seller | null> {
  const { data, error } = await supabase
    .from("sellers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return data;
}

export async function createSeller(seller: SellerInsert): Promise<Seller> {
  const { data, error } = await supabase
    .from("sellers")
    .insert(seller)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateSeller(
  id: string,
  updates: SellerUpdate,
): Promise<Seller> {
  const { data, error } = await supabase
    .from("sellers")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteSeller(id: string): Promise<void> {
  const { error } = await supabase.from("sellers").delete().eq("id", id);
  if (error) throw error;
}

// ============================================
// PRODUCTS
// ============================================

export async function getProducts(options?: {
  sellerId?: string;
  status?: ProductStatus;
}): Promise<ProductWithDetails[]> {
  let query = supabase
    .from("products_with_details")
    .select("*")
    .order("created_at", { ascending: false });

  if (options?.sellerId) {
    query = query.eq("seller_id", options.sellerId);
  }
  if (options?.status) {
    query = query.eq("status", options.status);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data || [];
}

export async function getProduct(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return data;
}

export async function createProduct(product: ProductInsert): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProduct(
  id: string,
  updates: ProductUpdate,
): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}

// ============================================
// PRODUCT VARIANTS
// ============================================

export async function getProductVariants(
  productId: string,
): Promise<ProductVariant[]> {
  const { data, error } = await supabase
    .from("product_variants")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function createProductVariant(
  variant: ProductVariantInsert,
): Promise<ProductVariant> {
  const { data, error } = await supabase
    .from("product_variants")
    .insert(variant)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProductVariant(
  id: string,
  updates: ProductVariantUpdate,
): Promise<ProductVariant> {
  const { data, error } = await supabase
    .from("product_variants")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProductVariant(id: string): Promise<void> {
  const { error } = await supabase
    .from("product_variants")
    .delete()
    .eq("id", id);
  if (error) throw error;
}

// ============================================
// MEDIA
// ============================================

export async function getMedia(options?: {
  productId?: string;
  variantId?: string;
  type?: MediaType;
}): Promise<Media[]> {
  let query = supabase
    .from("media")
    .select("*")
    .order("created_at", { ascending: false });

  if (options?.productId) {
    query = query.eq("product_id", options.productId);
  }
  if (options?.variantId) {
    query = query.eq("variant_id", options.variantId);
  }
  if (options?.type) {
    query = query.eq("type", options.type);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data || [];
}

export async function createMedia(media: MediaInsert): Promise<Media> {
  const { data, error } = await supabase
    .from("media")
    .insert(media)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteMedia(id: string): Promise<void> {
  const { error } = await supabase.from("media").delete().eq("id", id);
  if (error) throw error;
}

// ============================================
// DASHBOARD
// ============================================

export async function getDashboardStats(): Promise<DashboardStats> {
  const { data, error } = await supabase
    .from("dashboard_stats")
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

// ============================================
// SEARCH
// ============================================

export async function searchSellers(query: string): Promise<Seller[]> {
  const { data, error } = await supabase
    .from("sellers")
    .select("*")
    .or(`name.ilike.%${query}%,company.ilike.%${query}%,email.ilike.%${query}%`)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) throw error;
  return data || [];
}

export async function searchProducts(
  query: string,
): Promise<ProductWithDetails[]> {
  const { data, error } = await supabase
    .from("products_with_details")
    .select("*")
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) throw error;
  return data || [];
}
