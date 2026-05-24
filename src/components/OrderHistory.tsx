import { Order } from "@/types/Order";

export default function OrderHistory({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-800/20 border border-gray-800 rounded-2xl">
        <p className="text-gray-400 text-lg">
          You haven't placed any orders yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-gray-800/40 border border-gray-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between gap-6"
        >
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-4">
              <span className="text-teal-400 font-bold">
                Order #{order._id}
              </span>
              <span className="px-3 py-1 bg-gray-900 border border-gray-700 rounded-full text-xs text-gray-300">
                {order.status}
              </span>
            </div>

            <p className="text-gray-400 text-sm">
              Placed on: {new Date(order.createdAt).toLocaleDateString()}
            </p>

            <ul className="text-sm text-gray-300 mt-2 space-y-1">
              {order.items.map((item) => (
                <li key={item.id}>
                  • {item.quantity}x {item.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-left md:text-right flex flex-col justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Amount</p>
              <p className="text-2xl font-bold text-white">
                ${order.totalAmount.toFixed(2)}
              </p>
            </div>
            <p className="text-xs text-gray-500 mt-4 md:mt-0">
              Sent to: {order.shippingDetails.city},
              {order.shippingDetails.zipCode}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
