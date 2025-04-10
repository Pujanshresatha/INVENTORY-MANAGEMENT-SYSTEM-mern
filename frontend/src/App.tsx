import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar  from "./Navbar";
import CustomerDashboard from "./pages/CustomerDashboard";
import LandingPage from "./pages/LandingPage";
import OrderHistory from "./pages/OrderHistory";
import Invoices from "./pages/Invoices";
import Payments from "./pages/Payments";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Simple route protection component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <>{children}</> : <Navigate to="/login" />;
};

const App = () => {
  return (
    <div className="app-container" style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<LandingPage />} />
            <Route path="order-history" element={<OrderHistory />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="payments" element={<Payments />} />
            <Route path="account" element={<Account />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;