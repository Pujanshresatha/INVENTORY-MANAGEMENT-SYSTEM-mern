// src/pages/CustomerDashboard.tsx
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FiUser, FiLogOut } from 'react-icons/fi';

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logged out');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Navbar (Fixed at the top, Desktop Only) */}
      <nav className="fixed top-0 left-0 w-full bg-steel-gray text-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/dashboard" className="text-2xl font-bold text-blue-600">
            METAL<span className="text-white">WORKS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center space-x-6">
            <Link to="/dashboard/order-history" className="text-white hover:text-blue-400 transition-colors">
              Order History
            </Link>
            <Link to="/dashboard/invoices" className="text-white hover:text-blue-400 transition-colors">
              Invoices
            </Link>
            <Link to="/dashboard/payments" className="text-white hover:text-blue-400 transition-colors">
              Payments
            </Link>
            {/* Profile Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors focus:outline-none">
                <FiUser size={20} />
                <span>Profile</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-md shadow-lg hidden group-hover:block">
                <Link
                  to="/dashboard/account"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  Account
                </Link>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLogout();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <FiLogOut /> <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content with Padding for Fixed Navbar */}
      <main className="pt-20">
        <Outlet />
      </main>
    </div>
  );
};

// Custom CSS for steel gray color
const style = `
  .bg-steel-gray {
    background-color: #3A3A3A;
  }
`;

export default CustomerDashboard;