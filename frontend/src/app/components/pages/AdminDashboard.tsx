import { DollarSign, ShoppingCart, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Sidebar } from "../shared/Sidebar";

const salesData = [
  { month: 'Oct 2025', sales: 35000 },
  { month: 'Nov 2025', sales: 42000 },
  { month: 'Dec 2025', sales: 51000 },
  { month: 'Jan 2026', sales: 48000 },
  { month: 'Feb 2026', sales: 55000 },
  { month: 'Mar 2026', sales: 63000 },
  { month: 'Apr 2026', sales: 71000 },
];

const recentOrders = [
  { id: 'ORD-2026-1234', customer: 'John Doe', product: 'Wireless Headphones', amount: 299.99, status: 'Pending', date: '2026-04-22' },
  { id: 'ORD-2026-1235', customer: 'Jane Smith', product: 'Smart Watch Pro', amount: 399.99, status: 'Shipped', date: '2026-04-22' },
  { id: 'ORD-2026-1236', customer: 'Mike Johnson', product: 'Designer Sneakers', amount: 159.99, status: 'Pending', date: '2026-04-21' },
  { id: 'ORD-2026-1237', customer: 'Sarah Williams', product: 'Gaming Keyboard', amount: 149.99, status: 'Shipped', date: '2026-04-21' },
  { id: 'ORD-2026-1238', customer: 'David Brown', product: 'Coffee Maker', amount: 199.99, status: 'Shipped', date: '2026-04-20' },
  { id: 'ORD-2026-1239', customer: 'Emily Davis', product: 'Wireless Earbuds', amount: 129.99, status: 'Pending', date: '2026-04-20' },
  { id: 'ORD-2026-1240', customer: 'Chris Wilson', product: 'Yoga Mat Premium', amount: 49.99, status: 'Shipped', date: '2026-04-19' },
];

export function AdminDashboard() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar role="admin" />

      <div className="flex-1 bg-background">
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-7 h-7 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                  <div className="flex items-center gap-2">
                    <p className="text-3xl">$71,234</p>
                    <span className="flex items-center gap-1 text-sm text-green-500">
                      <TrendingUp className="w-4 h-4" />
                      12.5%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-7 h-7 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
                  <div className="flex items-center gap-2">
                    <p className="text-3xl">2,547</p>
                    <span className="flex items-center gap-1 text-sm text-blue-500">
                      <TrendingUp className="w-4 h-4" />
                      8.2%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-8 py-8">
          <div className="bg-card border border-border rounded-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl mb-1">Sales Overview</h2>
                <p className="text-muted-foreground">Last 6 months performance</p>
              </div>
              <div className="flex items-center gap-2 text-green-500">
                <TrendingUp className="w-5 h-5" />
                <span>+18.2% from last period</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="month" stroke="#a3a3a3" />
                <YAxis stroke="#a3a3a3" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#171717',
                    border: '1px solid #2a2a2a',
                    borderRadius: '8px',
                    color: '#f5f5f5'
                  }}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#d80000"
                  strokeWidth={3}
                  dot={{ fill: '#d80000', r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl mb-1">Recent Orders</h2>
                <p className="text-muted-foreground">Latest customer transactions</p>
              </div>
              <button className="px-4 py-2 text-primary hover:bg-accent rounded-lg transition-colors">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4">Order ID</th>
                    <th className="text-left py-4 px-4">Customer</th>
                    <th className="text-left py-4 px-4">Product</th>
                    <th className="text-left py-4 px-4">Date</th>
                    <th className="text-left py-4 px-4">Amount</th>
                    <th className="text-left py-4 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                      <td className="py-4 px-4">
                        <span className="font-mono text-sm">{order.id}</span>
                      </td>
                      <td className="py-4 px-4">{order.customer}</td>
                      <td className="py-4 px-4 text-muted-foreground">{order.product}</td>
                      <td className="py-4 px-4 text-muted-foreground text-sm">{order.date}</td>
                      <td className="py-4 px-4 text-primary">${order.amount}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Pending'
                            ? 'bg-yellow-500/20 text-yellow-500'
                            : 'bg-green-500/20 text-green-500'
                        }`}>
                          {order.status}
                        </span>
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
