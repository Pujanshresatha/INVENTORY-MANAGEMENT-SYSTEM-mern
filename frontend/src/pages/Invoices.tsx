// src/pages/Invoices.tsx
import React from 'react';
import { FiDownload } from 'react-icons/fi';

interface Invoice {
  id: string;
  orderId: string;
  date: string;
}

const Invoices = () => {
  const invoices: Invoice[] = [
    { id: 'INV001', orderId: 'ORD001', date: '2025-03-15' },
    { id: 'INV002', orderId: 'ORD002', date: '2025-03-10' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-steel-gray mb-6">Invoice Download</h2>
      <div className="space-y-4">
        {invoices.map((invoice) => (
          <div key={invoice.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
            <div>
              <p className="text-gray-800">Invoice #{invoice.id} (Order {invoice.orderId})</p>
              <p className="text-sm text-gray-600">{invoice.date}</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
              <FiDownload className="inline mr-2" /> Download PDF
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Invoices;