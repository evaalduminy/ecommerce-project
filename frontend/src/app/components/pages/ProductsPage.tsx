"use client";
import { useState } from "react";
import { Filter } from "lucide-react";
import { ProductCard } from "../shared/ProductCard";

export function ProductsPage({ products = [], categories = [] }: { products?: any[], categories?: string[] }) {
  const mappedProducts = products.map(p => ({
    id: p._id || p.id,
    name: p.name,
    price: p.price,
    image: p.images?.[0] || p.image || "https://via.placeholder.com/400",
    rating: p.rating || 5.0,
    reviews: p.reviews || 120,
    inStock: typeof p.countInStock !== 'undefined' ? p.countInStock > 0 : typeof p.inStock !== 'undefined' ? p.inStock : true,
    category: p.category || "Uncategorized",
    description: p.description || "",
    vendor: p.vendor || "Vendor",
  }));

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = mappedProducts.filter(product => {
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && priceMatch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl mb-2">All Products</h1>
          <p className="text-muted-foreground">Showing {filteredProducts.length} products</p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-accent"
        >
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      <div className="flex gap-8">
        <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 shrink-0`}>
          <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
            <h3 className="mb-4">Filters</h3>

            <div className="mb-6">
              <h4 className="text-sm mb-3">Category</h4>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm mb-3">Price Range</h4>
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full accent-primary"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedCategory("All");
                setPriceRange([0, 2000]);
              }}
              className="w-full mt-6 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </aside>

        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No products found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

