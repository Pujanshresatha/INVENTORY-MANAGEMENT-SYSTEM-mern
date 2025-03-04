// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../src/pages/LandingPage';
import Signup from '../src/pages/Signup';
import Login from '../src/pages/Login';

const App: React.FC = () => {
  return (
    <div
      className="app-container"
      style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;