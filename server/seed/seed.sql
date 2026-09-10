-- Seed data for AURAÉ Fashion E-Commerce
USE fashion_store;

-- Clear existing data
TRUNCATE TABLE products;

INSERT INTO products (name, description, price, category, image, sizes, stock, featured) VALUES
(
    'Linen Oversized Shirt',
    'Tailored from breathable 100% organic linen with a relaxed drop-shoulder silhouette, mother-of-pearl buttons, and a clean curved hemline. Perfect for elevated everyday layering.',
    2299.00,
    'Tops',
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    '["XS", "S", "M", "L", "XL"]',
    14,
    TRUE
),
(
    'Satin Slip Dress',
    'A timeless bias-cut slip dress crafted from lustrous heavyweight silk satin. Features delicate adjustable spaghetti straps, a soft cowl neckline, and a subtle side slit.',
    3499.00,
    'Dresses',
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
    '["XS", "S", "M", "L"]',
    8,
    TRUE
),
(
    'Relaxed Wide-Leg Trousers',
    'Contemporary high-waisted trousers featuring front double pleats, clean welt pockets, and a fluid wide-leg drape in a premium wool-viscose blend.',
    2799.00,
    'Bottoms',
    'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=800&q=80',
    '["S", "M", "L", "XL"]',
    4,
    TRUE
),
(
    'Structured Wool Blazer',
    'A modern power silhouette with sharp padded shoulders, notched lapels, horn buttons, and full cupro lining. Designed to transition seamlessly from desk to evening.',
    5499.00,
    'Outerwear',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
    '["XS", "S", "M", "L"]',
    6,
    TRUE
),
(
    'Minimalist Leather Tote',
    'Sculpted from supple full-grain Italian calfskin leather with hand-painted raw edges, magnetic closure, and a detachable interior zip pouch.',
    3999.00,
    'Accessories',
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    '["One Size"]',
    9,
    FALSE
),
(
    'Ribbed Knit Tank Top',
    'Spun from ultra-fine pima cotton rib with a flattering square neckline and reinforced bindings. An essential foundational piece for effortless layering.',
    1499.00,
    'Tops',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
    '["XS", "S", "M", "L", "XL"]',
    16,
    FALSE
),
(
    'Pleated Georgette Midi Skirt',
    'Graceful knife-pleated midi skirt in lightweight airy georgette with an elasticized grosgrain waistband and tonal inner lining.',
    2999.00,
    'Bottoms',
    'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80',
    '["S", "M", "L"]',
    0,
    FALSE
),
(
    'Classic Double-Breasted Trench Coat',
    'Iconic weatherproof cotton gabardine trench featuring epaulettes, storm flaps, tortoiseshell buttons, and a belted waist with leather buckle.',
    5999.00,
    'Outerwear',
    'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=800&q=80',
    '["S", "M", "L", "XL"]',
    3,
    FALSE
),
(
    'Tiered Cotton Shirt Dress',
    'Breezy poplin shirt dress featuring a band collar, concealed button placket, cascading gathered tiers, and deep in-seam pockets.',
    2899.00,
    'Dresses',
    'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
    '["XS", "S", "M", "L", "XL"]',
    11,
    FALSE
),
(
    'Sleek Brass-Buckle Leather Belt',
    'Handcrafted 28mm vegetable-tanned leather belt with beveled edge finishing and a brushed solid brass buckle.',
    1199.00,
    'Accessories',
    'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80',
    '["S", "M", "L"]',
    22,
    FALSE
);