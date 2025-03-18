// src/pages/Login.tsx
import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setSuccess('Login successful! Redirecting to dashboard...');
      setTimeout(() => navigate('/dashboard'), 2000); // Redirect to /dashboard
    } catch (err) {
      setError((err as Error).message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-container"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f2f5',
        padding: '2rem',
      }}
    >
      <h2
        className="login-title"
        style={{ marginBottom: '2rem', color: '#1a1a1a', fontSize: '2rem' }}
      >
        Login
      </h2>

      <form
  onSubmit={handleSubmit}
  className="login-form"
  style={{
    width: '100%',
    maxWidth: '400px',
    padding: '2rem',
    border: '2px solid #333', // Add border
    borderRadius: '0px', // Remove rounded corners for a square look
    backgroundColor: '#fff',
    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
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
        {success && (
          <div
            className="success-message"
            style={{
              color: '#28a745',
              marginBottom: '1rem',
              padding: '0.5rem',
              backgroundColor: '#d4edda',
              borderRadius: '4px',
            }}
          >
            {success}
          </div>
        )}

        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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

        <div className="form-group" style={{ marginBottom: '2rem' }}>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
          disabled={loading}
          className={clsx('submit-button', { 'disabled': loading })}
          style={{
            width: '100%',
            padding: '0.8rem',
            backgroundColor: loading ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1.1rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s',
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p
        className="login-footer"
        style={{ marginTop: '2rem', color: '#666', fontSize: '1rem' }}
      >
        Don’t have an account?{' '}
        <Link
          to="/signup"
          className="login-link"
          style={{ color: '#007bff', textDecoration: 'none' }}
        >
          Sign up here
        </Link>
      </p>
    </div>
  );
};

export default Login;