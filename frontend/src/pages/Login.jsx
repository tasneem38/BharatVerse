const LOGIN_DISABLED = true;
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (LOGIN_DISABLED) {
    setError('Login is disabled in demo mode. You are logged in as Guest User.');
    return;
  }

  setError('');
  setLoading(true);

  try {
    await login(email, password);
    navigate('/dashboard');
  } catch (err) {
    setError(err.response?.data?.detail || 'Login failed. Please try again.');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="auth-container">
      <div className="auth-card card">
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary)' }}>
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="error">{error}</div>}

          <button
  type="submit"
  className="btn btn-primary"
  style={{ width: '100%' }}
  disabled={LOGIN_DISABLED || loading}
>
  {LOGIN_DISABLED ? 'Login Disabled (Demo Mode)' : loading ? 'Logging in...' : 'Login'}
</button>

        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '500' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
