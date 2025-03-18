import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiInfo } from 'react-icons/fi';

const CustomerDashboard = () => {
  const [products] = useState([
    {
      id: 1,
      name: 'Stainless Steel Coils',
      category: 'Sheet Metal',
      grade: '304',
      thickness: '0.5mm',
      price: 2.85,
      stock: 500,
      image: './public/images/Stainless Steel Coils.jpeg'
    },
    {
      id: 2,
      name: 'Carbon Steel Plates',
      category: 'Structural',
      grade: 'A36',
      thickness: '10mm',
      price: 1.95,
      stock: 320,
      image: './public/images/Carbon-Steel-Plate-4.jpg'
    },
  ]);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            METAL<span className="text-gray-800">WORKS</span>
          </Link>
          <nav className="flex space-x-8 text-lg font-medium">
            <Link to="/products" className="hover:text-blue-600">Products</Link>
            <Link to="/inventory" className="hover:text-blue-600">Inventory</Link>
            <Link to="/orders" className="hover:text-blue-600">Orders</Link>
          </nav>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Inventory..."
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <FiSearch className="absolute right-3 top-2.5 text-gray-500" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-80 bg-[url('./public/images/Carbon-Steel-Plate-4.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold drop-shadow-lg">Industrial-Grade Metal Solutions</h1>
            <p className="text-xl mt-2 drop-shadow-md">Premium steel products for commercial and industrial use</p>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Featured Products</h2>
        <div className="grid grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <img src={product.image} alt={product.name} className="w-full h-52 object-cover" />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-blue-600 font-medium">${product.price}/kg</p>
                <p className="text-green-600 font-medium">{product.stock} tons in stock</p>
                <button
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                >
                  View Specifications
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Why Choose MetalWorks?</h2>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg">
              <FiShoppingCart className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Bulk Order Discounts</h3>
              <p className="text-gray-600">Competitive pricing for large quantity orders</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg">
              <FiUser className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Dedicated Account Managers</h3>
              <p className="text-gray-600">Personalized service and 24/7 support</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg">
              <FiInfo className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Material Certifications</h3>
              <p className="text-gray-600">Mill Test Certificates for all products</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 text-center text-gray-300">
        <p>© 2025 MetalWorks. All rights reserved. | ISO 9001:2015 Certified</p>
      </footer>
    </div>
  );
};

export default CustomerDashboard;
