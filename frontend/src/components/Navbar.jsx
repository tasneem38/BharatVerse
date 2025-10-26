import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="BharatVerse Logo" className="logo-image" />
          <span className="logo-text">BharatVerse</span>
        </Link>
        
        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/heritage">Heritage</Link></li>
          {user && (
            <>
              <li><Link to="/chat">AI Guide</Link></li>
              <li><Link to="/itinerary">Itinerary</Link></li>
              <li><Link to="/art">Art</Link></li>
            </>
          )}
        </ul>

        <div className="nav-actions">
          {user ? (
            <>
              <span className="user-name"> {user.username}</span>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
