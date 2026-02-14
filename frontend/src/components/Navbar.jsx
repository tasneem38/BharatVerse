import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// import '../styles/navbar.css'; // Using global index.css now

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="glass" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '1rem 0'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <span style={{ fontSize: '1.5rem' }}>🏛️</span>
          <span style={{
            fontFamily: 'Playfair Display',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            color: 'var(--primary)',
            letterSpacing: '1px'
          }}>BharatVerse</span>
        </Link>

        <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
          {['Home', 'Heritage', 'Explore 3D', 'AI Guide', 'Itinerary', 'Art'].map((item) => {
            // Only show authenticated routes if user is logged in
            if (!user && ['AI Guide', 'Itinerary', 'Art'].includes(item)) return null;

            const path = item === 'Home' ? '/' : item === 'Explore 3D' ? '/explore-3d' : `/${item.toLowerCase().replace(' ', '-')}`;
            const isSpecial = item === 'Explore 3D';

            return (
              <li key={item}>
                <Link to={path} style={{
                  textDecoration: 'none',
                  color: isSpecial ? '#ffd700' : 'var(--text-muted)',
                  fontWeight: isSpecial ? 'bold' : 'normal',
                  fontSize: '0.95rem',
                  transition: 'color 0.3s',
                  borderBottom: isSpecial ? '1px solid #ffd700' : 'none'
                }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--primary)'}
                  onMouseLeave={(e) => e.target.style.color = isSpecial ? '#ffd700' : 'var(--text-muted)'}
                >
                  {item}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="nav-actions">
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ color: 'var(--primary)', fontFamily: 'Playfair Display' }}>Hello, {user.username}</span>
              <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '6px 16px', fontSize: '0.8rem' }}>Logout</button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link to="/login" className="btn btn-secondary" style={{ padding: '8px 20px' }}>Login</Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '8px 20px' }}>Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
