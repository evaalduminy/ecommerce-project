import { Package, Clock, CheckCircle, XCircle } from "lucide-react";

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
}

const mockOrders: Order[] = [
  { id: 'ORD-2026-001', date: '2026-04-18', status: 'delivered', total: 459.97, items: 3 },
  { id: 'ORD-2026-002', date: '2026-04-15', status: 'shipped', total: 299.99, items: 1 },
  { id: 'ORD-2026-003', date: '2026-04-10', status: 'processing', total: 189.98, items: 2 },
  { id: 'ORD-2026-004', date: '2026-04-05', status: 'delivered', total: 549.97, items: 4 },
  { id: 'ORD-2026-005', date: '2026-03-28', status: 'cancelled', total: 79.99, items: 1 },
];

const statusConfig = {
  pending: { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-500/20', label: 'Pending' },
  processing: { icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/20', label: 'Processing' },
  shipped: { icon: Package, color: 'text-purple-500', bg: 'bg-purple-500/20', label: 'Shipped' },
  delivered: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/20', label: 'Delivered' },
  cancelled: { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/20', label: 'Cancelled' },
};

export function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl mb-8">My Orders</h1>

      <div className="space-y-4">
        {mockOrders.map(order => {
          const config = statusConfig[order.status];
          const Icon = config.icon;

          return (
            <div key={order.id} className="bg-card border border-border rounded-lg p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="mb-1">Order {order.id}</h3>
                  <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${config.bg} ${config.color}`}>
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{config.label}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-8 text-sm">
                <div>
                  <span className="text-muted-foreground">Items: </span>
                  <span>{order.items}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Total: </span>
                  <span className="text-primary">${order.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex gap-3">
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  View Details
                </button>
                {order.status === 'delivered' && (
                  <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                    Reorder
                  </button>
                )}
                {order.status === 'shipped' && (
                  <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                    Track Order
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {mockOrders.length === 0 && (
        <div className="text-center py-16">
          <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl mb-2">No orders yet</h2>
          <p className="text-muted-foreground">Start shopping to see your orders here!</p>
        </div>
      )}
    </div>
  );
}
