export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured?: boolean;
  vendor: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    description: "High-quality wireless headphones with active noise cancellation and premium sound quality.",
    rating: 4.8,
    reviews: 1247,
    inStock: true,
    featured: true,
    vendor: "TechVendor Inc"
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 399.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    description: "Advanced smartwatch with fitness tracking, health monitoring, and seamless connectivity.",
    rating: 4.6,
    reviews: 892,
    inStock: true,
    featured: true,
    vendor: "WearTech Ltd"
  },
  {
    id: 3,
    name: "Designer Sneakers",
    price: 159.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    description: "Stylish and comfortable sneakers perfect for everyday wear and athletic activities.",
    rating: 4.7,
    reviews: 634,
    inStock: true,
    featured: true,
    vendor: "FootStyle Co"
  },
  {
    id: 4,
    name: "Professional Camera",
    price: 1299.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop",
    description: "Professional-grade camera with 4K video recording and advanced autofocus system.",
    rating: 4.9,
    reviews: 423,
    inStock: true,
    featured: true,
    vendor: "PhotoGear Pro"
  },
  {
    id: 5,
    name: "Leather Backpack",
    price: 89.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    description: "Premium leather backpack with multiple compartments and laptop sleeve.",
    rating: 4.5,
    reviews: 567,
    inStock: true,
    vendor: "LeatherCraft"
  },
  {
    id: 6,
    name: "Wireless Earbuds",
    price: 129.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=500&fit=crop",
    description: "Compact wireless earbuds with crystal clear sound and long battery life.",
    rating: 4.4,
    reviews: 1834,
    inStock: true,
    vendor: "AudioTech"
  },
  {
    id: 7,
    name: "Gaming Keyboard",
    price: 149.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop",
    description: "Mechanical gaming keyboard with RGB lighting and programmable keys.",
    rating: 4.6,
    reviews: 723,
    inStock: true,
    vendor: "GameGear Pro"
  },
  {
    id: 8,
    name: "Sunglasses Classic",
    price: 79.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
    description: "Classic aviator sunglasses with UV protection and polarized lenses.",
    rating: 4.3,
    reviews: 412,
    inStock: true,
    vendor: "EyeStyle"
  },
  {
    id: 9,
    name: "Fitness Tracker",
    price: 79.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&h=500&fit=crop",
    description: "Waterproof fitness tracker with heart rate monitor and sleep tracking.",
    rating: 4.2,
    reviews: 945,
    inStock: false,
    vendor: "HealthTech"
  },
  {
    id: 10,
    name: "Coffee Maker",
    price: 199.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop",
    description: "Automatic coffee maker with programmable settings and thermal carafe.",
    rating: 4.7,
    reviews: 567,
    inStock: true,
    vendor: "HomeBrews"
  },
  {
    id: 11,
    name: "Yoga Mat Premium",
    price: 49.99,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop",
    description: "Extra-thick yoga mat with non-slip surface and carrying strap.",
    rating: 4.6,
    reviews: 823,
    inStock: true,
    vendor: "FitLife"
  },
  {
    id: 12,
    name: "Desk Lamp LED",
    price: 39.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
    description: "Adjustable LED desk lamp with touch control and USB charging port.",
    rating: 4.4,
    reviews: 334,
    inStock: true,
    vendor: "LightWorks"
  }
];

export const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Accessories",
  "Home",
  "Fitness"
];
