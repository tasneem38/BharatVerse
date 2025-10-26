import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  const features = [
    {
      icon: '💬',
      title: 'AI Cultural Guide',
      description: 'Chat with our AI to learn about Indian heritage',
      link: '/chat',
      color: '#21808d'
    },
    {
      icon: '🏛️',
      title: 'Explore Heritage',
      description: 'Discover monuments, festivals, and art forms',
      link: '/heritage',
      color: '#5e4e40'
    },
    {
      icon: '🗺️',
      title: 'Plan Itinerary',
      description: 'Generate personalized travel plans',
      link: '/itinerary',
      color: '#e68661'
    },
    {
      icon: '🎨',
      title: 'Indian Art',
      description: 'Explore traditional Indian art styles',
      link: '/art',
      color: '#32b8c6'
    }
  ];

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
          Welcome back, {user?.username}! 👋
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          What would you like to explore today?
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: 'var(--spacing-lg)',
        marginBottom: '3rem'
      }}>
        {features.map((feature, idx) => (
          <Link 
            key={idx} 
            to={feature.link}
            style={{ textDecoration: 'none' }}
          >
            <div 
              className="card" 
              style={{ 
                height: '100%',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                borderLeft: `4px solid ${feature.color}`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>
                {feature.icon}
              </div>
              <h3 style={{ color: feature.color, marginBottom: 'var(--spacing-sm)' }}>
                {feature.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                {feature.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {user?.interests && (
        <div className="card" style={{ background: 'var(--primary)', color: 'white', textAlign: 'center' }}>
          <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>Your Interests</h3>
          <p style={{ fontSize: '1.1rem' }}>
            {user.interests.split(',').map(interest => interest.trim()).join(' • ')}
          </p>
        </div>
      )}
    </div>
  );
}
