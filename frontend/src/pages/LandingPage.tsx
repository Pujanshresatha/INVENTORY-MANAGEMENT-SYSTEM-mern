// src/pages/LandingPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  image: string;
}

const LandingPage = () => {
  const navigate = useNavigate();

  const featuredProducts: Product[] = [
    { id: 1, name: 'Stainless Steel Coils', image: '/images/steel-coils.jpg' },
    { id: 2, name: 'Carbon Steel Plates', image: '/images/steel-plates.jpg' },
    { id: 3, name: 'Galvanized Sheets', image: '/images/galvanized-sheets.jpg' },
  ];

  return (
    <>
      {/* Landing Page */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-steel-gray mb-4">
            Browse & Order Steel Products
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Explore a variety of high-quality steel categories with detailed specifications.
          </p>
          <button
            onClick={() => navigate('/products')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-steel-gray mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-steel-gray">{product.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default LandingPage;