const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
dotenv.config({ path: './backend/.env' });

const User = require('./models/User');
const Vendor = require('./models/Vendor');
const Category = require('./models/Category');
const Product = require('./models/Product');

const categories = [
  { name: 'Electronics', slug: 'electronics', description: 'Smartphones, headphones, gadgets & more', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop' },
  { name: 'Fashion', slug: 'fashion', description: 'Clothing, shoes, and accessories', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop' },
  { name: 'Home & Living', slug: 'home-living', description: 'Furniture, decor, and essentials', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop' },
  { name: 'Sports & Fitness', slug: 'sports-fitness', description: 'Gear, equipment, and activewear', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop' },
  { name: 'Accessories', slug: 'accessories', description: 'Watches, bags, jewelry & more', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=300&fit=crop' },
];

const productsByCategory = {
  'Electronics': [
    { name: 'Premium Wireless Headphones', description: 'Active noise cancellation with 40-hour battery life. Premium sound quality with deep bass and crystal-clear highs.', price: 299.99, stock: 45, images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop'] },
    { name: 'Smart Watch Pro X', description: 'Advanced health monitoring, GPS tracking, and seamless notifications. Water-resistant to 50m.', price: 399.99, stock: 23, images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop'] },
    { name: 'Wireless Earbuds Ultra', description: 'True wireless with spatial audio, transparency mode, and 8-hour playtime per charge.', price: 179.99, stock: 67, images: ['https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&h=600&fit=crop'] },
    { name: 'Mechanical Gaming Keyboard', description: 'RGB backlit, cherry MX switches, programmable macros, and aircraft-grade aluminum body.', price: 149.99, stock: 34, images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop'] },
    { name: 'Portable Bluetooth Speaker', description: 'Waterproof, 360° sound, 24-hour battery, and built-in microphone for calls.', price: 89.99, stock: 90, images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop'] },
  ],
  'Fashion': [
    { name: 'Classic Leather Jacket', description: 'Genuine lambskin leather with quilted lining. Timeless design for any occasion.', price: 349.99, stock: 15, images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop'] },
    { name: 'Premium Denim Jeans', description: 'Slim fit, raw selvedge denim from Japan. Hand-finished with copper rivets.', price: 129.99, stock: 40, images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop'] },
    { name: 'Designer Sneakers', description: 'Limited edition, handcrafted Italian leather uppers with cushioned sole technology.', price: 219.99, stock: 28, images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop'] },
    { name: 'Cashmere Crew Sweater', description: '100% Mongolian cashmere, ribbed cuffs, relaxed fit. Incredibly soft and warm.', price: 189.99, stock: 22, images: ['https://images.unsplash.com/photo-1434389677669-e08b4cda3a01?w=600&h=600&fit=crop'] },
  ],
  'Home & Living': [
    { name: 'Artisan Coffee Maker', description: 'Pour-over system with built-in grinder and thermal carafe. Barista quality at home.', price: 249.99, stock: 18, images: ['https://images.unsplash.com/photo-1517256064527-9d84b56ddc50?w=600&h=600&fit=crop'] },
    { name: 'Minimalist Desk Lamp', description: 'LED with adjustable color temperature, wireless charging base, and sleek aluminum design.', price: 79.99, stock: 55, images: ['https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600&h=600&fit=crop'] },
    { name: 'Premium Scented Candle Set', description: 'Hand-poured soy wax candles in artisan ceramic vessels. Set of 3 signature scents.', price: 64.99, stock: 80, images: ['https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=600&h=600&fit=crop'] },
    { name: 'Modern Throw Blanket', description: 'Chunky knit throw in organic cotton. Oversized 60x80 inches. Machine washable.', price: 99.99, stock: 35, images: ['https://images.unsplash.com/photo-1580301762395-21ce05c5f352?w=600&h=600&fit=crop'] },
  ],
  'Sports & Fitness': [
    { name: 'Yoga Mat Premium', description: 'Non-slip, eco-friendly natural rubber. Extra thick 6mm with alignment guides.', price: 69.99, stock: 60, images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=600&fit=crop'] },
    { name: 'Adjustable Dumbbell Set', description: 'Quick-change weight system, 5-52.5 lbs per dumbbell. Replaces 15 pairs of dumbbells.', price: 349.99, stock: 12, images: ['https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=600&h=600&fit=crop'] },
    { name: 'Running Shoes Elite', description: 'Carbon fiber plate, responsive foam, breathable knit upper. Designed for speed.', price: 179.99, stock: 42, images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop'] },
  ],
  'Accessories': [
    { name: 'Chronograph Watch', description: 'Swiss movement, sapphire crystal, genuine leather strap. Water-resistant 100m.', price: 599.99, stock: 8, images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=600&fit=crop'] },
    { name: 'Leather Messenger Bag', description: 'Full-grain Italian leather, brass hardware, padded laptop compartment. Handmade.', price: 279.99, stock: 20, images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop'] },
    { name: 'Polarized Aviator Sunglasses', description: 'Titanium frame, UV400 protection, scratch-resistant lenses. Classic pilot design.', price: 149.99, stock: 50, images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop'] },
    { name: 'Minimalist Leather Wallet', description: 'RFID blocking, slim bifold design, holds 8 cards + cash. Premium Italian leather.', price: 79.99, stock: 65, images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=600&fit=crop'] },
  ]
};

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      tls: true
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log('🗑️  Cleared existing products and categories');

    // Create categories
    const createdCategories = {};
    for (const cat of categories) {
      const created = await Category.create(cat);
      createdCategories[cat.name] = created._id;
      console.log(`📁 Created category: ${cat.name}`);
    }

    // Find or create a vendor
    let vendorUser = await User.findOne({ role: 'vendor' });
    if (!vendorUser) {
      vendorUser = await User.create({
        name: 'Crimson Store',
        email: 'vendor@crimson.com',
        password: 'password123',
        role: 'vendor'
      });
      console.log('👤 Created vendor user: vendor@crimson.com / password123');
    }

    let vendor = await Vendor.findOne({ userId: vendorUser._id });
    if (!vendor) {
      vendor = await Vendor.create({
        userId: vendorUser._id,
        storeName: 'Crimson Flagship Store',
        storeDescription: 'Premium curated products from top brands worldwide'
      });
      console.log('🏪 Created vendor profile: Crimson Flagship Store');
    }

    // Create products
    let totalProducts = 0;
    for (const [categoryName, products] of Object.entries(productsByCategory)) {
      const categoryId = createdCategories[categoryName];
      for (const product of products) {
        await Product.create({
          ...product,
          vendorId: vendor._id,
          category: categoryId
        });
        totalProducts++;
      }
      console.log(`📦 Seeded ${products.length} products in ${categoryName}`);
    }

    console.log(`\n🎉 Done! Seeded ${totalProducts} products across ${categories.length} categories.`);
    console.log('\n🔑 Vendor login: vendor@crimson.com / password123');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

seedProducts();
