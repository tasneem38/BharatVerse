export default function HeritageCard({ item, type }) {
  const getIcon = () => {
    switch (type) {
      case 'festival':
        return '🎉';
      case 'monument':
        return '🏛️';
      case 'art':
        return '🎨';
      default:
        return '📍';
    }
  };

  const getMetadata = () => {
    if (type === 'festival') {
      return (
        <>
          📍 {item.state} • 📅 {item.month}
        </>
      );
    }
    if (type === 'monument') {
      return (
        <>
          📍 {item.city}, {item.state}
          {item.unesco_site === 'Yes' && ' • 🏆 UNESCO Site'}
        </>
      );
    }
    if (type === 'art') {
      return (
        <>
          🎨 {item.type} • 📍 {item.state}
        </>
      );
    }
    return null;
  };

  return (
    <div 
      className="heritage-card card"
      style={{
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        background: 'white'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-colored)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
    >
      <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-sm)' }}>
        {getIcon()}
      </div>
      
      <h3 style={{ 
        color: 'var(--primary)', 
        marginBottom: 'var(--spacing-xs)',
        fontSize: '1.3rem',
        fontWeight: 'bold'
      }}>
        {item.name}
      </h3>
      
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '14px',
        marginBottom: 'var(--spacing-sm)',
        fontWeight: '500'
      }}>
        {getMetadata()}
      </p>
      
      <p style={{ 
        color: 'var(--text)',
        lineHeight: '1.6',
        fontSize: '0.95rem'
      }}>
        {item.description}
      </p>

      {/* Festival Significance */}
      {type === 'festival' && item.significance && (
        <div style={{
          marginTop: 'var(--spacing-sm)',
          paddingTop: 'var(--spacing-sm)',
          borderTop: '2px solid var(--border)',
          fontSize: '14px'
        }}>
          <strong style={{ color: 'var(--primary)' }}>Significance:</strong>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
            {item.significance}
          </p>
        </div>
      )}

      {/* Monument Built Year */}
      {type === 'monument' && item.built_year && (
        <div style={{
          marginTop: 'var(--spacing-sm)',
          padding: 'var(--spacing-xs) var(--spacing-sm)',
          background: 'var(--surface-secondary)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '14px',
          fontWeight: '600',
          color: 'var(--primary)'
        }}>
          🏗️ Built: {item.built_year}
        </div>
      )}
    </div>
  );
}
