// src/pages/OrderHistory.tsx
import React from 'react';

interface Order {
  id: string;
  productName: string;
  date: string;
  status: 'Pending' | 'Shipped' | 'Delivered';
  trackingUrl?: string;
}

const OrderHistory = () => {
  const orders: Order[] = [
    { id: 'ORD001', productName: 'Stainless Steel Coils', date: '2025-03-15', status: 'Shipped', trackingUrl: 'https://track.example.com/ORD001' },
    { id: 'ORD002', productName: 'Carbon Steel Plates', date: '2025-03-10', status: 'Delivered' },
    { id: 'ORD003', productName: 'Galvanized Sheets', date: '2025-03-12', status: 'Pending' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-steel-gray mb-6">Order History & Tracking</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-steel-gray text-white">
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Date Purchased</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.productName}</td>
                <td className="px-4 py-2">{order.date}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    order.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                    order.status === 'Shipped' ? 'bg-blue-200 text-blue-800' :
                    'bg-green-200 text-green-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {order.trackingUrl && (
                    <a href={order.trackingUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Track
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default OrderHistory;