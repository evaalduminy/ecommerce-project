"use client";
import { useState } from "react";
import { Plus, Edit, Trash2, Upload, Bell, X } from "lucide-react";
import { Sidebar } from "../shared/Sidebar";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

const initialProducts: Product[] = [
  { id: 1, name: 'Premium Wireless Headphones', price: 299.99, stock: 45, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop' },
  { id: 2, name: 'Smart Watch Pro', price: 399.99, stock: 23, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop' },
  { id: 3, name: 'Wireless Earbuds', price: 129.99, stock: 67, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=100&h=100&fit=crop' },
  { id: 4, name: 'Gaming Keyboard', price: 149.99, stock: 34, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100&h=100&fit=crop' },
];

const notifications: Notification[] = [
  { id: 1, title: 'New Order Received', message: 'Order #1234 for Premium Wireless Headphones', time: '5 min ago', unread: true },
  { id: 2, title: 'Stock Alert', message: 'Smart Watch Pro is running low on stock', time: '1 hour ago', unread: true },
  { id: 3, title: 'Product Review', message: 'New 5-star review on Wireless Earbuds', time: '2 hours ago', unread: false },
  { id: 4, title: 'Payment Received', message: 'Payment of $299.99 has been processed', time: '3 hours ago', unread: false },
];

export function VendorDashboard() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    stock: '',
    image: ''
  });
  const [imagePreview, setImagePreview] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setNewProduct(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: Date.now(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      image: imagePreview || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop'
    };
    setProducts([...products, product]);
    setNewProduct({ name: '', price: '', stock: '', image: '' });
    setImagePreview('');
    setShowAddForm(false);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar role="vendor" />

      <div className="flex-1 bg-background">
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-8 py-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl mb-1">My Products</h1>
              <p className="text-muted-foreground">Manage your product inventory</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-3 hover:bg-accent rounded-lg transition-colors"
                >
                  <Bell className="w-6 h-6" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-96 bg-popover border border-border rounded-lg shadow-xl z-50">
                    <div className="p-4 border-b border-border flex items-center justify-between">
                      <h3>Notifications</h3>
                      <button onClick={() => setShowNotifications(false)}>
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-border hover:bg-accent transition-colors ${
                            notification.unread ? 'bg-primary/5' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="text-sm">{notification.title}</h4>
                            {notification.unread && (
                              <span className="w-2 h-2 bg-primary rounded-full"></span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{notification.message}</p>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-8 py-8">
          {showAddForm && (
            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl">Add New Product</h2>
                <button onClick={() => setShowAddForm(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-6">
                <div>
                  <label className="block mb-2">Product Image</label>
                  <div className="flex items-center gap-6">
                    <div className="w-32 h-32 bg-muted border-2 border-dashed border-border rounded-lg flex items-center justify-center overflow-hidden">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Upload className="w-8 h-8 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-lg hover:bg-accent/80 cursor-pointer transition-colors"
                      >
                        <Upload className="w-5 h-5" />
                        Upload Image
                      </label>
                      <p className="text-sm text-muted-foreground mt-2">PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="name" className="block mb-2">Product Name</label>
                    <input
                      type="text"
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="price" className="block mb-2">Price ($)</label>
                    <input
                      type="number"
                      id="price"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="stock" className="block mb-2">Stock Quantity</label>
                    <input
                      type="number"
                      id="stock"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Add Product
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-6 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-6">Image</th>
                    <th className="text-left py-4 px-6">Product Name</th>
                    <th className="text-left py-4 px-6">Price</th>
                    <th className="text-left py-4 px-6">Stock</th>
                    <th className="text-left py-4 px-6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="py-4 px-6">{product.name}</td>
                      <td className="py-4 px-6 text-primary">${product.price}</td>
                      <td className="py-4 px-6">
                        <span className={product.stock < 30 ? 'text-yellow-500' : ''}>
                          {product.stock} units
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-accent rounded-lg transition-colors group">
                            <Edit className="w-5 h-5 group-hover:text-primary transition-colors" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 hover:bg-accent rounded-lg transition-colors group"
                          >
                            <Trash2 className="w-5 h-5 group-hover:text-destructive transition-colors" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

