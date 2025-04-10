// src/pages/Payments.tsx
import React from 'react';

const Payments = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-100">
      <h2 className="text-2xl font-bold text-steel-gray mb-6">Secure Payment</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-600 mb-4">Payment Options: Esewa | Khalti</p>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Order #ORD001</span>
            <span className="text-green-600 font-medium">Successful</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Order #ORD003</span>
            <span className="text-yellow-600 font-medium">Pending</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payments;