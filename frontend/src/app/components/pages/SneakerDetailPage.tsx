"use client";
import { useState } from "react";
import { ShoppingCart, ChevronDown, ChevronUp, Star, Truck, RefreshCw, Shield } from "lucide-react";
import { useCart } from "../../context/CartContext";

const sneakerImages = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop",
  "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=800&fit=crop",
  "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&h=800&fit=crop",
];

const sizes = ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'];

const sizeColors = [
  '#d80000', '#ef4444', '#f97316', '#f59e0b', '#84cc16',
  '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6'
];

const accordionSections = [
  {
    title: 'Product Details',
    content: 'These premium sneakers feature a breathable mesh upper with synthetic overlays for durability and support. The cushioned midsole provides all-day comfort, while the rubber outsole offers excellent traction on various surfaces. Perfect for both athletic activities and casual wear.'
  },
  {
    title: 'Size & Fit',
    content: 'True to size. We recommend ordering your regular shoe size. The sneaker features a medium width fit with a padded collar and tongue for added comfort. If you prefer a looser fit, consider going up half a size.'
  },
  {
    title: 'Shipping & Returns',
    content: 'Free standard shipping on orders over $100. Express shipping available at checkout. Free returns within 30 days of purchase. Items must be unworn and in original packaging with all tags attached.'
  },
  {
    title: 'Care Instructions',
    content: 'Clean with a soft, damp cloth. For tougher stains, use a mild soap solution. Air dry only - do not machine wash or dry. Store in a cool, dry place away from direct sunlight.'
  }
];

const relatedProducts = [
  { id: 101, name: 'Classic White Sneakers', price: 139.99, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop' },
  { id: 102, name: 'Black Running Shoes', price: 169.99, image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop' },
  { id: 103, name: 'Blue Athletic Trainers', price: 149.99, image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop' },
  { id: 104, name: 'Grey Casual Sneakers', price: 129.99, image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=400&h=400&fit=crop' },
];

export function SneakerDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart({
      id: 3,
      name: 'Designer Sneakers',
      price: 159.99,
      image: sneakerImages[0]
    });
  };

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-2xl overflow-hidden">
              <img
                src={sneakerImages[selectedImage]}
                alt="Sneaker"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {sneakerImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-muted rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-primary' : 'border-transparent hover:border-border'
                  }`}
                >
                  <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm mb-4">
                New Arrival
              </span>
              <h1 className="text-5xl mb-4">Designer Sneakers</h1>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <span>4.9</span>
                <span className="text-muted-foreground">(634 reviews)</span>
              </div>
              <p className="text-4xl text-primary mb-6">$159.99</p>
            </div>

            <div className="mb-8">
              <h3 className="mb-4">Select Size (US)</h3>
              <div className="grid grid-cols-6 gap-3">
                {sizes.map((size, index) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      backgroundColor: selectedSize === size ? sizeColors[index] : 'transparent',
                      borderColor: sizeColors[index],
                      color: selectedSize === size ? '#ffffff' : sizeColors[index]
                    }}
                    className="aspect-square border-2 rounded-xl hover:scale-105 transition-all font-medium"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-card border border-border rounded-xl">
              <div className="flex flex-col items-center text-center">
                <Truck className="w-6 h-6 text-primary mb-2" />
                <span className="text-sm">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center border-x border-border">
                <RefreshCw className="w-6 h-6 text-primary mb-2" />
                <span className="text-sm">30-Day Returns</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="w-6 h-6 text-primary mb-2" />
                <span className="text-sm">2-Year Warranty</span>
              </div>
            </div>

            <div className="mb-8 space-y-3">
              {accordionSections.map((section, index) => (
                <div key={index} className="border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between p-4 hover:bg-accent transition-colors"
                  >
                    <span className="font-medium">{section.title}</span>
                    {openAccordion === index ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  {openAccordion === index && (
                    <div className="px-4 pb-4 text-muted-foreground leading-relaxed">
                      {section.content}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="sticky bottom-4 z-10">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="w-6 h-6" />
                <span className="text-lg">Add to Cart - $159.99</span>
              </button>
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-3xl mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <div key={product.id} className="group cursor-pointer">
                <div className="aspect-square bg-muted rounded-xl overflow-hidden mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-xl text-primary">${product.price}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

