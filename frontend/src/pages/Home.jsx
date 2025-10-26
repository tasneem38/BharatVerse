import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home-color-theme">
      <div className="home-decor-top"></div>
      <div className="home-main-content">
        <div className="home-center-content">
          <h1 className="home-title">
            Welcome to <span className="home-gradient-txt">BharatVerse</span>
          </h1>
          <p className="home-desc">Explore India's rich cultural heritage with AI-powered guidance</p>

          <div className="home-btn-row">
            {user ? (
              <>
                <Link to="/chat" className="btn home-btn-primary">Start AI Chat</Link>
                <Link to="/heritage" className="btn home-btn-secondary">Explore Heritage</Link>
              </>
            ) : (
              <>
                <Link to="/register" className="btn home-btn-primary">Get Started</Link>
                <Link to="/heritage" className="btn home-btn-secondary">Browse Heritage</Link>
              </>
            )}
          </div>

          {/* Feature Cards */}
          <div className="home-feature-cards">
            {[
              { icon: '🏛️', title: 'Monuments', desc: "Discover India's architectural wonders" },
              { icon: '🎨', title: 'Art Forms', desc: 'Explore traditional Indian art' },
              { icon: '🎉', title: 'Festivals', desc: 'Experience vibrant celebrations' },
              { icon: '🤖', title: 'AI Guide', desc: 'Get personalized cultural insights' }
            ].map(feature => (
              <div key={feature.title} className="home-feature-card">
                <div className="home-feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="home-decor-bottom"></div>
    </div>
  );
}
