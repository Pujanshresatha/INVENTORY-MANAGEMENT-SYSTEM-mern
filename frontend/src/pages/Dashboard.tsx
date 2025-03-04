// src/pages/Dashboard.tsx
import React, { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

const Dashboard: React.FC = () => {
  const [inventory, setInventory] = useState<any[]>([]); // Initially empty, will be populated from backend
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    price: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  // Fetch inventory from backend on component mount
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/inventory', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch inventory');
        }

        // Set inventory with MongoDB data (assuming _id is returned)
        setInventory(data.map((item: any) => ({
          id: item._id, // Use MongoDB _id as the ID
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })));
      } catch (err) {
        setError((err as Error).message || 'Failed to load inventory');
      }
    };

    fetchInventory();
  }, []); // Empty dependency array to run once on mount

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleAddItem = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.quantity || !formData.price) {
      setError('All fields are required');
      return;
    }

    const newItem = {
      name: formData.name,
      quantity: parseInt(formData.quantity, 10),
      price: parseFloat(formData.price),
    };

    try {
      const response = await fetch('http://localhost:5000/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newItem),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add item');
      }

      // Add the new item to the inventory state with the MongoDB _id
      setInventory([...inventory, { id: data.item._id, ...newItem }]);
      setFormData({ name: '', quantity: '', price: '' });
      setShowForm(false);
    } catch (err) {
      setError((err as Error).message || 'Something went wrong');
    }
  };

  return (
    <div
      className="dashboard-container"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f0f2f5',
        padding: '2rem',
      }}
    >
      <div
        className="dashboard-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}
      >
        <h1
          className="dashboard-title"
          style={{ color: '#1a1a1a', fontSize: '2rem' }}
        >
          Inventory Dashboard
        </h1>
        <div
          className="user-info"
          style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
        >
          <span style={{ color: '#666', fontSize: '1rem' }}>
            Welcome, {user?.username || 'User'}!
          </span>
          <button
            onClick={handleLogout}
            className="logout-button"
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'background-color 0.2s',
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div
        className="inventory-section"
        style={{ flex: 1, width: '100%', maxWidth: '800px', margin: '0 auto' }}
      >
        <button
          onClick={() => setShowForm(!showForm)}
          className="add-item-button"
          style={{
            padding: '0.8rem 1.5rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1.1rem',
            cursor: 'pointer',
            marginBottom: '1rem',
            transition: 'background-color 0.2s',
          }}
        >
          {showForm ? 'Cancel' : 'Add Item'}
        </button>

        {showForm && (
          <form
            onSubmit={handleAddItem}
            className="add-item-form"
            style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '5px',
              marginBottom: '1rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            {error && (
              <div
                className="error-message"
                style={{
                  color: '#dc3545',
                  marginBottom: '1rem',
                  padding: '0.5rem',
                  backgroundColor: '#f8d7da',
                  borderRadius: '4px',
                }}
              >
                {error}
              </div>
            )}
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Item Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  borderRadius: '5px',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                }}
              />
            </div>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <input
                type="number"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="form-input"
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  borderRadius: '5px',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                }}
              />
            </div>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <input
                type="number"
                step="0.01"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="form-input"
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  borderRadius: '5px',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                }}
              />
            </div>
            <button
              type="submit"
              className="submit-button"
              style={{
                width: '100%',
                padding: '0.8rem',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
            >
              Add Item
            </button>
          </form>
        )}

        <table
          className="inventory-table"
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: 'white',
            borderRadius: '5px',
            overflow: 'hidden',
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  padding: '1rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  textAlign: 'left',
                }}
              >
                ID
              </th>
              <th
                style={{
                  padding: '1rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  textAlign: 'left',
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: '1rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  textAlign: 'left',
                }}
              >
                Quantity
              </th>
              <th
                style={{
                  padding: '1rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  textAlign: 'left',
                }}
              >
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {inventory.length > 0 ? (
              inventory.map((item) => (
                <tr
                  key={item.id}
                  style={{ borderBottom: '1px solid #ddd' }}
                >
                  <td style={{ padding: '1rem' }}>{item.id}</td>
                  <td style={{ padding: '1rem' }}>{item.name}</td>
                  <td style={{ padding: '1rem' }}>{item.quantity}</td>
                  <td style={{ padding: '1rem' }}>${item.price.toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  style={{ padding: '1rem', textAlign: 'center', color: '#666' }}
                >
                  No items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;