// src/pages/Signup.tsx
import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
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

    if (!formData.username || !formData.email || !formData.password) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      setSuccess('Signup successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError((err as Error).message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="signup-container"
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
        className="signup-title"
        style={{ marginBottom: '2rem', color: '#1a1a1a', fontSize: '2rem' }}
      >
        Create Account
      </h2>

      <form
        onSubmit={handleSubmit}
        className="signup-form"
        style={{ width: '100%', maxWidth: '400px' }}
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
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
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
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <p
        className="signup-footer"
        style={{ marginTop: '2rem', color: '#666', fontSize: '1rem' }}
      >
        Already have an account?{' '}
        <Link
          to="/login"
          className="signup-link"
          style={{ color: '#007bff', textDecoration: 'none' }}
        >
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Signup;