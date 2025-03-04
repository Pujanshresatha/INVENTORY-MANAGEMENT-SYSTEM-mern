// src/pages/LandingPage.tsx
import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div
      className="landing-page"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f2f5',
      }}
    >
      <h1
        className="landing-title"
        style={{ color: '#1a1a1a', fontSize: '2.5rem', marginBottom: '1rem' }}
      >
        Welcome to Inventory Management
      </h1>
      <p
        className="landing-text"
        style={{ color: '#666', fontSize: '1.2rem' }}
      >
        Manage your inventory efficiently!
      </p>
    </div>
  );
};

export default LandingPage;