-- Studio-V Database Schema
-- Run this in Supabase SQL Editor

-- Note: Supabase uses gen_random_uuid() from pgcrypto which is enabled by default

-- ============================================
-- SELLERS TABLE
-- ============================================
CREATE TABLE sellers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Add index on company for filtering
CREATE INDEX idx_sellers_company ON sellers(company);

-- ============================================
-- PRODUCTS TABLE
-- ============================================
CREATE TYPE product_status AS ENUM ('pending', 'in_progress', 'completed');

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID REFERENCES sellers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status product_status DEFAULT 'pending' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Add indexes for common queries
CREATE INDEX idx_products_seller_id ON products(seller_id);
CREATE INDEX idx_products_status ON products(status);

-- ============================================
-- PRODUCT VARIANTS TABLE
-- ============================================
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  sku TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Add index for product lookup
CREATE INDEX idx_product_variants_product_id ON product_variants(product_id);

-- ============================================
-- MEDIA TABLE
-- ============================================
CREATE TYPE media_type AS ENUM ('original', 'generated');

CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
  type media_type NOT NULL,
  url TEXT NOT NULL,
  json_prompt JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Add indexes for common queries
CREATE INDEX idx_media_product_id ON media(product_id);
CREATE INDEX idx_media_variant_id ON media(variant_id);
CREATE INDEX idx_media_type ON media(type);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to sellers
CREATE TRIGGER update_sellers_updated_at
  BEFORE UPDATE ON sellers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to products
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
-- Enable RLS on all tables
ALTER TABLE sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- For now, allow all operations (adjust based on auth needs)
-- These policies allow authenticated users full access
CREATE POLICY "Allow all for authenticated users" ON sellers
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all for authenticated users" ON products
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all for authenticated users" ON product_variants
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all for authenticated users" ON media
  FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- VIEWS FOR COMMON QUERIES
-- ============================================

-- Product with seller info and counts
CREATE VIEW products_with_details AS
SELECT 
  p.*,
  s.name as seller_name,
  s.company as seller_company,
  (SELECT COUNT(*) FROM product_variants pv WHERE pv.product_id = p.id) as variant_count,
  (SELECT COUNT(*) FROM media m WHERE m.product_id = p.id AND m.type = 'original') as original_count,
  (SELECT COUNT(*) FROM media m WHERE m.product_id = p.id AND m.type = 'generated') as generated_count
FROM products p
LEFT JOIN sellers s ON p.seller_id = s.id;

-- Dashboard stats
CREATE VIEW dashboard_stats AS
SELECT
  (SELECT COUNT(*) FROM sellers) as total_sellers,
  (SELECT COUNT(*) FROM products) as total_products,
  (SELECT COUNT(*) FROM media) as total_media,
  (SELECT COUNT(*) FROM media WHERE type = 'generated' AND created_at > NOW() - INTERVAL '1 day') as generated_today;
