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
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="auth-container"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(/images/Metal-Steel.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f5f5f5', // Light gray background
        padding: '2rem',
      }}
    >
      <div
        className="signup-container"
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '2rem',
          border: '2px solid #e0e0e0', // Light border
          borderRadius: '8px', // Softer corners
          backgroundColor: '#ffffff', // White card background
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
        }}
      >
        <h2
          className="signup-title"
          style={{ marginBottom: '2rem', color: '#333333', fontSize: '2rem', fontWeight: '700' }}
        >
          Create Account
        </h2>

        {error && (
          <div
            className="error-message"
            style={{
              color: '#721c24', // Dark red for error
              marginBottom: '1rem',
              padding: '0.5rem',
              backgroundColor: '#f8d7da', // Light red background
              borderRadius: '4px',
              borderLeft: '4px solid #dc3545', // Error indicator
            }}
          >
            {error}
          </div>
        )}
        {success && (
          <div
            className="success-message"
            style={{
              color: '#155724', // Dark green for success
              marginBottom: '1rem',
              padding: '0.5rem',
              backgroundColor: '#d4edda', // Light green background
              borderRadius: '4px',
              borderLeft: '4px solid #28a745', // Success indicator
            }}
          >
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="form-input"
              style={{
                width: '100%',
                padding: '0.9rem',
                borderRadius: '6px',
                border: '1px solid #ced4da', // Light gray border
                fontSize: '1rem',
                color: '#495057', // Dark gray text
                backgroundColor: '#f8f9fa', // Very light input background
                transition: 'border-color 0.2s',
                '&:focus': {
                  borderColor: '#80bdff',
                  outline: 'none',
                  boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
                },
              }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="form-input"
              style={{
                width: '100%',
                padding: '0.9rem',
                borderRadius: '6px',
                border: '1px solid #ced4da',
                fontSize: '1rem',
                color: '#495057',
                backgroundColor: '#f8f9fa',
                transition: 'border-color 0.2s',
                '&:focus': {
                  borderColor: '#80bdff',
                  outline: 'none',
                  boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
                },
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
                padding: '0.9rem',
                borderRadius: '6px',
                border: '1px solid #ced4da',
                fontSize: '1rem',
                color: '#495057',
                backgroundColor: '#f8f9fa',
                transition: 'border-color 0.2s',
                '&:focus': {
                  borderColor: '#80bdff',
                  outline: 'none',
                  boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
                },
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={clsx('submit-button', { disabled: loading })}
            style={{
              width: '100%',
              padding: '0.9rem',
              backgroundColor: loading ? '#6c757d' : '#007bff', // Light disabled state
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s, transform 0.1s',
              '&:hover:not(:disabled)': {
                backgroundColor: '#0056b3',
                transform: 'translateY(-1px)',
              },
            }}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p
          className="signup-footer"
          style={{ marginTop: '2rem', color: '#666', fontSize: '1rem', textAlign: 'center' }}
        >
          Already have an account?{' '}
          <Link
            to="/login"
            className="signup-link"
            style={{ color: '#007bff', textDecoration: 'underline', fontWeight: '500' }}
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;